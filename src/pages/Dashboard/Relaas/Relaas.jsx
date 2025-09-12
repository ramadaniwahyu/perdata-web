import React, { useCallback, useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { LuActivity, LuEye, LuFilePen, LuFileUser, LuPrinter, LuSearch, LuSend, LuTrash2 } from "react-icons/lu";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPath";
import toast from "react-hot-toast";
import Modal from "../../../components/modals/Dialog";
import { PulseLoader } from "react-spinners";
import SelectDropDownFromFetch from "../../../components/inputs/SelectDropDownFromFetch";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import JsFileUploader from "../../../components/inputs/JsFileUploader";
import { HASIL_PANGGILAN } from "../../../utils/data";
import SelectDropDown from "../../../components/inputs/SelectDropDown";
import uploadFile from "../../../utils/uoloadFile";
import RelaasTable from "../../../components/tables/RelaasTable";

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
    const now = new Date();

    const [allRelaas, setAllRelaas] = useState([]);
    const [relaas, setRelaas] = useState(emptyRelaas);
    const [jenisPanggillan, setJenisPanggilan] = useState(null);
    const [jurusita, setJurusita] = useState(null);
    const [fileResiUrl, setFileResiUrl] = useState(null);
    const [fileTrackingUrl, setFileTrackingUrl] = useState(null);
    const [tglRelaas, setTglRelaas] = useState(moment(now.toISOString()).format("YYYY-MM-DD"));

    const [onEdit, setOnEdit] = useState(false);
    const [callBack, setCallBack] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [isOpenPengiriman, setIsOpenPengiriman] = useState(false);
    const closePengiriman = () => {
        setRelaas(emptyRelaas);
        setFileResiUrl(null);
        setError(null);
        setIsOpenPengiriman(false);
    };
    const [isOpenPelaksanaan, setIsOpenPelaksanaan] = useState(false);
    const closePelaksanaan = () => {
        setRelaas(emptyRelaas);
        setFileTrackingUrl(null);
        setError(null);
        setIsOpenPelaksanaan(false);
    };
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenNew, setIsOpenNew] = useState(false);
    const openNew = () => setIsOpenNew(true);
    const closeNew = () => {
        setRelaas(emptyRelaas);
        setOnEdit(false);
        setError(null);
        setIsOpenNew(false);
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

    const openPengirimanRelaas = (relaas) => {
        setRelaas({ ...relaas });
        setIsOpenPengiriman(true);
    }

    const openPelaksanaanRelaas = (relaas) => {
        setRelaas({ ...relaas });
        setIsOpenPelaksanaan(true);
    }

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
            setError(null);
            setOnEdit(false);
            setLoading(false);
            closeNew();
            setCallBack(!callBack);
        }
    });

    const createRelaas = async () => {
        setLoading(true);
        try {
            await axiosInstance.post(API_PATHS.RELAAS.ALL, relaas);
            toast.success("Berhasil menambahkan Relaas");
        } catch (error) {
            console.log(error)
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
        } finally {
            setRelaas(emptyRelaas);
            setLoading(false);
            setIsOpenDelete(false);
            setCallBack(!callBack);
        }
    };

    const handleSubmitPengiriman = async (event) => {
        event.preventDefault();

        if (!relaas.nomorKirim) {
            setError("Nomor pengiriman relaas belum diisi");
            return;
        }
        if (fileResiUrl) {
            const fileUploadRes = await uploadFile(fileResiUrl);
            relaas.fileResi = fileUploadRes.fileUrl || "";
        } else {
            setError("Dokumen pengiriman relaas belum ada");
            return;
        }

        setLoading(true);
        try {
            await axiosInstance.patch(API_PATHS.RELAAS.ONE(relaas._id), {
                nomorKirim: relaas.nomorKirim, fileResi: relaas.fileResi
            });

            toast.success("Berhasil");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);
            console.error(error.response.data.desc);
        } finally {
            setRelaas(emptyRelaas);
            setLoading(false);
            setIsOpenPengiriman(false);
            setCallBack(!callBack);
        }
    }

    const handleSubmitPelaksanaan = async (event) => {
        event.preventDefault();
        if (!relaas.tglPelaksanaan) {
            setError("Tanggal Pelaksanaan relaas belum diisi");
            return;
        }
        if (!relaas.hasilPanggilan) {
            setError("Hasil pelaksanaan relaas belum dipilih");
            return;
        }
        if (fileTrackingUrl) {
            const fileUploadRes = await uploadFile(fileTrackingUrl);
            relaas.fileTracking = fileUploadRes.fileUrl || "";
        } else {
            setError("Dokumen pelaksanaan relaas belum ada");
            return;
        }
        setLoading(true);
        try {
            await axiosInstance.patch(API_PATHS.RELAAS.ONE(relaas._id), {
                tglPelaksanaan: relaas.tglPelaksanaan, hasilPanggilan: relaas.hasilPanggilan, desc: relaas.desc, fileTracking: relaas.fileTracking
            });
            toast.success("Berhasil");
        } catch (error) {
            toast.error(error.response.data.msg);
            console.error(error.response.data.desc);
        } finally {
            setRelaas(emptyRelaas);
            setLoading(false);
            setIsOpenPelaksanaan(false);
            setCallBack(!callBack);
        }
    }

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
            updateRelaas(relaas);
        } else {
            createRelaas();
        }
    };

    const handleViewDetails = (relaas) => {
        navigate('lihat', {
            state: { relaasId: relaas._id }
        })
    };

    const handleBatalPengiriman = async (relaas) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(API_PATHS.RELAAS.CANCEL_KIRIM(relaas._id));
            toast.success(response.data.msg);
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg);
            console.error(error.response.data.desc);
        } finally {
            setRelaas(emptyRelaas);
            setFileResiUrl(null)
            setIsOpenPelaksanaan(false);
            setLoading(false);
            setCallBack(!callBack);
        }
    };

    const handleGetDate = async (e) => {
        setTglRelaas(e.target.value);
    };

    const handlePrintRelaas = async (tglRelaas) => {
        navigate('cetak', {
            state: { data: allRelaas, tglPos: tglRelaas }
        })
    }

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
            const search = `?tglKirim=${tglRelaas}` || null
            const response = await axiosInstance.get(API_PATHS.RELAAS.ALL_SEARCH(search));
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
    }, [callBack, tglRelaas]);


    const handleValueChange = (key, value) => {
        setRelaas((prevData) => ({ ...prevData, [key]: value }));
    };

    const actionMenu = (item) => {
        return (
            <>
                <div className="flex items-center justify-center px-2 py-0.5 gap-2">
                    {item.tglPelaksanaan ? (
                        <div
                            title="Detil Relaas"
                            className={`text-[11px] hover:text-blue-500 text-blue-300 cursor-pointer`}
                            onClick={() => handleViewDetails(item)}
                        >
                            <LuEye className="text-base" size={20} />
                        </div>
                    ) : item.nomorKirim ? (
                        <div
                            title="Pelaksanaan"
                            className={`text-[11px] hover:text-violet-500 text-violet-300 cursor-pointer`}
                            onClick={() => openPelaksanaanRelaas(item)}
                        >
                            <LuActivity className="text-base" size={20} />
                        </div>
                    ) : (
                        <>
                            <div
                                title="Pengiriman"
                                className={`text-[11px] hover:text-green-500 text-green-300 cursor-pointer`}
                                onClick={() => openPengirimanRelaas(item)}
                            >
                                <LuSend className="text-base" size={20} />
                            </div>
                            <div
                                title='Ubah Relaas'
                                className={`text-[11px] hover:text-amber-500 text-amber-300 cursor-pointer`}
                                onClick={() => openEditRelaas(item)}
                            >
                                <LuFilePen className="text-base" size={20} />
                            </div>
                        </>
                    )}
                    <div
                        title="Hapus Relaas"
                        className={`text-[11px] hover:text-red-500 text-red-300 cursor-pointer`}
                        onClick={() => openDeleteRelaas(item)}
                    >
                        <LuTrash2 className="text-base" size={20} />
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
                    <button onClick={() => handlePrintRelaas(tglRelaas)} className="lg:flex hidden print-btn">
                        <LuPrinter className="text-lg" /> Cetak
                    </button>
                    <button onClick={openNewRelaas} className="lg:flex hidden create-btn">
                        <LuFileUser className="text-lg" /> Tambah
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto p-0 rounded-lg mt-3">
                <div className="w-full px-4 py-0.5 flex items-center justify-between">
                    <div className="text-start">
                        <label className="text-[13px] font-medium text-slate-600">
                            Tanggal Pengiriman Relaas
                        </label>
                        <input
                            placeholder="Tanggal Pengiriman Relaas"
                            className="form-input"
                            value={tglRelaas}
                            onChange={handleGetDate}
                            type="date"
                        />
                    </div>
                    <div className="text-end">
                        Total : {allRelaas.length} Relaas
                    </div>
                </div>
                <table className="min-w-full">
                    <thead>
                        <tr className="text-left">
                            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]"></th>
                            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">Pengiriman</th>
                            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">
                                Nomor Perkara / Pihak
                            </th>
                            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">
                                Status
                            </th>
                            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">
                                Jenis Panggilan
                            </th>
                            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">
                                Pelaksanaan
                            </th>
                            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading ?
                            allRelaas.length > 0 ? (
                                allRelaas.map((item) => (
                                    <RelaasTable
                                        key={item._id}
                                        item={item}
                                        actionMenu={actionMenu(item)}
                                    />
                                ))) : (
                                <tr>
                                    <td colSpan={7}>Tidak ada data relaas...</td>
                                </tr>
                            )
                            : <tr>
                                <td colSpan={7}>Sedang mengambil data...</td>
                            </tr>
                        }
                    </tbody>
                </table>
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
                    {relaas.jenisPanggilan.name === "Panggilan Sidang" &&
                        <>
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
                        </>
                    }
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

            <Modal isOpen={isOpenPengiriman} onClose={closePengiriman}>
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl font-medium mb-4">Pengiriman Relaas</h2>
                </div>
                <div className="mt-2">
                    <div className="mt-1">
                        <label className="text-xs font-medium text-slate-600">
                            Nomor Resi
                        </label>
                        <input
                            placeholder="Masukkan Nomor Resi Pengiriman"
                            className="form-input"
                            value={relaas.nomorKirim}
                            onChange={({ target }) =>
                                handleValueChange("nomorKirim", target.value)
                            }
                            type="text"
                        />
                    </div>
                    <div className='mt-1'>
                        <JsFileUploader
                            file={fileResiUrl}
                            setFile={setFileResiUrl}
                        />
                        <p className="text-xs font-light">
                            Dokumen Relaas dan Resi Pengiriman :
                            {relaas.fileResi
                                ? <a className="font-bold" href={relaas.fileResi}>UNDUH DOKUMEN</a>
                                : "-"}
                        </p>
                    </div>
                    {error && <p className="text-xs font-medium text-red-500">{error}</p>}
                    <div className="flex items-center justify-end gap-1.5 p-3">
                        <button
                            onClick={closePengiriman}
                            className="mt-4 bg-red-300 px-4 py-2 rounded"
                            disabled={loading}
                        >
                            Kembali
                        </button>
                        <button
                            onClick={handleSubmitPengiriman}
                            className="mt-4 bg-green-300 px-4 py-2 rounded"
                            disabled={loading}
                        >
                            {!loading ? "Simpan" : (
                                <PulseLoader size={9} />
                            )}
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isOpenPelaksanaan} onClose={closePelaksanaan}>
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl font-medium mb-4">Pelaksanaan Relaas</h2>
                </div>
                <div className="mt-2">
                    <div className="mt-1">
                        <label className="text-xs font-medium text-slate-600">
                            Tanggal Pelaksanaan Relaas
                        </label>
                        <input
                            placeholder="Tanggal Pelaksanaan Relaas"
                            className="form-input"
                            value={relaas.tglPelaksanaan}
                            onChange={({ target }) =>
                                handleValueChange("tglPelaksanaan", target.value)
                            }
                            type="date"
                        />
                    </div>
                    <div className="mt-1">
                        <label className="text-xs font-medium text-slate-600">
                            Pilih Hasil Pelaksanaan Relaas
                        </label>
                        <SelectDropDown
                            options={HASIL_PANGGILAN}
                            value={relaas.hasilPanggilan}
                            onChange={(value) => handleValueChange("hasilPanggilan", value)}
                            placeholder="Pilih Hasil Pelaksanaan Relaas"
                        />
                    </div>
                    <div className="mt-1">
                        <label className="text-xs font-medium text-slate-600">
                            Keterangan
                        </label>
                        <textarea
                            placeholder="Isi keterangan pelaksanaan relaas disini"
                            className="form-input"
                            value={relaas.desc}
                            onChange={({ target }) =>
                                handleValueChange("desc", target.value)
                            }
                            type="text"
                        />
                    </div>
                    <div className='mt-1'>
                        <JsFileUploader
                            file={fileTrackingUrl}
                            setFile={setFileTrackingUrl}
                        />
                        <p className="text-xs font-light">
                            Dokumen Pelaksanaan Relaas :
                            {relaas.fileTracking
                                ? <a className="font-bold" href={relaas.fileTracking}>UNDUH DOKUMEN</a>
                                : "-"}
                        </p>
                    </div>
                    {error && <p className="text-xs font-medium text-red-500">{error}</p>}
                    <div className="flex items-center justify-end gap-1.5 p-3">
                        <button
                            onClick={closePelaksanaan}
                            className="mt-4 bg-amber-300 px-4 py-2 rounded"
                            disabled={loading}
                        >
                            Kembali
                        </button>
                        <button
                            onClick={() => handleBatalPengiriman(relaas)}
                            className="mt-4 bg-red-300 px-4 py-2 rounded"
                            disabled={loading}
                        >
                            {!loading ? "Batal Pengiriman Relaas" : (
                                <PulseLoader size={9} />
                            )}
                        </button>
                        <button
                            onClick={handleSubmitPelaksanaan}
                            className="mt-4 bg-green-300 px-4 py-2 rounded"
                            disabled={loading}
                        >
                            {!loading ? "Simpan" : (
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
