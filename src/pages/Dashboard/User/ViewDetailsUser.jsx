import React from 'react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'

const ViewDetailsUser = () => {

  const breadcrumb = [
    { label: "Beranda", link: "/dashboard" },
    { label: "Pengguna", link: "/dashboard/pengguna" },
    { label: "Lihat", link: "/dashboard/pengguna/lihat" },
  ]
  return (
    <DashboardLayout activeMenu="Pengguna" breadcrumb={breadcrumb}>
      View Pengguna
    </DashboardLayout>
  )
}

export default ViewDetailsUser