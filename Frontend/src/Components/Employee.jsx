import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Employee = () => {
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate()

    const handleDelete = (id, employeeName) => {
        axios.delete(`http://localhost:8080/auth/delete_employee/${id}`)
            .then(result => {
                if (result.data.Status) {
                    toast(`${employeeName} data Deleted !!`, {
                        position: "top-center",
                        type:"error",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                    getData()
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))

    }

    const getData = () => {
        axios.get('http://localhost:8080/auth/employee')
            .then((result) => {
                if (result.data.Status) {
                    setEmployee(result.data.result)
                } else {
                    alert(result.data.Error)
                }
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Employees List</h3>
            </div>
            <Link to="/dashboard/add_employee" className="btn btn-success">
                Add Employee
            </Link>
            <div className="mt-3 text-center">
                <table className="table border">
                    <thead> 
                        <tr>
                            <th className='border'>S.No.</th>
                            <th className='border'>Name</th>
                            <th className='border'>Image</th>
                            <th className='border'>Email</th>
                            <th className='border'>Category</th>
                            <th className='border'>Address</th>
                            <th className='border'>Salary</th>
                            <th className='border'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee && employee?.map((e,index) => (
                            <tr key={e.id}>
                                <td className='border'>{index+1}.</td>
                                <td className='text-capitalize border'>{e.name}</td>
                                <td className='border'>
                                    <img
                                        src={`http://localhost:8080/Images/${e.image}`}
                                        alt={e.name}
                                        className="employee_image rounded-circle"
                                    />
                                </td>
                                <td className='border'>{e.email}</td>
                                <td className='border'>{e.role}</td>
                                <td className='border'>{e.address}</td>
                                <td className='border'>$ {e.salary} /-</td>
                                <td className='border'>
                                    <Link
                                        to={`/dashboard/edit_employee/` + e.id}
                                        className="btn btn-primary btn-sm me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(e.id, e.name)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Employee