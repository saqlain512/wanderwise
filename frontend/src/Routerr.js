import React from 'react'
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Dashboard from './pages/user/Dashboard';
import PlanTrip from './pages/user/PlanTrip';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserProfilePage from './pages/user/UserProfile';
import About from './pages/About';
import Pagenotfound from './pages/Pagenotfound';
import ForgotPasssword from './pages/auth/ForgotPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';
import LocationDetailsPage from './pages/LocationDetails';

export default function Routerr() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard/>} />
        </Route>
        <Route path="/plan-trip/:destination" element={<PrivateRoute />}>
          <Route path="" element={<PlanTrip/>} />
        </Route>
        <Route path="/plan-trip/" element={<PrivateRoute />}>
          <Route path="" element={<PlanTrip/>} />
        </Route>
        <Route path="/user-profile" element={<PrivateRoute />}>
          <Route path="" element={<UserProfilePage/>} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard/>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/location/:id" element={<LocationDetailsPage/>} />

        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </div>
  )
}
