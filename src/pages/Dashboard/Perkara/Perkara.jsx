import React from 'react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { Link } from 'react-router-dom'

const Perkara = () => {
  return (
    <DashboardLayout activeMenu="Perkara">
      <div className='card'>
        <p className='flex p-5'>Perkara</p>
        <Link className='p-5 btn-primary font-medium' to="buat">Tambah Perkara</Link>
      </div>
    </DashboardLayout>
  )
}

export default Perkara