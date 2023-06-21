import React from 'react'
import "./Navs.css"
import { Link, useNavigate } from 'react-router-dom'
import { getAdminRole, getUser, logout } from '../../services/authenticate';


const NavbarComponent = () => {
    const navigate = useNavigate();

    return (
        <div>
            <nav id="main-navbar" className="navbar navbar-expand-lg bg-dark navbar-light text-white fixed-top">
                {/* <!-- Container wrapper --> */}
                <div className="container-fluid">
                    {/* <!-- Toggle button --> */}
                    <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#sidebarMenu"
                        aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars"></i>
                    </button>

                    {/* <!-- Brand --> */}
                    <a className="navbar-brand" href="#">
                        <img src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height="25" alt="MDB Logo"
                            loading="lazy" />
                    </a>

                    {/* <!-- Right links --> */}
                    <ul className="navbar-nav ms-auto d-flex flex-row ">
                        <li className="nav-item">
                            <Link to='/' className='nav-link mx-2 text-white'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/login' className='nav-link mx-2 text-white'>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/register' className='nav-link mx-2 text-white'>Register</Link>
                        </li>
                        <li className="nav-item">
                            {getUser() && (
                                <button className='nav-link mx-2' onClick={()=>logout(()=>navigate("/login"))}>Logout</button>
                            )}
                        </li>
                    </ul>
                </div>
                {/* <!-- Container wrapper --> */}
            </nav>
        </div>
    )
}

export default NavbarComponent