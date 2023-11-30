import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import AllRoutes from './Routes/AllRoutes'
import { useEffect } from 'react'
import axios from 'axios'

function App() {

  useEffect(() => {
    axios.get(`http://localhost:8080/verify`)
      .then((result) => console.log(result))
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <AllRoutes />
    </>
  )
}

export default App
