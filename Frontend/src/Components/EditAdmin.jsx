import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditAdmin = () => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({
        "name": "",
        "email": ""
    })

    const { id } = useParams();

    const getData = (id) => {
        axios.get(`http://localhost:8080/auth/admin/${id}`)
            .then(result => {
                setAdmin({
                    ...admin,
                    name: result.data[0].name,
                    email: result.data[0].email,
                })
            }).catch(err => console.log(err))

    }

    useEffect(() => {
        getData(id)
    }, [])

    const handleSubmit = (e) => {

        e.preventDefault();

        axios.put(`http://localhost:8080/auth/edit_admin/${id}`, admin)
            .then(result => {
                if (result.data.Status) {
                    toast(`Admin ${admin.name} data Updated`, {
                        position: "top-center",
                        type: "info",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    navigate('/dashboard')
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Edit Admin</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Enter Name"
                            value={admin.name}
                            onChange={(e) =>
                                setAdmin({ ...admin, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            value={admin.email}
                            onChange={(e) =>
                                setAdmin({ ...admin, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100">
                            Edit Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditAdmin