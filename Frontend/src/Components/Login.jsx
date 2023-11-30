import React, { useState } from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [values, setValues] = useState({
        "email": "",
        "password": ""
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(values)
        axios.post('http://localhost:8080/auth/adminlogin', values)
            .then((result) => {
                if (result.data.loginStatus) {
                    // console.log(result);
                    navigate("/dashboard")
                }
            })
            .catch((error) => setError(error.response.data.Error))
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <h2 className='text-center'>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"> <strong>Email:</strong></label>
                        <input type='email' name='email' autoComplete='off' placeholder='Enter your Email' className='form-control rounded-0' value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"> <strong>Password:</strong></label>
                        <input type='password' name='password' placeholder='Enter your Password' className='form-control rounded-0' value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
                    </div>

                    <div className='mb-1'>
                        <input type='checkbox' name='tick' id='tick' className='me-2' />
                        <label htmlFor="tick"> Agree with terms & conditions.</label>
                    </div>
                    <div className='text-warning text-center mb-3'>
                    {error && error}
                </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2' type='submit'>Log in</button>
                </form>
            </div>
        </div>
    )
}

export default Login