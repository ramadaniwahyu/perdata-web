import React, { useContext, useEffect, useState } from 'react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import moment from 'moment'
import UserTable from '../../../components/tables/UserTable'
import axiosInstance from '../../../utils/axiosInstance'
import { API_PATHS } from '../../../utils/apiPath'

const Users = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.ALL);
      setDataUsers(response.data.users)
    } catch (error) {
      console.error("Error fetching data Users", error);
    } finally {
      setLoading(false);
    }
  }

  const handleActivate = async (userId, data) => {
    try {
      const response = await axiosInstance.post(API_PATHS.USERS.ONE(userId), {
        isActive: data
      })
      console.log(response.data.msg)
      return;
    } catch (error) {
      if (error.response && error.response.data.msg) {
        setError(error.response.data.msg)
      } else {
        setError("Something went error. Try again later.")
      }
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  const breadcrumb = [
    { label: "Beranda", link: "/dashboard" },
    { label: "Pengguna", link: "/dashboard/pengguna" },
  ]

  return (
    <DashboardLayout activeMenu="Pengguna" breadcrumb={breadcrumb}>
      {/* Title Header Page */}
      <div>
        <div className='col-span-3'>
          <h2 className='text-xl md:text-2xl'>Pengguna</h2>
          <p className='text-xs md:text-[13px] text-gray-400 mt-1.5'>
            Halaman untuk mengatur Pengguna pada Aplikasi ini.
          </p>
        </div>
      </div>

      {/* List Table Pengguna */}
      <UserTable tableData={dataUsers} />

    </DashboardLayout>
  )
}

export default Users