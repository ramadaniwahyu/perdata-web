import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Dashboard from './pages/Dashboard/Dashboard'
import Users from './pages/Dashboard/User/Users'
import CreateUser from './pages/Dashboard/User/CreateUser'
import ViewDetailsUser from './pages/Dashboard/User/ViewDetailsUser'
import NotFound from './pages/NotFound'
import PrivateRoute from './routes/PrivateRoute'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path='*' element={<NotFound/>}/> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />


          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/user' element={<Users />} />
            <Route path='/dashboard/user/create' element={<CreateUser />} />
            <Route path='/dashboard/user/:id' element={<ViewDetailsUser />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App