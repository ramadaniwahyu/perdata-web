import React, { useContext } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { UserContext } from '../../contexts/UserContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);
  return (
    <DashboardLayout>Dashboard</DashboardLayout>
  )
}

export default Dashboard