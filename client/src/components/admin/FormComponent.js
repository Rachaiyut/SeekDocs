import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Swal from "sweetalert2"
import { getUserID, getToken } from '../../services/authenticate';

const FormComponent = (prop) => {
    const [state, setState] = useState({
        project_name: "",
        author: "",
        user_id: getUserID(), 
        language: "",
        description_project: "",
        status: ""
    });
    const { project_name, author, user_id, language, description_project, status } = state
    const [subjectOption, setSubjectOption] = useState([]);
    const [subfieldOption, setSubfieldOption] = useState([]);
    const [subject_id, setSubject] = useState([{ subject_id: "" }]);
    const [subfield_id, setSubfield] = useState([{ subfield_id: "" }]);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    }

    const inputSubject = (index, event) => {
        const data = [...subject_id];
        data[index].subject_id = parseInt(event.target.value)
        setSubject(data)
    }

    const addFields = () => {
        setSubject([...subject_id, { subject_id: "" }])
    }

    const deleteFields = (index) => {
        const newData = [...subject_id];
        newData.splice(index, 1);
        setSubject(newData);
    };

    // const handleOptionsUpdate = () => {
    //     const uniqueOptions = [...new Set(subject_id.map((item) => item.subject_id))];
    //     console.log(uniqueOptions);
    //     setSubjectOption(uniqueOptions);
    // };

    const inputSubfield = (index, event) => {
        const data = [...subfield_id];
        data[index].subfield_id = parseInt(event.target.value)
        setSubfield(data)
    }

    const addFieldSubfield = () => {
        setSubfield([...subfield_id, { subfield_id: "" }])
    }

    const deleteFieldSubfield = (index) => {
        const newData = [...subfield_id];
        newData.splice(index, 1);
        setSubfield(newData);
    };

    useEffect(() => {
        retriveSubjectOption();
        retriveSubfieldOption();
    }, [])

    const retriveSubjectOption = () => {
        axios
            .get('http://localhost:8080/api/subject/all', {
                headers: {
                    'x-access-token': getToken(),
                }
            })
            .then(response => {
                setSubjectOption(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const retriveSubfieldOption = () => {
        axios
            .get('http://localhost:8080/api/subfield/all', {
                headers: {
                    'x-access-token': getToken(),
                }
            })
            .then(response => {
                setSubfieldOption(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const saveProjectSubject = async (project_id) => {
        await axios
            .post("http://localhost:8080/api/addProjectSubject/create", { user_id, project_id, subject_id }, {
                headers: {
                    'x-access-token': getToken(),
                },
            })
            .then(response => {
                Swal.fire(
                    'เเจ้งเตือน',
                    "บันทึกวิชาเรียบร้อย",
                    "success"
                )

            })
            .catch(err => {
                console.log(err.response.data.message);
                Swal.fire({
                    icon: 'error',
                    title: "Ops...",
                    text: err.response.data.message,
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            })
    }

    const saveProjectSubfield = async (project_id) => {
        await axios
            .post("http://localhost:8080/api/addProjectSubfield/create", { user_id, project_id, subfield_id }, {
                headers: {
                    'x-access-token': getToken(),
                },
            })
            .then(response => {
                Swal.fire(
                    'เเจ้งเตือน',
                    "บันทึกวิชาย่อยเรียบร้อย",
                    "success"
                )
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: "Ops...",
                    text: err.response.data.message,
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            })
    }

    const saveProjectFile = async (project_id) => {
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('project_id', parseInt(project_id));
    
            const response = await axios.post("http://localhost:8080/api/project/fileUpLoad", formData, {
                headers: {
                    'x-access-token': getToken(),
                    'Content-Type': 'multipart/form-data'
                },
            })
            console.log(`save file into database ${response.data}`);
        } catch (error) {
            console.log(`There is problem in projecFile function ${error.response.data}`);
        }
    }

    const saveProject = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/project/create`, { project_name, user_id, description_project, author, language, status }, {
                headers: {
                    'x-access-token': getToken(),
                },
            })
            console.log(`save project into database ${response.data}`);
            return response.data.project_id;
        }
        catch (error) {
            console.log(`There is problem in saveProject function ${error.response}`);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.table([project_name, author, user_id, language, description_project, status, selectedFile]);
        try {
            const project_id = await saveProject() // After save project in table return project_id
            await saveProjectFile(project_id);
            await saveProjectSubject(project_id);
            await saveProjectSubfield(project_id);
            Swal.fire(
                'เเจ้งเตือน',
                "บันทึกบทความเรียบร้อย", 
                "success"
            )
            prop.fetchProject();
            setState({
                project_name: "",
                author: "",
                user_id: getUserID(),
                language: "",
                description_project: "",
                status: ""
            });
            setSubject([{ subject_id: "" }]);
            setSubfield([{ subfield_id: "" }]); 
            setSelectedFile(null);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                // Handle the error returned by saveProjectFile()
                Swal.fire({
                    icon: 'error',
                    title: "Ops...",
                    text: error.response.data.message,
                    footer: '<a href="">Why do I have this issue?</a>'
                });
            } else {
                // Handle other errors or network issues
                Swal.fire({
                    icon: 'error',
                    title: "Ops...",
                    text: "An error occurred while saving the project file.",
                    footer: '<a href="">Why do I have this issue?</a>'
                });
            }
        }
    }
    
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form className="mb-3" onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">เพิ่มโปรเจค</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="hmlForm-outline mb-3">
                                <input type="text" placeholder="ชื่อเอกสาร" className="form-control" onChange={inputValue("project_name")} value={project_name} required />
                            </div>

                            <div className="form-outline mb-3">
                                <input type="text" placeholder="ชื่อผู้เเต่ง" className="form-control" onChange={inputValue("author")} value={author} required />
                            </div>

                            <div className="form-outline mb-3" id="subject">
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
                            </div>

                            <div className="form-outline mb-3" id="subfield">
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
                            </div>

                            <div className="form-outline  mb-3">
                                <select name="language" className="form-select" id="autoSizingSelect" onChange={inputValue("language")} value={language}>
                                    <option value="">ภาษา</option>
                                    <option value="tha">ไทย</option>
                                    <option value="eng">อังกฤษ</option>
                                </select>
                            </div>

                            <div className="form-outline mb-3">
                                <label htmlFor="formFile" className="form-label">ไฟล์เอกสาร</label>
                                <input type="file" placeholder="อัพโหลดไฟล์" className="form-control" onChange={handleFileChange} />
                            </div>

                            <div className="form-outline  mb-3">
                                <label htmlFor="formFile" className="form-label">ไฟล์รูปภาพหน้าปก</label>
                                <input type="text" placeholder="อัพโหลดภาพ" className="form-control" />
                            </div>

                            <div className="form-outline mb-3">
                                <textarea className="form-control" placeholder="คำอธิบายโปรเจค" onChange={inputValue("description_project")} style={{ height: "100px" }} value={description_project}></textarea>
                            </div>

                            <div className="form-outline  mb-3">
                                <select name="status" className="form-select" onChange={inputValue("status")} value={status}>
                                    <option value="">การเข้าถึง</option>
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

export default FormComponent