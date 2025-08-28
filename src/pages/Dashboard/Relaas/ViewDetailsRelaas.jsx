import React, { useState } from 'react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utils/axiosInstance';
import { API_PATHS } from '../../../utils/apiPath';

const ViewDetailsRelaas = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { relaasId } = location.state || {};
  const [relaas, setRelaas] = useState();
  const [loading, setLoading] = useState(false);

  const getRelaasById = async (relaasId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.RELAAS.ONE(relaasId))
      setRelaas(response.data);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.error(error.response.data.desc);
    } finally {
      setLoading(false);
    }
  }

  const handlePengiriman = async () => {};
  const handleUploadResi = async () => {};
  const handleUploadTracking = async () => {};


  return (
    <DashboardLayout activeMenu="Relaas">Halaman View Detail Relaas</DashboardLayout>
  )
}

export default ViewDetailsRelaas