import React, { useState } from 'react'
import NavbarComponent from '../navbar/NavbarComponent';
import './Register.css';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Swal from "sweetalert2"

const Register = () => {

	const [state, setState] = useState({
		name_title: "",
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		user_status: ""
	})

	const {name_title, firstname, lastname, email, password, gender, user_status} = state

	const inputValue = name => event => {
		setState({...state,[name]:event.target.value})
	}

	const submitData = (e) => {
		e.preventDefault()
		console.table(state);
		console.log("API URL = ", process.env.REACT_APP_API);
		axios
			.post(`http://localhost:8080/api/auth/signup`, {name_title, firstname, lastname, email, password, gender, user_status}
			)
			.then(response => {
				Swal.fire(
					'เเจ้งเตือน',
					"บันทึกบทความเรียบร้อย",
					"success"
				)
				setState({...state, title: "", author: ""})
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
				<NavbarComponent/>
			</header>			
			<section className="vh-100 gradient-custom">
				<div className="mask d-flex align-items-center h-100 gradient-custom-3">
					<div className="container h-100">
						<div className="row d-flex justify-content-center align-items-center h-100">
							<div className="col-12 col-md-8 col-lg-6 col-xl-5">
								<div className="card bg-dark text-white" style={{ "borderRadius": "15px" }}>
									<div className="card-body p-5">
										<h2 className="text-uppercase text-center mb-5">Create an account</h2>

										<form onSubmit={submitData}>
											<div className="form-outline mb-4">
												<select className='form-select' onChange={inputValue("name_title")} defaultValue="">
													<option value="" disabled selected>Name Title</option>
													<option value="Mr." selected>Mr.</option>
													<option value="Mrs.">Mrs.</option>
													<option value="Ms.">Ms.</option>
												</select>
											</div>

											<div className="form-outline mb-4">
												<input type="text" id="form3Example1cg" className="form-control form-control-md" placeholder='First name'
													onChange={inputValue("firstname")}
												/>
											</div>

											<div className="form-outline mb-4">
												<input type="text" id="form3Example1cg" className="form-control form-control-md" placeholder='Last name'
													onChange={inputValue("lastname")}
												/>
											</div>

											<div className="form-outline mb-4">
												<input type="email" id="form3Example3cg" className="form-control form-control-md" placeholder='Email'
													onChange={inputValue("email")}
												/>
											</div>

											<div className="form-outline mb-4">
												<input type="password" id="form3Example4cg" className="form-control form-control-md" placeholder='Password'
													onChange={inputValue("password")}
												/>
											</div>

											<div className="form-outline mb-4">
												<select className='form-select' onChange={inputValue("gender")} defaultValue="">
													<option value="" disabled selected>Gender</option>
													<option value="f">Female</option>
													<option value="m">Male</option>
												</select>
											</div>

											<div className="form-outline mb-4">
												<select className='form-select' onChange={inputValue("user_status")} defaultValue=""> 
													<option value="" disabled selected >User Status</option>
													<option value="teacher" >Teacher</option>
													<option value="student">Student</option>
												</select>
											</div>

											<div className="d-flex justify-content-center">
												<button type="submit"
													className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
											</div>

											<p className="text-center text-muted mt-5 mb-0">Have already an account?
												<Link to="/login">
													Login
												</Link>
											</p>

										</form>

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

export default Register;