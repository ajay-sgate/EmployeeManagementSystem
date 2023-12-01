import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
    const [category, setCategory] = useState([])

    const getData = () => {
        axios.get('http://localhost:8080/auth/category')
            .then((result) => {
                if (result.data.Status) {
                    setCategory(result.data.result)
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
        <div>
            <div className='px-5 mt-3 '>
                <div className='d-flex justify-content-center'>
                    <h3>Category List</h3>
                </div>
                <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
                <div className='mt-3 text-center'>
                    <table className='table border'>
                        <thead>
                            <tr>
                                <th className='border'>Id</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                category.map(c => (
                                    <tr key={c.id}>
                                        <td className='border' >{c.id}.</td>
                                        <td >{c.name}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Category