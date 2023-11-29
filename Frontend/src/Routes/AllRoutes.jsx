import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import Dashboard from '../Components/Dashboard'
import Home from '../Components/Home'
import Employee from '../Components/Employee'
import Category from '../Components/Category'
import Profile from '../Components/Profile'
import AddCategory from '../Components/AddCategory'
import AddEmployee from '../Components/AddEmployee'
import EditEmployee from '../Components/EditEmployee'
import Start from '../Components/Start'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Start />} ></Route>
            <Route path='/adminlogin' element={<Login />} ></Route>
            <Route path='/dashboard' element={<Dashboard />} >
                <Route path='' element={<Home />} ></Route>
                <Route path='/dashboard/employee' element={<Employee />} ></Route>
                <Route path='/dashboard/category' element={<Category />} ></Route>
                <Route path='/dashboard/profile' element={<Profile />} ></Route>
                <Route path='/dashboard/add_category' element={<AddCategory />} ></Route>
                <Route path='/dashboard/add_employee' element={<AddEmployee />} ></Route>
                <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />} ></Route>
            </Route>
        </Routes>
    )
}

export default AllRoutes