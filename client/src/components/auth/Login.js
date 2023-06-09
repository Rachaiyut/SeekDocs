import React, { useState } from 'react'
import NavbarComponent from '../navbar/NavbarComponent'
import { authenticate } from '../../services/authenticate'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2"
import "./Login.css"


const Login = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const { email, password } = state;

    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    }

    const submitData = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:8080/api/auth/signin`, { email, password })
            .then(response => {
                authenticate(response, () => navigate("/main"))
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: "Ops...",
                    text: err.response.data.message,
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            })
    }

    return (
        <div>
            <header>
                <NavbarComponent />
            </header>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ "borderRadius": "1rem" }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <form onSubmit={submitData}>
                                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                            <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                            <div className="form-outline form-white mb-4">
                                                <input type="email" id="typeEmailX" className="form-control form-control-md" onChange={inputValue("email")} placeholder='Email' />
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input type="password" id="typePasswordX" className="form-control form-control-md" onChange={inputValue("password")} placeholder='Password' />
                                            </div>

                                            <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                                            <button className="btn btn-success btn-lg px-5" type="submit">Login</button>

                                            <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                                <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                                <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                                <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                            </div>
                                        </form>

                                    </div>

                                    <div>
                                        <p className="mb-0">Don't have an account?
                                            <Link to="/register">
                                                Register
                                            </Link>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Login