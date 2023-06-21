import React from 'react'
import NavbarComponent from '../navbar/NavbarComponent'
import SidebarComponent from '../navbar/SidebarComponent'

const Main = () => {
    return (
        <div>
            <header>
                <NavbarComponent />
                <SidebarComponent />
            </header>
            <main style={{ marginTop: "58px" }}>
               
            </main >
        </div >
    )
}

export default Main