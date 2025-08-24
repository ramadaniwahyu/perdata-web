import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { LuTrash2, LuUserRoundPen } from 'react-icons/lu'
import Modal from "../../../components/modals/Dialog"
import axiosInstance from '../../../utils/axiosInstance'
import { API_PATHS } from '../../../utils/apiPath'
import toast from 'react-hot-toast'

import { JURUSITA } from "../../../utils/data";
import SelectDropDown from '../../../components/inputs/SelectDropDown'
import JurusitaCard from '../../../components/cards/JurusitaCard'
import JsImageSelector from '../../../components/inputs/JsImageSelector'
import uploadImage from '../../../utils/uploadImage'
import Loading from '../../../components/Loading'
import { PulseLoader } from 'react-spinners'

const Jurusita = () => {
  let emptyJS = {
    jabatan: "",
    name: "",
    nip: "",
    desc: "",
    jsImage: null
  }
  const [allJurusita, setAllJurusita] = useState([]);
  const [jurusita, setJurusita] = useState(emptyJS);
  const [onEdit, setOnEdit] = useState(false);
  const [error, setError] = useState("");
  const [callBack, setCallBack] = useState(false);
  const [jsImageUrl, setJsImageUrl] = useState(null)
  const [openDeleteJurusita, setOpenDeleteJurusita] = useState(false);
  const [loading, setLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setJurusita(emptyJS);
    setOnEdit(false);
    setError("");
    setJsImageUrl(null);
    setIsModalOpen(false);
  };

  const getJurusita = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(API_PATHS.JURUSITA.ALL)

      setAllJurusita(response.data.jurusita);

    } catch (error) {
      console.error("Ada kesalahan menarik data Jurusita", error)
      toast.error("Ada kesalahan menarik data Jurusita", error)
    } finally {
      setLoading(false)
    }
  }

  const openNewJurusita = () => {
    setJurusita(emptyJS);
    setJsImageUrl(null)
    setError("")
    openModal();
  }

  const openEditJurusita = (jurusita) => {
    setJurusita({ ...jurusita });
    setError("")
    setOnEdit(true);
    openModal();
  }

  const openDelete = (jurusita) => {
    setJurusita({...jurusita});
    setOpenDeleteJurusita(true);
  }

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (jurusita.jsImage !== jsImageUrl) {
      const imgUploadRes = await uploadImage(jsImageUrl);
      jurusita.jsImage = imgUploadRes.imageUrl || "";
    } 

    if (!jurusita.jabatan) {
      setError("Jabatan harus dipilih.")
      return;
    }

    if (!jurusita.name) {
      setError("Nama harus diisi.")
      return;
    }


    if (!jurusita.nip) {
      setError("NIP harus diisi.")
      return;
    }

    if (onEdit) {
      updateJurusita();
    } else {
      saveJurusita();
    }
  }

  const saveJurusita = async (event) => {
    setLoading(true)
    try {
      await axiosInstance.post(API_PATHS.JURUSITA.ALL, jurusita)

      toast.success("Berhasil menambahkan jurusita");
    } catch (error) {
      console.error("Ada kesalahan.", error)
      toast.error("Ada kesalahan.")
    } finally {
      setJurusita(emptyJS);
      setLoading(false)
      closeModal();
      setCallBack(!callBack)
    }
  }

  const updateJurusita = async () => {
    setLoading(true)
    try {
      await axiosInstance.patch(API_PATHS.JURUSITA.ONE(jurusita._id), jurusita)
      toast.success("Berhasil update Jurusita")
    } catch (error) {
      console.error("Ada kesalahan.", error)
      toast.error("Ada kesalahan.")
    } finally {
      setJurusita(emptyJS);
      setOnEdit(false)
      setLoading(false)
      closeModal();
      setCallBack(!callBack)
    }
  }

  const deleteJurusita = async () => {
    setLoading(true)
    try {
      await axiosInstance.put(API_PATHS.JURUSITA.DELETE(jurusita._id), {
        isDeleted: true
      })
      toast.success("Berhasil menghapus Jurusita")
    } catch (error) {
      console.error("Ada kesalahan.", error)
      toast.error("Ada kesalahan.")
    } finally {
      setJurusita(emptyJS)
      setLoading(false)
      setOnEdit(false)
      setOpenDeleteJurusita(false)
      setCallBack(!callBack)
    }
  }

  const handleValueChange = (key, value) => {
    setJurusita((prevData) => ({ ...prevData, [key]: value }));
  };

  useEffect(() => {
    getJurusita();
  }, [callBack]);

  const getJabatanColor = (jurusita) => {
    switch (jurusita.jabatan) {
      case "Jurusita":
        return "text-lime-500 bg-lime-50 border border-lime-500/20";
      case "Jurusita Pengganti":
        return "text-yellow-500 bg-yellow-50 border border-yellow-500/20";
      default:
        return "text-yellow-500 bg-yellow-50 border border-yellow-500/20";
    }
  };

  const breadcrumb = [
    { label: "Beranda", link: "/dashboard" },
    { label: "Jurusita", link: "/dashboard/jurusita" },
  ]

  // if (loading) return <Loading  active={loading}/>

  return (
    <DashboardLayout activeMenu="Jurusita" breadcrumb={breadcrumb}>
      {/* Title Header Page */}
      <div className='flex flex-col lg:flex-row lg:items-center justify-between'>
        <div className='col-span-3'>
          <h2 className='text-xl md:text-2xl'>Jurusita</h2>
          <p className='text-xs md:text-[13px] text-gray-400 mt-1.5'>
            Halaman untuk mengatur Jurusita.
          </p>
        </div>
        <div className="flex item-center justify-end gap-2">
          <button onClick={openNewJurusita} className="lg:flex hidden create-btn">
            <LuUserRoundPen className='text-lg' /> Tambah
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-3 gap-4 mt-4">
        {allJurusita.map((item) => (
          <div key={item._id} 
            className='bg-blue-100 rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200/50 cursor-pointer'
          >
            <div className='flex justify-between items-center gap-3 px-4 border-b-0'>
              <div
                className={`text-[11px] font-medium ${getJabatanColor(item)} px-4 py-0.5 rounded`}
              >
                {item.jabatan ? item.jabatan : "Jurusita Pengganti"}
              </div>
              <button
                className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded border-rose-100 hover:border-rose-300 cursor-pointer'
                onClick={() => openDelete(item)}
              >
                <LuTrash2 className='text-base' />
              </button>

            </div>
            <div onClick={() => openEditJurusita(item)} className={`px-3 border-l-[3px] ${item.jabatan === "Jurusita"
              ? "border-lime-500"
              : "border-yellow-500"
              }`}>
              <div className='px-3'>
                <div className='flex items-center justify-start my-1'>
                  <div className='relative'>
                    <img
                      src={item.jsImage ? item.jsImage : "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"}
                      alt="Jurusita Image"
                      className='w-30 h-30 bg-slate-400 rounded-4xl'
                    />
                  </div>
                  <div className='mx-4'>
                    <p className='text-sm font-medium text-gray-800 mt-4 line-clamp-2'>
                      {item.name} <br /> <small>{item.nip}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='flex items-center justify-between'>
          <h2 className="text-xl font-medium mb-4">{onEdit ? "Update Jurusita" : "Tambah Jurusita"}</h2>
        </div>
        <div className='mt-4'>
          <div className='mt-3'>
            <JsImageSelector
              image={onEdit ? jurusita.jsImage : jsImageUrl}
              setImage={setJsImageUrl}
              onEdit={onEdit}
            />
          </div>
          <div className='mt-3'>
            <label className='text-xs font-medium text-slate-600'>
              Sebagai
            </label>
            <SelectDropDown
              options={JURUSITA}
              value={jurusita.jabatan}
              onChange={(value) => handleValueChange("jabatan", value)}
              placeholder="Pilih Jabatan Jurusita"
            />
          </div>
          <div className='mt-3'>
            <label className='text-xs font-medium text-slate-600'>
              Nama Jurusita
            </label>
            <input
              placeholder='Masukkan nama jurusita'
              className='form-input'
              value={jurusita.name}
              onChange={({ target }) => handleValueChange("name", target.value)
              }
              type='text'
            />
          </div>
          <div className='mt-3'>
            <label className='text-xs font-medium text-slate-600'>
              Nomor Induk Pegawai
            </label>
            <input
              placeholder='Masukkan nip jurusita'
              className='form-input'
              value={jurusita.nip}
              onChange={({ target }) => handleValueChange("nip", target.value)
              }
              type='text'
            />
          </div>
          <div className='mt-3'>
            <label className='text-xs font-medium text-slate-600'>
              Keterangan
            </label>
            <input
              placeholder='Masukkan keterangan disini'
              className='form-input'
              value={jurusita.desc}
              onChange={({ target }) => handleValueChange("desc", target.value)
              }
              type='text'
            />
          </div>
          {error && (
            <p className='text-xs font-medium text-red-500'>{error}</p>
          )}
          <div className='flex items-center justify-end gap-1.5 p-3'>
            <button onClick={closeModal} className="mt-4 bg-red-300 px-4 py-2 rounded" disabled={loading}>
              Kembali
            </button>
            <button onClick={handleSubmit} className="mt-4 bg-green-300 px-4 py-2 rounded" disabled={loading}>
              {!loading 
              ? (onEdit ? "Update" : "Tambah")
              : (
                <PulseLoader size={9} />
              )
            }
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openDeleteJurusita} onClose={() => setOpenDeleteJurusita(false)}>
        <div className='flex items-center justify-between'>
          <h2 className="text-xl text-red-600 font-medium mb-4">Hapus Jurusita</h2>
        </div>
        <div className='mt-4'>
          <div className='mt-3'>
            <p>Apakah yakin ingin menghapus data jurusita atas nama {jurusita.name} NIP. {jurusita.nip}?</p>
          </div>

          <div className='flex items-center justify-end gap-1.5 p-3'>
            <button onClick={()=> setOpenDeleteJurusita(false)} className="mt-4 bg-green-300 px-4 py-2 rounded">
              Kembali
            </button><button onClick={()=> deleteJurusita()} className="mt-4 bg-red-300 px-4 py-2 rounded">
              {!loading ? "Hapus" : <PulseLoader size={9}/>}
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default Jurusita