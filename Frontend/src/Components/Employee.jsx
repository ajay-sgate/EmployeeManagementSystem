import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Employee = () => {
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate()

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/auth/delete_employee/${id}`)
            .then(result => {
                if (result.data.Status) {
                    alert('deleted successfully')
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
                <h3>Employee List</h3>
            </div>
            <Link to="/dashboard/add_employee" className="btn btn-success">
                Add Employee
            </Link>
            <div className="mt-3 text-center">
                <table className="table">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee && employee?.map((e,index) => (
                            <tr key={e.id}>
                                <td>{index+1}.</td>
                                <td className='text-capitalize'>{e.name}</td>
                                <td>
                                    <img
                                        src={`http://localhost:8080/Images/${e.image}`}
                                        alt={e.name}
                                        className="employee_image rounded-circle"
                                    />
                                </td>
                                <td>{e.email}</td>
                                <td>{e.address}</td>
                                <td>$ {e.salary} /-</td>
                                <td>
                                    <Link
                                        to={`/dashboard/edit_employee/` + e.id}
                                        className="btn btn-primary btn-sm me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(e.id)}
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