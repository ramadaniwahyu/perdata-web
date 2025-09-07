import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../utils/axiosInstance';
import { API_PATHS } from '../../../utils/apiPath';
import Modal from '../../../components/modals/Dialog';
import { LuArrowLeft, LuArrowRight, LuCircleX, LuTrash2 } from 'react-icons/lu';
import toast from 'react-hot-toast';
import moment from 'moment';
import { PulseLoader } from 'react-spinners';

const ViewDetailsRelaas = () => {
  let emptyRelaas = {
    _id: "",
    nomorPerkara: "",
    nomorKirim: "",
    pihak: "",
    alamat: "",
    jenisPanggilan: {
      name: "",
    },
    jurusita: {
      name: "",
    },
    hasilPanggilan:"",
    desc:"",
  }
  const location = useLocation();
  const navigate = useNavigate();

  const { relaasId } = location.state || {};
  const [relaas, setRelaas] = useState(emptyRelaas);
  const [loading, setLoading] = useState(false);

  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const deleteRelaas = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put(API_PATHS.RELAAS.ONE(relaas._id), {
        isDeleted: true,
      });
      toast.success("Berhasil hapus Relaas");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    } finally {
      setRelaas(null);
      setLoading(false);
      setIsOpenDelete(false);
      navigate('/dashboard/relaas')
    }
  };

  const getRelaasById = async (relaasId) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.RELAAS.ONE(relaasId))
      setRelaas(response.data);
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg);
      console.error(error.response.data.desc);
    } finally {
      setLoading(false);
    }
  }

  const handleBatalPelaksanaan = async (relaas) => {
    setLoading(true);
    try {
      const resp = await axiosInstance.post(API_PATHS.RELAAS.CANCEL_PELAKSANAAN(relaas._id));
      toast.success(resp.data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.error(error.response.data.desc);
    } finally {
      setRelaas(emptyRelaas);
      setLoading(false);
      navigate('/dashboard/relaas')
    }
  };

  useEffect(() => {
    if (relaasId) {
      getRelaasById(relaasId)
    }
    return () => { };
  }, [relaasId])

  const breadcrumb = [
    { label: "Beranda", link: "/dashboard" },
    { label: "Relaas", link: "/dashboard/relaas" },
    { label: "Lihat", link: "#" },
  ];

  return (
    <DashboardLayout activeMenu="Relaas" breadcrumb={breadcrumb}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div className="col-span-3">
          <h2 className="text-xl md:text-2xl">Relaas Surat Tercatat</h2>
          <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
            Halaman untuk mengatur Relaas Panggilan / Pemberitahuan melalui
            Surat Tercatat.
          </p>
        </div>
        <div className='flex items-center gap-5'>
          <button
            title='Kembali ke halaman sebelumnya'
            className='flex items-center gap-1.5 text-[13px] font-medium text-green-500 bg-green-50 rounded border-green-100 hover:border-green-500 cursor-pointer'
            onClick={() => navigate(-1)}
          >
            <LuArrowLeft className='text-base' /> Kembali
          </button>
          <button
            title='Batal Pelaksanaan Relaas'
            className='flex items-center gap-1.5 text-[13px] font-medium text-amber-500 bg-amber-50 rounded border-amber-100 hover:border-amber-500 cursor-pointer'
            onClick={() => navigate(-1)}
          >
            <LuCircleX className='text-base' /> Batalkan Pelaksanaan
          </button>
          {relaasId && (
            <button
              title='Hapus relaas'
              className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded border-rose-100 hover:border-rose-500 cursor-pointer'
              onClick={() => setIsOpenDelete(true)}
            >
              <LuTrash2 className='text-base' /> Hapus
            </button>
          )}
        </div>
      </div>
      <div className='font-medium text-xl mt-5 text-gray-700'>
        <p>Data Umum</p>
      </div>
      <div className='mt-4'>
        <div className="mt-1">
          <label className="text-xs font-medium text-slate-600">
            Jenis Relaas
          </label>
          <input
            className="form-input"
            value={relaas.jenisPanggilan.name}
            type="text"
            disabled
          />
        </div>
        <div className="mt-1">
          <label className="text-xs font-medium text-slate-600">
            Jurusita
          </label>
          <input
            className="form-input"
            value={relaas.jurusita.name}
            type="text"
            disabled
          />
        </div>
        <div className="mt-1">
          <label className="text-xs font-medium text-slate-600">
            Nomor Perkara
          </label>
          <input
            className="form-input"
            value={relaas.nomorPerkara}
            type="text"
            disabled
          />
        </div>
        <div className="mt-1">
          <label className="text-xs font-medium text-slate-600">
            Nama Pihak
          </label>
          <input
            className="form-input"
            value={relaas.pihak}
            type="text"
            disabled
          />
        </div>
        <div className="mt-1">
          <label className="text-xs font-medium text-slate-600">Alamat</label>
          <input
            className="form-input text-wrap"
            value={relaas.alamat}
            type="text"
            disabled
          />
        </div>
      </div>
      <div className='font-medium text-xl mt-5 text-gray-700'>
        <p>Pengiriman</p>
      </div>
      <div className='flex items-start gap-3'>
        <div className='mt-2'>
          <div className="mt-1">
            <label className="text-xs font-medium text-slate-600">
              Tanggal Pengiriman
            </label>
            <input
              className="form-input"
              value={moment(relaas.tglKirim).format("DD-MM-YYYY")}
              type="text"
              disabled
            />
          </div>
          <div className="mt-1">
            <label className="text-xs font-medium text-slate-600">
              Nomor Pengiriman
            </label>
            <input
              className="form-input"
              value={relaas.nomorKirim}
              type="text"
              disabled
            />
          </div>
          {relaas.jenisPanggilan.name === "Panggilan Sidang" &&
            <>
              <div className="mt-1">
                <label className="text-xs font-medium text-slate-600">
                  Tanggal Sidang
                </label>
                <input
                  className="form-input"
                  value={moment(relaas.tglSidang).format("DD-MM-YYYY")}
                  type="text"
                  disabled
                />
              </div>
              <div className="mt-1">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  className="form-input"
                  value={moment(relaas.dueDate).format("DD-MM-YYYY")}
                  type="text"
                  disabled
                />
              </div>
            </>
          }
        </div>
        <div className="mt-2">
          <iframe
            src={relaas.fileResi}
            className='w-150 h-100 object-cover'
          ></iframe>
        </div>
      </div>
      <div className='font-medium text-xl mt-5 text-gray-700'>
        <p>Pelaksanaan</p>
      </div>
      <div className='flex items-start gap-3'>
        <div className='mt-2'>
          <div className="mt-1">
            <label className="text-xs font-medium text-slate-600">
              Tanggal Pelaksanaan
            </label>
            <input
              className="form-input"
              value={moment(relaas.tglPelaksanaan).format("DD-MM-YYYY")}
              type="text"
              disabled
            />
          </div>
          <div className="mt-1">
            <label className="text-xs font-medium text-slate-600">
              Hasil Relaas
            </label>
            <input
              className="form-input"
              value={relaas.hasilPanggilan}
              type="text"
              disabled
            />
          </div>
          <div className="mt-1">
            <label className="text-xs font-medium text-slate-600">
              Keterangan
            </label>
            <input
              className="form-input"
              value={relaas.desc}
              type="text"
              disabled
            />
          </div>
        </div>
        <div className="mt-2">
          <iframe
            src={relaas.fileTracking}
            className='w-150 h-100 object-cover'
          ></iframe>
        </div>
      </div>

      <Modal isOpen={isOpenDelete} onClose={() => setIsOpenDelete(false)}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-red-600 font-medium mb-4">Hapus</h2>
        </div>
        <div className="mt-4">
          <div className="mt-3">
            <p>
              Apakah yakin ingin menghapus data panggilan nomor perkara{" "}
              <b>{relaas.nomorPerkara}</b> tanggal{" "}
              <b>{moment(relaas.tglKirim).format("DD-MM-YYYY")}</b> atas nama{" "}
              <b>{relaas.pihak.toLocaleUpperCase()}</b>?
            </p>
          </div>

          <div className="flex items-center justify-end gap-1.5 p-3">
            <button
              onClick={() => setIsOpenDelete(false)}
              className="mt-4 bg-green-300 px-4 py-2 rounded"
            >
              Kembali
            </button>
            <button
              onClick={() => deleteRelaas()}
              className="mt-4 bg-red-300 px-4 py-2 rounded"
            >
              {!loading ? "Hapus" : <PulseLoader size={9} />}
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default ViewDetailsRelaas