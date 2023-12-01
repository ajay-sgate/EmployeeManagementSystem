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
import EmployeeLogin from '../Components/EmployeeLogin'
import EmployeeDetails from '../Components/EmployeeDetails'
import PrivateRoute from './PrivateRoute'
import AddAdmin from '../Components/AddAdmin'
import NotFound from '../Components/NotFound'
import EditAdmin from '../Components/EditAdmin'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Start />} ></Route>
            <Route path='/adminlogin' element={<Login />} ></Route>
            <Route path='/employee_login' element={<EmployeeLogin />} ></Route>
            <Route path='/employee_detail/:id' element={<EmployeeDetails />} ></Route>
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} >
                <Route path='' element={<Home />} ></Route>
                <Route path='/dashboard/employee' element={<Employee />} ></Route>
                <Route path='/dashboard/category' element={<Category />} ></Route>
                {/* <Route path='/dashboard/profile' element={<Profile />} ></Route> */}
                <Route path='/dashboard/add_admin' element={<AddAdmin />} ></Route>
                <Route path='/dashboard/add_category' element={<AddCategory />} ></Route>
                <Route path='/dashboard/add_employee' element={<AddEmployee />} ></Route>
                <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />} ></Route>
                <Route path='/dashboard/edit_admin/:id' element={<EditAdmin />} ></Route>
            </Route>
            <Route path='*' element={<NotFound />} ></Route>
        </Routes>
    )
}

export default AllRoutes