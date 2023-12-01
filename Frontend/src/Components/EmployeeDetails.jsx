import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const EmployeeDetails = () => {
    const [employee, setEmployee] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8080/employee/detail/${id}`)
            .then(result => {
                setEmployee(result.data[0])
            })
            .catch((err) => console.log(err))
    }, [])

    const handleLogout = () => {
        axios.get('http://localhost:8080/employee/logout')
        .then(result => {
            if (result.data.Status) {
                toast('Logout Successful', {
                    position: "top-center",
                    type:"success",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                localStorage.removeItem("isAuth")
                navigate('/')
            }
        })
    }

    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>Emoployee Management System</h4>
            </div>
            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
                <div className='text-center p-4 card-shadow'>

                    {employee.image && <img src={`http://localhost:8080/Images/${employee.image}`} className='emp_det_image' />}
                    <div className='d-flex align-items-center flex-column mt-4'>
                        <h3>Name: {employee.name}</h3>
                        <h3>Email: {employee.email}</h3>
                        <h3>Salary: $ {employee.salary} /-</h3>
                    </div>
                    <div>
                        <button className='btn btn-primary me-3'>Edit</button>
                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetails