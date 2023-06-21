import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from "sweetalert2"
import { getUserID, getToken } from '../../services/authenticate';

const UpdateComponent = (props) => {
    const [state, setState] = useState({
        project_name: "",
        author: "",
        user_id: getUserID(),
        language: "",
        description_project: "",
        status: ""
    });

    const { project_name, author, user_id, language, description_project, status } = state;
    const [subfield_id, setSubfield] = useState([{ subfield_id: "" }]);

    useEffect(() => {
        if (props.projectId) {
            fetchProject(props.projectId);
            fetchSubfield(props.projectId)
            console.log(props.projectId);
            console.log(subfield_id);
        }
    }, [props.projectId])


    const fetchProject = async (projectId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/project/showProject/${projectId}`, {
                headers: {
                    'x-access-token': getToken(),
                }
            });
            const projectData = await response.data;
            setState({
                ...state,
                project_name: projectData.project_name,
                author: projectData.author,
                language: projectData.language,
                description_project: projectData.description_project,
                status: projectData.status
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: "Oops...",
                text: error.response?.data?.message || "Something went wrong.",
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }
    }

    const fetchSubfield = async (projectId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/project/showSubfield/${projectId}`, {
                headers: {
                    'x-access-token': getToken(),
                }
            });
            if (Array.isArray(response.data)) {
                const projectData = response.data.map((data) => {
                    return [{ subfield_id: data.subfield_id }];
                });
                setSubfield(projectData)
                console.log(subfield_id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form className="mb-3" >
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">เพิ่มโปรเจค</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="hmlForm-outline mb-3">
                                <input type="text" placeholder="ชื่อเอกสาร" className="form-control" defaultValue={project_name} required />
                            </div>

                            <div className="form-outline mb-3">
                                <input type="text" placeholder="ชื่อผู้เเต่ง" className="form-control" defaultValue={author} required />
                            </div>

                            {/* <div className="form-outline mb-3" id="subject">
                                <div className="row">
                                    {subject_id.map((input, index) => {
                                        return (
                                            <div className='row' key={index}>
                                                <div className="col-auto mb-2">
                                                    <input
                                                        list="subjects"
                                                        className='form-control'
                                                        // value={input.subject_id}
                                                        onChange={event => inputSubject(index, event)}
                                                        // onBlur={handleOptionsUpdate}
                                                    />
                                                    <datalist id="subjects">
                                                        <option value=""/>
                                                        {subjectOption.map((option, index) => (
                                                            <option
                                                                key={index}
                                                                value={option.subject_id}
                                                                label={option.subject_name}
                                                            />

                                                        ))}
                                                    </datalist>
                                                </div>
                                                <div className="col-auto mx-auto ml-" >
                                                    {subject_id.length > 1 && (
                                                        <button type="button" name="delete" onClick={() => deleteFields(index)} className="btn btn-danger">
                                                            ลบรายวิชา
                                                        </button>
                                                    )}
                                                    {index === subject_id.length - 1 && (
                                                        <button type="button" name="add" onClick={addFields} className="btn btn-success">
                                                            เพิ่มรายวิชา
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div> */}

                            {/* <div className="form-outline mb-3" id="subfield">
                                <div className="row">
                                    {subfield_id.map((input, index) => {
                                        return (
                                            <div className='row' key={index}>
                                                <div className="col-auto mb-2">
                                                    <input
                                                        list="subfields"
                                                        className='form-control'
                                                        onChange={event => inputSubfield(index, event)}
                                                    />
                                                    <datalist id="subfields">
                                                        <option value="" />
                                                        {subfieldOption.map((option, index) => (
                                                            <option
                                                                key={index}
                                                                value={option.subfield_id}
                                                                label={option.subfield_name}
                                                            />
                                                        ))}
                                                    </datalist>
                                                </div>
                                                <div className="col-auto mx-auto ml-" >
                                                    {subfield_id.length > 1 && (
                                                        <button type="button" name="delete" onClick={() => deleteFieldSubfield(index)} className="btn btn-danger">
                                                            ลบรายวิชา
                                                        </button>
                                                    )}
                                                    {index === subfield_id.length - 1 && (
                                                        <button type="button" name="add" onClick={addFieldSubfield} className="btn btn-success">
                                                            เพิ่มรายวิชา
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div> */}

                            <div className="form-outline  mb-3">
                                <select name="language" className="form-select" id="autoSizingSelect" defaultValue={language}>
                                    <option value="">
                                        {language === "eng" ? "อังกฤษ" : "ไทย"}
                                    </option>
                                    <option value="tha">ไทย</option>
                                    <option value="eng">อังกฤษ</option>
                                </select>
                            </div>

                            <div className="form-outline mb-3">
                                <label htmlFor="formFile" className="form-label">ไฟล์เอกสาร</label>
                                <input type="file" placeholder="อัพโหลดไฟล์" className="form-control" />
                            </div>

                            <div className="form-outline  mb-3">
                                <label htmlFor="formFile" className="form-label">ไฟล์รูปภาพหน้าปก</label>
                                <input type="text" placeholder="อัพโหลดภาพ" className="form-control" />
                            </div>

                            <div className="form-outline mb-3">
                                <textarea className="form-control" placeholder="คำอธิบายโปรเจค" style={{ height: "100px" }} defaultValue={description_project}></textarea>
                            </div>

                            <div className="form-outline  mb-3">
                                <select name="status" className="form-select" defaultValue={status}>
                                    <option value="">
                                        {status === "yesy" ? "สาธารณะ" : "ไม่สาธารณะ"}
                                    </option>
                                    <option value="yes">สาธารณะ</option>
                                    <option value="no">ไม่สาธารณะ</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">เพิ่มเอกสาร</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateComponent 