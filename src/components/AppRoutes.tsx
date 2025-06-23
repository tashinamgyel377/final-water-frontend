import { Routes, Route, Navigate } from "react-router-dom"

import Login from "../layout/Login"
import UserManagement from "../layout/UserManagement"
import ProtectedRoute from "./ProtectedRoute"
import Dashboard from "../layout/Dashboard"
// import DzongkhagDashboard from "./DzongkhagDashboard"
import Dzongkhag from "../layout/Dzongkhag"
import Gewog from "../layout/Gewog"
import NotFoundPage from "../layout/NotFound"
import Home from "../layout/Home"

const AppRoute = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
   <Route path="/" element={<Home />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
      
       
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/adduser" element={<UserManagement />} />         
          <Route path="/alldzongkhag" element={<Dzongkhag/>}/>
          <Route path="/allgewog" element={<Gewog/>}/>

          
        </Route>
       <Route path="/404" element={<NotFoundPage/>}/>
       <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}

export default AppRoute
