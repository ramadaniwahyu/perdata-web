import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axiosInstance from '../../../utils/axiosInstance';
import { API_PATHS } from '../../../utils/apiPath';
import SelectDropDown from '../../../components/inputs/SelectDropDown';
import { KLASIFIKASI_PERKARA, KODE_PERKARA, KODE_SATKER } from '../../../utils/data';
import moment from 'moment';
import {LuFilePen, LuFilePlus2 } from 'react-icons/lu';

let dataPerkara = {
  nomor: "",
  jenis: "",
  klasifikasi: "",
  tglDaftar: "",
  kodePerkara: "",
  kodeSatker: "",
  tahun: "",
  riwayat: [],
  nomor_perkara: "",
}

const ViewDetailsPerkara = () => {
  const location = useLocation();
  const { perkaraId } = location.state || {};

  const [perkara, setPerkara] = useState(dataPerkara)

  const navigate = useNavigate();

  const getPerkaraById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.PERKARA.ONE(perkaraId));

      if (response.data) {
        setPerkara(response.data)
        const join_nomor = response.data.nomor + "/" + response.data.kodePerkara + "/" + response.data.tahun + "/" + response.data.kodeSatker
        setPerkara({ ...response.data, nomor_perkara: join_nomor })
      }
    } catch (error) {
      toast.error('Ada kesalahan', error)
      console.error('Something went wrong', error)
    }
  }

  const handleClick = (perkara) => {
    navigate('/dashboard/perkara/buat', {
      state: { perkaraId: perkara._id }
    })
  }

  useEffect(() => {
    if (!perkaraId) {
      navigate('/dashboard/perkara');
      toast.error('Halaman tidak ditemukan')
    } else {
      getPerkaraById();
    }
  }, [perkaraId])

  const breadcrumb = [
    { label: "Beranda", link: "/dashboard" },
    { label: "Perkara", link: "/dashboard/perkara" },
    { label: "Lihat", link: "/dashboard/perkara/lihat" },
  ]

  return (
    <DashboardLayout activeMenu="Perkara" breadcrumb={breadcrumb}>
      <div className='card my-5'>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl md:text-xl font-medium">Detil Perkara</h2>
          </div>
        </div>
        <div className=''>
          <div className='mt-5'>
            <div className='flex items-center justify-between w-full text-[13px] font-bold text-slate-50 bg-gray-700 py-1.5 px-4'>
              <p>Data Umum</p>
              <div className='flex items-center text-[11px] hover:text-primary font-medium px-4 py-0.5' onClick={() => handleClick(perkara)}>
                <LuFilePen className='text-base' />{' '}
              </div>
            </div>
          </div>
          <div className='mt-5'>
            <label className='text-xs font-medium text-slate-600'>
              Nomor Perkara
            </label>
            <input
              className='form-input'
              value={perkara.nomor_perkara}
              disabled
            />
          </div>
          <div className='mt-3'>
            <label className='text-xs font-medium text-slate-600'>
              Tanggal Pendaftaran
            </label>
            <input
              className='form-input'
              value={moment(perkara.tglDaftar).format("DD-MM-YYYY")}
              disabled
            />
          </div>
          <div className='mt-3'>
            <label className='text-xs font-medium text-slate-600'>
              Klasifikasi Perkara
            </label>
            <input
              className='form-input'
              value={perkara.klasifikasi}
              disabled
            />
          </div>
          <div className='mt-3'>
            <label className='text-xs font-medium text-slate-600'>
              Jenis Perkara
            </label>
            <input
              className='form-input'
              value={perkara.jenis}
              disabled
            />
          </div>
        </div>
        <div className=''>
          <div className='mt-5'>
            <div className='flex items-center justify-between w-full text-[13px] font-bold text-slate-50 bg-gray-700 py-1.5 px-4'>
              <p>Data Pihak</p>
              <div className='flex items-center text-[11px] hover:text-primary font-medium px-4 py-0.5' onClick={() => {}}>
                <LuFilePlus2 className='text-base' />{' '}
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <div className='mt-5'>
            <div className='flex items-center justify-between w-full text-[13px] font-bold text-slate-50 bg-gray-700 py-1.5 px-4'>
              <p>Hakim, Panitera, dan Jurusita</p>
              <div className='flex items-center text-[11px] hover:text-primary font-medium px-4 py-0.5' onClick={() => {}}>
                <LuFilePlus2 className='text-base' />{' '}
              </div>
            </div>
          </div>
        </div>
        <div className=''>
          <div className='mt-5'>
            <div className='flex items-center justify-between w-full text-[13px] font-bold text-slate-50 bg-gray-700 py-1.5 px-4'>
              <p>Riwayat Perkara</p>
              <div className='flex items-center text-[11px] hover:text-primary font-medium px-4 py-0.5' onClick={() => {}}>
                <LuFilePlus2 className='text-base' />{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout >
  )
}

export default ViewDetailsPerkara