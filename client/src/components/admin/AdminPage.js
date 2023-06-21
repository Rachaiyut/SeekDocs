import React, { useEffect, useState } from 'react'
import NavbarComponent from '../navbar/NavbarComponent'
import SidebarComponent from '../navbar/SidebarComponent'
import DashboardComponent from './DashboardComponent'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../services/authenticate'

const requireAdmin = (WrappedComponent) => {
    const Wrapper = (props) => {
        const navigate = useNavigate()
        const [isAdmin, setIsAdmin] = useState(false)

        useEffect(() => {
            axios
                .get(`http://localhost:8080/api/test/admin`, {
                    headers: {
                        'x-access-token': getToken(),
                    },
                })
                .then((response) => {
                    setIsAdmin(true)
                })
                .catch((err) => {
                    navigate('/main')
                })
        }, [])

        return isAdmin ? <WrappedComponent {...props} /> : null
    }

    return Wrapper
}

const AdminPage = () => {
    const [state, setState] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/test/admin`, {
                headers: {
                    'x-access-token': getToken(),
                },
            })
            .then((response) => {
                setState(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <header>
                <NavbarComponent/>
                <SidebarComponent/>
            </header>
            <main style={{marginTop: "58px"}}>
                <p>{state}</p>
                <DashboardComponent/>
            </main>
        </div>
    )
}

export default requireAdmin(AdminPage)
