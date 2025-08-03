import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import { UserContext } from '../../contexts/UserContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { dashData } from '../../utils/data';
import moment from 'moment';
import { IoMdCard } from 'react-icons/io';
import { addThousandsSeparator } from '../../utils/helper';
import InfoCard from '../../components/cards/InfoCard';
import { LuArrowLeft, LuArrowRight } from 'react-icons/lu';
import ListTable from '../../components/tables/ListTable';
import CustomPieChart from '../../components/charts/CustomPieChart';
import CustomBarChart from '../../components/charts/CustomBarChart';

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"]

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const prepareChartData = (data) => {
    const dist = data?.distribution || null;
    const prio = data?.priorityLevel || null;

    const distributionData = [
    { status: "Pending", count: dist?.pending || 0 },
    { status: "in Progress", count: dist?.inProgress || 0 },
    { status: "Completed", count: dist?.completed || 0 }
  ];

  setPieChartData(distributionData);

  const priorityLevelData = [
    { priority: "Low", count: prio?.low || 0 },
    { priority: "Medium", count: prio?.medium || 0 },
    { priority: "High", count: prio?.high || 0 }
  ]

  setBarChartData(priorityLevelData);
  }

  const getDashboardData = () => {
    try {
      setDashboardData(dashData)
      prepareChartData(dashData?.chart || null)
      // console.log("Getting dashboard data")
      // setDashboardData();
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const onSeeMore = () => {
    navigate('')
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
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5'>
          <InfoCard
          icon={<IoMdCard />}
          label="Total"
          value={addThousandsSeparator(
            dashboardData?.statistics.total || 0
          )} 
          color="bg-primary"
          />
          <InfoCard
          icon={<IoMdCard />}
          label="Pending"
          value={addThousandsSeparator(
            dashboardData?.statistics.pending || 0
          )} 
          color="bg-violet-500"
          />
          <InfoCard
          icon={<IoMdCard />}
          label="In Progress"
          value={addThousandsSeparator(
            dashboardData?.statistics.inProgress || 0
          )} 
          color="bg-cyan-500"
          />
          <InfoCard
          icon={<IoMdCard />}
          label="Completed"
          value={addThousandsSeparator(
            dashboardData?.statistics.completed || 0
          )} 
          color="bg-lime-500"
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>
          <div className=''>
            <div className='card'>
              <div className='flex items-center justify-between'>
                <h5 className='font-medium'>Distribution</h5>
              </div>
              <CustomPieChart 
              data={pieChartData}
              colors={COLORS}
              />
            </div>
          </div>
          <div className=''>
            <div className='card'>
              <div className='flex items-center justify-between'>
                <h5 className='font-medium'>Priority</h5>
              </div>
              <CustomBarChart 
              data={barChartData}
              />
            </div>
          </div>
          <div className='md:col-span-2'>
            <div className='card'>
              <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Recently</h5>
                <button className='card-btn' onClick={onSeeMore}>
                  See All <LuArrowRight className='text-base' />
                </button>
              </div>
              {/* {console.log(dashboardData.recent)} */}
              <ListTable tableData={dashboardData?.recent || []} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard