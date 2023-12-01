import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
  }, [])

  const AdminRecords = () => {
    axios.get('http://localhost:8080/auth/admin_records')
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      })
  }

  const adminCount = () => {
    axios.get('http://localhost:8080/auth/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin)
        }
      })
  }

  const employeeCount = () => {
    axios.get('http://localhost:8080/auth/employee_count')
      .then(result => {
        if (result.data.Status) {
          setemployeeTotal(result.data.Result[0].employee)
        }
      })
  }
  const salaryCount = () => {
    axios.get('http://localhost:8080/auth/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp)
        } else {
          alert(result.data.Error)
        }
      })
  }

  const handleDelete = (id, name) => {
    axios.delete(`http://localhost:8080/auth/delete_admin/${id}`)
      .then((result) => {
        if (result.data.Status) {
          toast(`Admin ${name} Deleted !!`, {
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
          adminCount();
          AdminRecords();
        } else {
          alert(result.data.Error)
        }
      })
      .catch((err) => console.log(err))

  }

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 rounded'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 rounded'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25 rounded'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>$ {salaryTotal} /-</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3 text-center'>
        <h3>List of Admins</h3>
        <table className='table border'>
          <thead>
            <tr>
              <th className='border'>S.No.</th>
              <th className='border'>Name</th>
              <th className='border'>Email</th>
              <th className='border'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map((a, index) => (
                <tr key={a.id}>
                  <td className='border'>{index + 1}.</td>
                  <td className='border'>{a.name}</td>
                  <td className='border'>{a.email}</td>
                  <td className='border'>
                    <Link
                      to={`/dashboard/edit_admin/` + a.id}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(a.id, a.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home