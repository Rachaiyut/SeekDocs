import React, { useEffect, useState } from 'react'
import NavbarComponent from '../navbar/NavbarComponent';
import SidebarComponent from '../navbar/SidebarComponent';
import FormComponent from './FormComponent';
import { getToken } from '../../services/authenticate';
import axios from 'axios';
import Swal from "sweetalert2"
import "./Create.css"
import UpdateComponent from './UpdateComponent';

const DashboardComponent = () => {
    const [projectData, setProjectData] = useState([]);
    const [project_id, setProjectId] = useState("")

    useEffect(() => {
        Swal.fire({
            icon: "info",
            title: "Waiting for data to download.",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            allowOutsideClick: false,
            text: "Data is downloading",
        });

        setTimeout(() => {
            fetchProject();
        }, 3000);

    }, [])

    const fetchProject = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/project/showAllProjects", {
                headers: {
                    'x-access-token': getToken(),
                }
            });
            const { data } = response;
            Swal.fire({
                icon: 'success',
                title: 'Data was downloaded successfully.',
                showConfirmButton: false,
                timer: 2000,
                allowOutsideClick: false,
                onOpen: () => {
                    setTimeout(() => {
                        Swal.close();
                    }, 2000);
                }
            });
            setProjectData(data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: "Oops...",
                text: error.response?.data?.message || "Something went wrong.",
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }
    }


    const confirmEdit = (projectId) => {
        setProjectId(projectId)
    }

    const confirmDelete = async (project_id) => {
        const result = await Swal.fire({
            title: "Do you to delete title",
            icon: "warning",
            showCancelButton: true
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            await Promise.all([
                deleteProjectSubject(project_id),
                deleteProjectSubfield(project_id),
                deleteFile(project_id),
                deleteProject(project_id)
            ]);
            const projectData = await fetchProject();
            await Swal.fire({
                icon: "success",
                title: "Delete is successful.",
                showConfirmButton: false,
                timer: 2000,
                data: projectData,
                onClose: () => {
                    fetchProject();
                }
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Delete failed.",
                text: error.response?.data?.message || "Unknown error",
                footer: '<a href="">Why do I have this issue?</a>'
            });
        }
    };

    const deleteProject = async (project_id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/project/deleteProject/${project_id}`, {
                headers: {
                    'x-access-token': getToken(), 
                }
            });
            console.log(`Delete project is successful`);
        } catch (error) {
            console.error(error.response);
        }
    };

    const deleteFile = async(project_id) => {
        try{
            const response = await axios.delete(`http://localhost:8080/api/project/deleteProjectFile/${project_id}`, {
                headers: {
                    'x-access-token': getToken(), 
                }
            });
            console.log(`Delete file is sucessful`);
        } catch (error){
            console.log(error.respons);
        }
    }

    const deleteProjectSubject = async (project_id) => {
        await axios 
            .delete(`http://localhost:8080/api/ProjectSubject/delete/${project_id}`, {
                headers: {
                    'x-access-token': getToken(),
                }
            })
            .then((response) => {
                console.log(`Delete subject is successful`);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    const deleteProjectSubfield = async (project_id) => {
        await axios
            .delete(`http://localhost:8080/api/ProjectSubfield/delete/${project_id}`, {
                headers: {
                    'x-access-token': getToken(),
                }
            })
            .then((response) => {
                console.log(`Delete subfield is successful`);
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    return (
        <div>
            <header>
                <SidebarComponent />
                <NavbarComponent />
            </header>

            <main style={{ marginTop: "58px" }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4 py-4">
                            <h1 className="h2">หน้าโปรเจค</h1>
                            <div className="row my-4">
                                <div className="card-header">
                                    <div className="d-flex flex-row-reverse  mt-3">
                                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            เพิ่มโปรเจค  
                                        </button>
                                    </div>
                                    <div className="card-body">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className='text-center'>ลำดับที่</th>
                                                    <th scope="col" className='text-center'>รหัสโปรเจค</th>
                                                    <th scope="col" className='text-center'>ชื่อโปรเจค</th>
                                                    <th scope="col" className='text-center'>ชื่อผู้เขียน</th>
                                                    <th scope="col" className='text-center'>ปี</th>
                                                    <th scope="col" className='text-center'>เเก้ไข</th>
                                                    <th scope="col" className='text-center'>ลบ</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {projectData.map((data, index) => {
                                                    const year = data.created_at.split("-")
                                                    return (
                                                        <tr key={index}>
                                                            <td className='text-center'>{index + 1}</td>
                                                            <td className='text-center'>CS-{data.project_id}</td>
                                                            <td className='text-center'>{data.project_name}</td>
                                                            <td className='text-center'>{data.author}</td>
                                                            <td className='text-center'>{year[0]}</td>
                                                            <td className='text-center'>
                                                                <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => confirmEdit(data.project_id)} >เเก้ไข</button>
                                                            </td>
                                                            <td className='text-center'>
                                                                <button className='btn btn-danger' onClick={() => confirmDelete(data.project_id)}>ลบ</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FormComponent fetchProject={fetchProject}/>
                <UpdateComponent projectId={project_id}/>
            </main>
        </div>
    )
} 

export default DashboardComponent