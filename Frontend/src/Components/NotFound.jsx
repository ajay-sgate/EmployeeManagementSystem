import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div  className='d-flex justify-content-center flex-column align-items-center p-4' >
        <h1 className='fs-1 fw-bold'>404</h1>
        <h2  className='fs-1 fw-bold'>Not Found</h2>
        <button type="button" class="btn btn-primary btn-lg ">

        <Link to='/dashboard' className='text-white text-decoration-none'>Dashboard</Link>
        </button>
    </div>

  )
}

export default NotFound