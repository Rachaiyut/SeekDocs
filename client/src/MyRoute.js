import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Main from './components/app/Main';
import AdminPage from './components/admin/AdminPage';
import PrivateRoutes from './services/PrivateRoutes';

const MyRoute = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route element={<PrivateRoutes/>}>
                    <Route path="/main" element={<Main/>}></Route>
                    <Route path="/admin" element={<AdminPage/>}></Route>
                </Route>
            </Routes>
        </Router>
  )
}

export default MyRoute