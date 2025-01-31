import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
    const [auth, setAuth] = useAuth();
  return (
    <Layout title={"dashboard-admin"}>
      <h1>Admin Dashboard</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  )
}

export default AdminDashboard
