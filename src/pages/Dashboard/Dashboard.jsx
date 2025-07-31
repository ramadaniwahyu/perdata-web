import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { UserContext } from '../../contexts/UserContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { dashData } from '../../utils/data';
import moment from 'moment';

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const getDashboardData = () => {
    try {
      setDashboardData(dashData)
      console.log("Getting dashboard data")
      // setDashboardData();
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  useEffect(()=>{
    getDashboardData();

    return () => {}
  },[])
  return (
    <DashboardLayout>
      <div className='card my-5'>
        <div>
          <div className='col-span-3'>
            <h2 className='text-xl md:text-2xl'>Selamat Pagi! {user?.name}</h2>
            <p className='text-xs md:text-[13px] text-gray-400 mt-1.5'>
              {moment().format("dddd DD MMMM YYYY")}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard