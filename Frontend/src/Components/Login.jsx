import React, { useState } from 'react'
import './style.css'

const Login = () => {
    const [values, setValues] = useState({
        "email": "",
        "password": ""
    })
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                <h2>Login Page</h2>
                <form>
                    <div className='mb-3'>
                        <label htmlFor="email"> <strong>Email:</strong></label>
                        <input type='email' name='email' autoComplete='off' placeholder='Enter your Email' className='form-control rounded-0' value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"> <strong>Password:</strong></label>
                        <input type='password' name='password' placeholder='Enter your Password' className='form-control rounded-0' value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
                    </div>
                    <button className='btn btn-success w-100 rounded-0 mb-2' onClick={(e)=>{e.preventDefault(); console.log(values)}}>Log in</button>
                    <div className='mb-1'>
                        <input type='checkbox' name='tick' id='tick' className='me-2' />
                        <label htmlFor="tick"> Agree with terms & conditions.</label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login