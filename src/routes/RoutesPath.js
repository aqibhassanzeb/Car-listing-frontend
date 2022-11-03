import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Categories from '../components/categories/Categories'
import Dashboard from '../components/dashboard/Dashboard'
import Login from '../components/login/Login'
import SignUp from "../components/signup/SignUp"
import ProtectedRoute from './ProtectedRoutes'
const RoutesPath = () => {
  return (
    <>
<Routes>
    <Route  element={<ProtectedRoute />}>
    <Route path="/" exact element={<Dashboard/>} />
    <Route path="/categories" element={<Categories/>} />
    </Route>
    <Route path="/signup" element={<SignUp/>} />
    <Route path="/login" element={<Login/>} />
</Routes>
    </>
  )
}

export default RoutesPath