import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getUser } from "./authenticate";

const PrivateRoutes = () => {
    const auth = getUser();
    return (
        auth ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes