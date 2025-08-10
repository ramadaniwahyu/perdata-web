import React, { useEffect, useState } from 'react'

import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { LuTrash2 } from 'react-icons/lu';
import SelectDropDown from '../../../components/inputs/SelectDropDown';
import { KLASIFIKASI_PERKARA, KODE_PERKARA, KODE_SATKER } from '../../../utils/data';
import axiosInstance from '../../../utils/axiosInstance';
import { API_PATHS } from '../../../utils/apiPath';
import toast from 'react-hot-toast';
import moment from 'moment';

const CreatePerkara = () => {
  const location = useLocation();
  const { perkaraId } = location.state || {};
  const navigate = useNavigate();

  const [perkaraData, setPerkaraData] = useState({
    klasifikasi: "",
    jenis: "",
    nomor: "",
    kodePerkara: "",
    tahun: "",
    kodeSatker: "",
    tglDaftar: "",
  });

  const [currentPerkara, setCurrentPerkara] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false)

  const handleValueChange = (key, value) => {
    setPerkaraData((prevData) => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {
    setPerkaraData({
      klasifikasi: "",
      jenis: "",
      nomor: "",
      kodePerkara: "",
      tahun: "",
      kodeSatker: "",
      tglDaftar: "",
    })
  }

  // Create Perkara 
  const createPerkara = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_PATHS.PERKARA.ALL, {
        ...perkaraData,
        tglDaftar: new Date(perkaraData.tglDaftar).toISOString(),
      });

      toast.success("Perkara berhasil dibuat");

      clearData();
      navigate("/dashboard/perkara")
    } catch (error) {
      setError("Error pembuatan perkara", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Update Perkara 
  const updatePerkara = async () => {
    console.log("Update Perkara")
  };

  const handleSubmit = async () => {
    setError(null);

    // Input validation
    if (!perkaraData.klasifikasi) {
      setError("Klasifikasi Perkara belum dipilih.")
    }

    if (!perkaraData.tglDaftar) {
      setError("Tanggal Pendaftaran masih kosong.")
    }
    if (!perkaraData.nomor) {
      setError("Nomor Register masih kosong.")
    }
    if (!perkaraData.kodePerkara) {
      setError("Kode Perkara masih kosong.")
    }
    if (!perkaraData.tahun) {
      setError("Tahun Perkara masih kosong.")
    }
    if (!perkaraData.kodeSatker) {
      setError("Kode Satker masih kosong.")
    }

    if (perkaraId) {
      updatePerkara();
      return;
    }

    createPerkara();
  };

  // Get Perkara by Id 
  const getPerkaraById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.PERKARA.ONE(perkaraId)
      );
      if (response.data) {
        const perkaraInfo = response.data
        setCurrentPerkara(perkaraInfo)

        setPerkaraData((prevState) =>({
          klasifikasi : perkaraInfo.klasifikasi,
          jenis: perkaraInfo.jenis,
          tglDaftar: perkaraInfo.tglDaftar
          ? moment(perkaraInfo.tglDaftar).format("YYYY-MM-DD")
          : null,
          nomor: perkaraInfo.nomor,
          kodePerkara: perkaraInfo.kodePerkara,
          tahun: perkaraInfo.tahun,
          kodeSatker: perkaraInfo.kodeSatker
        }))
      }
    } catch (error) {
      console.error("Error fetching data perkara", error)
    }
  };

  useEffect(() => {
    if(perkaraId) {
      getPerkaraById(perkaraId)
    }
    return () => {}
  }, [perkaraId])

  // Delete Perkara 
  const deletePerkara = async () => { };

  return (
    <DashboardLayout activeMenu="Perkara">
      <div className='mt-5'>
        <div className='grid grid-cols-1 md:grid-cols-4 mt-4'>
          <div className='form-card col-span-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl md:text-xl font-medium'>
                {perkaraId ? "Update Perkara" : "Buat Perkara"}
              </h2>
              {perkaraId && (
                <button
                  className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded border-rose-100 hover:border-rose-300 cursor-pointer'
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className='text-base' /> Hapus
                </button>
              )}
            </div>
            <div className='grid grid-cols-8 gap-4 mt-4'>
              <div className='col-span-2 md:col-span-2'>
                <label className='text-xs font-medium text-slate-600'>
                  Tanggal Pendaftaran
                </label>
                <input
                  placeholder='Tanggal Pendaftaran Perkara'
                  className='form-input'
                  value={perkaraData.tglDaftar}
                  onChange={({ target }) => handleValueChange("tglDaftar", target.value)
                  }
                  type='date'
                />
              </div>
              <div className='col-span-10 md:col-span-6'>
                <label className='text-xs font-medium text-slate-600'>
                  Klasifikasi Perkara
                </label>
                <SelectDropDown
                  options={KLASIFIKASI_PERKARA}
                  value={perkaraData.klasifikasi}
                  onChange={(value) => handleValueChange("klasifikasi", value)}
                  placeholder="Pilih Klasifikasi Perkara"
                />
              </div>
            </div>
            <div className='mt-3'>
              <label className='text-xs font-medium text-slate-600'>
                Jenis Perkara
              </label>
              <input
                placeholder='Jenis Perkara'
                className='form-input'
                value={perkaraData.jenis}
                onChange={({ target }) => handleValueChange("jenis", target.value)
                }
              />
            </div>

            <div className='grid grid-cols-12 gap-2 mt-2'>
              <div className='col-span-2 md:col-span-2'>
                <label className='text-xs font-medium text-slate-600'>
                  Nomor Perkara
                </label>
                <input
                  placeholder='Nomor Register'
                  className='form-input'
                  value={perkaraData.nomor}
                  onChange={({ target }) => handleValueChange("nomor", target.value)
                  }
                />
              </div>

              <div className='col-span-4 md:col-span-3'>
                <label className='text-xs font-medium text-slate-600'>
                  Kode Perkara
                </label>
                <SelectDropDown
                  options={KODE_PERKARA}
                  value={perkaraData.kodePerkara}
                  onChange={(value) => handleValueChange("kodePerkara", value)}
                  placeholder="Pilih Kode Perkara"
                />
              </div>

              <div className='col-span-2 md:col-span-2'>
                <label className='text-xs font-medium text-slate-600'>
                  Tahun
                </label>
                <input
                  placeholder='Tahun Perkara'
                  className='form-input'
                  value={perkaraData.tahun}
                  onChange={({ target }) => handleValueChange("tahun", target.value)
                  }
                />
              </div>
              <div className='col-span-4 md:col-span-3'>
                <label className='text-xs font-medium text-slate-600'>
                  Kode Satker
                </label>
                <SelectDropDown
                  options={KODE_SATKER}
                  value={perkaraData.kodeSatker}
                  onChange={(value) => handleValueChange("kodeSatker", value)}
                  placeholder="Pilih Kode Satker"
                />
              </div>
            </div>

            {error && (
              <p className='text-xs font-medium text-red-500'>{error}</p>
            )}

            <div className='flex justify-end mt-7'>
              <button
                className='add-btn'
                onClick={handleSubmit}
                disabled={loading}
              >
                {perkaraId ? "Update Perkara" : "Buat Perkara"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CreatePerkara