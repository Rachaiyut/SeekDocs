import React from 'react'
import { Link } from 'react-router-dom'

import "./Navs.css"

const SidebarComponent = () => {
    return (
        <div>
            <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-dark">
                <div className="position-sticky">
                    <div className="list-group list-group-flush mx-3 ">
                        <li className="list-group-item list-group-item-action py-2 ripple" aria-current="true">
                            <Link to='/' className='fas fa-chart-area fa-fw me-3'>Home</Link>
                        </li>
                        <li className="list-group-item list-group-item-action py-2 ripple">
                            <i className="fas fa-chart-area fa-fw me-3"></i><span>Webiste traffic</span>
                        </li>
                        <li className="list-group-item list-group-item-action py-2 ripple"><i
                            className="fas fa-lock fa-fw me-3"></i><span>Password</span></li>
                        <li className="list-group-item list-group-item-action py-2 ripple"><i
                            className="fas fa-chart-line fa-fw me-3"></i><span>Analytics</span></li>
                        <li className="list-group-item list-group-item-action py-2 ripple">
                            <i className="fas fa-chart-pie fa-fw me-3"></i><span>SEO</span>
                        </li>
                        <li className="list-group-item list-group-item-action py-2 ripple"><i 
                            className="fas fa-chart-bar fa-fw me-3"></i><span>Orders</span></li>
                        <li className="list-group-item list-group-item-action py-2 ripple"><i
                            className="fas fa-globe fa-fw me-3"></i><span>International</span></li>
                        <li className="list-group-item list-group-item-action py-2 ripple"><i
                            className="fas fa-building fa-fw me-3"></i><span>Partners</span></li>
                        <li className="list-group-item list-group-item-action py-2 ripple"><i
                            className="fas fa-calendar fa-fw me-3"></i><span>Calendar</span></li>
                        <li className="list-group-item list-group-item-action py-2 ripple"><i
                            className="fas fa-users fa-fw me-3"></i><span>Users</span></li>
                        <li className="list-group-item list-group-item-action py-2 ripple"><i
                            className="fas fa-money-bill fa-fw me-3"></i><span>Sales</span></li>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default SidebarComponent