import React, { useCallback, useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { LuFileBadge, LuFilePen, LuFileUser, LuTrash2 } from "react-icons/lu";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPath";
import toast from "react-hot-toast";
import Modal from "../../../components/modals/Dialog";
import { PulseLoader } from "react-spinners";
import RelaasCard from "../../../components/cards/RelaasCard";
import SelectDropDownFromFetch from "../../../components/inputs/SelectDropDownFromFetch";
import moment from "moment";

const Relaas = () => {
  let emptyRelaas = {
    _id: 0,
    jenisPanggilan: "",
    tglKirim: "",
    jurusita: "",
    nomorPerkara: "",
    pihak: "",
    alamat: "",
    tglSidang: "",
    dueDate: "",
  };

  const [allRelaas, setAllRelaas] = useState([emptyRelaas]);
  const [relaas, setRelaas] = useState(emptyRelaas);
  const [jenisPanggillan, setJenisPanggilan] = useState(null);
  const [jurusita, setJurusita] = useState(null);
  const [fileResiUrl, setFileResiUrl] = useState(null);
  const [fileTrackingUrl, setFileTrackingUrl] = useState(null);

  const [onEdit, setOnEdit] = useState(false);
  const [callBack, setCallBack] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenNew, setIsOpenNew] = useState(false);
  const openNew = () => setIsOpenNew(true);
  const closeNew = () => {
    setRelaas(emptyRelaas);
    setOnEdit(false);
    setError(null);
    setIsOpenNew(false);
    setCallBack(!callBack);
  };

  const openNewRelaas = () => {
    setRelaas(emptyRelaas);
    setError(null);
    openNew();
  };

  const openEditRelaas = (relaas) => {
    setRelaas({
      ...relaas,
      tglKirim: relaas.tglKirim
        ? moment(relaas.tglKirim).format("YYYY-MM-DD")
        : "",
      tglSidang: relaas.tglSidang
        ? moment(relaas.tglSidang).format("YYYY-MM-DD")
        : "",
      dueDate: relaas.dueDate
        ? moment(relaas.dueDate).format("YYYY-MM-DD")
        : "",
    });
    setError(null);
    setOnEdit(true);
    openNew();
  };

  const openDeleteRelaas = (relaas) => {
    setRelaas({ ...relaas });
    setIsOpenDelete(true);
  };

  const updateRelaas = useCallback(async () => {
    setLoading(true);
    try {
      await axiosInstance.patch(API_PATHS.RELAAS.ONE(relaas._id), relaas);
      toast.success("Berhasil update Relaas");
    } catch (error) {
      toast.error(error.response.data.msg);
      console.error(error.response.data.desc);
    } finally {
      setRelaas(emptyRelaas);
      setOnEdit(false);
      setLoading(false);
      setCallBack(!callBack);
      closeNew();
    }
  });

  const createRelaas = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(API_PATHS.RELAAS.ALL, relaas);
      toast.success("Berhasil menambahkan Relaas");
    } catch (error) {
      toast.error(error.response.data.msg);
      console.error(error.response.data.desc);
    } finally {
      setRelaas(emptyRelaas);
      setLoading(false);
      closeNew();
      setCallBack(!callBack);
    }
  };

  const deleteRelaas = async () => {
    setLoading(true);
    try {
      await axiosInstance.put(API_PATHS.RELAAS.ONE(relaas._id), {
        isDeleted: true,
      });
      toast.success("Berhasil hapus Relaas");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
      console.error(error.response.data.desc);
    } finally {
      setRelaas(emptyRelaas);
      setLoading(false);
      setIsOpenDelete(false);
      setCallBack(!callBack);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!relaas.jurusita) {
      setError("Jurusita belum dipilih.");
      return;
    }
    if (!relaas.alamat) {
      setError("Alamat belum diisi.");
      return;
    }
    if (!relaas.pihak) {
      setError("Pihak belum diisi.");
      return;
    }
    if (!relaas.nomorPerkara) {
      setError("Nomor Perkara belum diisi.");
      return;
    }
    if (!relaas.tglKirim) {
      setError("Tanggal Pengiriman belum diisi.");
      return;
    }
    if (!relaas.jenisPanggilan) {
      setError("Jenis Panggilan belum dipilih.");
      return;
    }

    if (onEdit) {
      updateRelaas();
    } else {
      createRelaas();
    }
  };

  const getJenisPanggilan = async () => {
    try {
      const response = await axiosInstance(API_PATHS.JENIS_PANGGILAN.ALL);
      setJenisPanggilan(response.data || []);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.error(error.response.data.desc);
      console.log(error);
    }
  };

  const getJurusita = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.JURUSITA.ALL);
      setJurusita(response.data.jurusita || []);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.error(error.response.data.desc);
      console.log(error);
    }
  };

  const getRelaas = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.RELAAS.ALL);
      setAllRelaas(
        response.data.panggilan.length > 0
          ? response.data.panggilan
          : []
      );
    } catch (error) {
      toast.error(error.response.data.msg);
      console.error(error.response.data.desc);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJenisPanggilan();
    getJurusita();
    getRelaas();
  }, [callBack]);

  const handleValueChange = (key, value) => {
    setRelaas((prevData) => ({ ...prevData, [key]: value }));
  };

  const actionMenu = (rowData) => {
    return (
      <>
        <div className=" flex items-center justify-between gap-4">
          <div
            tooltip="Ubah"
            className={`flex items-center text-[11px] hover:text-blue-500 text-blue-300 font-medium px-4 py-0.5 mt-4 cursor-pointer`}
            onClick={() => openEditRelaas(rowData)}
          >
            <LuFilePen className="text-base" size={25} />
            &nbsp;Ubah
          </div>
          <div
            className={`flex items-center text-[11px] hover:text-yellow-500 text-yellow-300 font-medium px-4 py-0.5 mt-4 cursor-pointer`}
          >
            <LuFileBadge className="text-base" size={25} />
            &nbsp;Detail
          </div>
          <div
            className={`flex items-center text-[11px] hover:text-red-500 text-red-300 font-medium px-4 py-0.5 mt-4 cursor-pointer`}
            onClick={() => openDeleteRelaas(rowData)}
          >
            <LuTrash2 className="text-base" size={25} />
            &nbsp;Hapus
          </div>
        </div>
      </>
    );
  };

  const breadcrumb = [
    { label: "Beranda", link: "/dashboard" },
    { label: "Relaas", link: "/dashboard/relaas" },
  ];
  return (
    <DashboardLayout activeMenu="Relaas" breadcrumb={breadcrumb}>
      {/* Title Header Page */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div className="col-span-3">
          <h2 className="text-xl md:text-2xl">Relaas Surat Tercatat</h2>
          <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
            Halaman untuk mengatur Relaas Panggilan / Pemberitahuan melalui
            Surat Tercatat.
          </p>
        </div>
        <div className="flex item-center justify-end gap-2">
          <button onClick={openNewRelaas} className="lg:flex hidden create-btn">
            <LuFileUser className="text-lg" /> Tambah
          </button>
        </div>
      </div>

      {/* Relaas Card */}
      <div className="w-full gap-4 mt-4">
        {allRelaas &&
          allRelaas.map((item) => (
            <RelaasCard
              key={item._id}
              data={item}
              footerMenu={actionMenu(item)}
            />
          ))}
      </div>

      <Modal isOpen={isOpenNew} onClose={closeNew}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium mb-4">
            {onEdit ? "Update Relaas" : "Tambah Relaas"}
          </h2>
        </div>
        <div className="mt-2">
          <div className="mt-1">
            <label className="text-xs font-medium text-slate-600">
              Pilih Jenis Relaas
            </label>
            {/* <SelectDropDown
                            options={jenisPanggillan}
                            value={relaas.jenisPanggilan}
                            onChange={(value) => handleValueChange("jenisPanggilan", value)}
                            placeholder="Pilih Jenis Relaas"
                        /> */}
            <SelectDropDownFromFetch
              options={jenisPanggillan}
              value={relaas.jenisPanggilan}
              onChange={(value) => handleValueChange("jenisPanggilan", value)}
              placeholder="Pilih Jenis Relaas"
            />
          </div>
          <div className="mt-1">
            <label className="text-xs font-medium text-slate-600">
              Pilih Jurusita
            </label>
            {/* <SelectDropDown
                            options={jurusita}
                            value={relaas.jurusita}
                            onChange={(value) => handleValueChange("jurusita", value)}
                            placeholder="Pilih Jurusita"
                        /> */}
            <SelectDropDownFromFetch
              options={jurusita}
              value={relaas.jurusita}
              onChange={(value) => handleValueChange("jurusita", value)}
              placeholder="Pilih Jurusita"
            />
          </div>
          <div className="mt-1">
            <label className="text-xs font-medium text-slate-600">
              Tanggal Pengiriman Relaas
            </label>
            <input
              placeholder="Tanggal Pengiriman Relaas"
              className="form-input"
              value={relaas.tglKirim}
              onChange={({ target }) =>
                handleValueChange("tglKirim", target.value)
              }
              type="date"
            />
          </div>
          <div className="mt-1">
            <label className="text-xs font-medium text-slate-600">
              Nomor Perkara
            </label>
            <input
              placeholder="Masukkan Nomor Perkara"
              className="form-input"
              value={relaas.nomorPerkara}
              onChange={({ target }) =>
                handleValueChange("nomorPerkara", target.value)
              }
              type="text"
            />
          </div>
          <div className="mt-1">
            <label className="text-xs font-medium text-slate-600">
              Nama Pihak
            </label>
            <input
              placeholder="Masukkan nama pihak"
              className="form-input"
              value={relaas.pihak}
              onChange={({ target }) =>
                handleValueChange("pihak", target.value)
              }
              type="text"
            />
          </div>
          <div className="mt-1">
            <label className="text-xs font-medium text-slate-600">Alamat</label>
            <input
              placeholder="Masukkan alamat"
              className="form-input"
              value={relaas.alamat}
              onChange={({ target }) =>
                handleValueChange("alamat", target.value)
              }
              type="text"
            />
          </div>
          <div className="mt-1">
            <label className="text-xs font-medium text-slate-600">
              Tanggal Sidang
            </label>
            <input
              placeholder="Tanggal Sidang"
              className="form-input"
              value={relaas.tglSidang}
              onChange={({ target }) =>
                handleValueChange("tglSidang", target.value)
              }
              type="date"
            />
            <p className="text-xs font-light italic text-gray-500">
              Silahkan isi bila merupakan Panggilan Sidang
            </p>
          </div>
          <div className="mt-1">
            <label className="text-xs font-medium text-slate-600">
              Due Date
            </label>
            <input
              placeholder="Due Date"
              className="form-input"
              value={relaas.dueDate}
              onChange={({ target }) =>
                handleValueChange("dueDate", target.value)
              }
              type="date"
            />
            <p className="text-xs font-light italic text-gray-500">
              Silahkan isi bila merupakan Panggilan Sidang
            </p>
          </div>
          {error && <p className="text-xs font-medium text-red-500">{error}</p>}
          <div className="flex items-center justify-end gap-1.5 p-3">
            <button
              onClick={closeNew}
              className="mt-4 bg-red-300 px-4 py-2 rounded"
              disabled={loading}
            >
              Kembali
            </button>
            <button
              onClick={handleSubmit}
              className="mt-4 bg-green-300 px-4 py-2 rounded"
              disabled={loading}
            >
              {!loading ? (
                onEdit ? (
                  "Update"
                ) : (
                  "Tambah"
                )
              ) : (
                <PulseLoader size={9} />
              )}
            </button>
          </div>
        </div>
      </Modal>

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
  );
};

export default Relaas;
