import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const authFunc=()=>{
    var user = JSON.parse(localStorage.getItem("taskuser"))
    var usertoken = localStorage.getItem("tasktoken")
    return user && usertoken
}
const ProtectedRoute = () => {
    const isAuthentic=authFunc();
    return isAuthentic ? <Outlet/> : <Navigate to="/login" />
}

export default ProtectedRoute