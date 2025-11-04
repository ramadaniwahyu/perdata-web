import { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../../components/layouts/DashboardLayout";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPath";
import { KLASIFIKASI_PERKARA } from "../../../utils/data";
import { LuFilePlus, LuFileSpreadsheet } from "react-icons/lu";
import PerkaraCard from "../../../components/cards/PerkaraCard";
import PerkaraTabs from "../../../components/tabs/PerkaraTabs";
import Modal from "../../../components/modals/Dialog";
import { useUserAuth } from "../../../hooks/useUserAuth";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import Pagination from "../../../components/layouts/Pagination";

const Perkara = () => {
  useUserAuth();

  const [allPerkara, setAllPerkara] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterKlasifikasi, setFilterKlasifikasi] = useState("Perdata Gugatan");
  const [loading, setLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12)
  const [totalData, setTotalData] = useState(0)

  const [importData, setImportData] = useState([])

  const [isOpenImportFromExcell, setIsOpenImportFromExcell] = useState(false);
  const closeImportFromExcell = () => {
    setImportData([])
    setIsOpenImportFromExcell(false)
  }
  const openImportFromExcell = () => {
    setIsOpenImportFromExcell(true);
  }

  const navigate = useNavigate();

  const getAllPerkara = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(API_PATHS.PERKARA.ALL, {
        params: {
          klasifikasi: filterKlasifikasi === "Perdata Gugatan" ? "Perdata Gugatan" : filterKlasifikasi,
          page: currentPage,
          limit: limit
        },
      });
      console.log(response.data)
      setTotalData(response.data.total)
      // setCurrentPage(response.data.currentPage)
      setAllPerkara(response.data?.perkara?.length > 0 ? response.data?.perkara : []);

      const klasifikasiArray = KLASIFIKASI_PERKARA;
      setTabs(klasifikasiArray);
    } catch (error) {
      console.error("Error memuat data Perkara", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const insertPerkara = async (rowData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(API_PATHS.PERKARA.ALL, {
        ...rowData,
        tglDaftar: new Date(rowData.tglDaftar).toISOString(),
      });

      toast.success(`Perkara nomor ${rowData.nomor}/${rowData.kodePerkara}/${rowData.tahun}/${rowData.kodeSatker} berhasil diinput`);
    } catch (error) {
      toast.error(`Error pembuatan perkara nomor ${rowData.nomor}/${rowData.kodePerkara}/${rowData.tahun}/${rowData.kodeSatker}`);
      console.log(error)
      setLoading(false);
    } finally {
      setLoading(false);
      closeImportFromExcell()
    }
  }

  const handleImportPerkara = () => {
    importData.map((item) => (
      insertPerkara(item)
    ))
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const bufferArray = e.target.result;
        const workbook = XLSX.read(bufferArray, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        setImportData(data);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    getAllPerkara();
    return () => { };
  }, [filterKlasifikasi, currentPage])

  const breadcrumb = [
    { label: "Beranda", link: "/dashboard" },
    { label: "Perkara", link: "/dashboard/perkara" },
  ]

  return (
    <DashboardLayout activeMenu="Perkara" breadcrumb={breadcrumb}>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div className="gap-3">
          <h2 className='text-xl md:text-2xl'>Perkara</h2>
          <p className='text-xs md:text-[13px] text-gray-400 mt-1.5'>
            Halaman untuk melihat Daftar Perkara Perdata.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <PerkaraTabs
            tabs={tabs}
            activeTab={filterKlasifikasi}
            setActiveTab={setFilterKlasifikasi}
          />
        </div>
        <div className="flex item-center justify-end gap-4">
          <button
            className="lg:flex hidden create-btn"
            onClick={() => openImportFromExcell()}
          >
            <LuFileSpreadsheet className="text-lg" /> Import Data
          </button>
          <button
            className="lg:flex hidden create-btn"
            onClick={() => navigate("buat")}
          >
            <LuFilePlus className="text-lg" /> Tambah Perkara
          </button>
        </div>
      </div>
      {/* <Link className='p-5 btn-primary font-medium' to="buat">Tambah Perkara</Link> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {allPerkara.map((item) => (
          <PerkaraCard
            key={item._id}
            data={item}
          />
        ))}
      </div>
      <div>
        <Pagination
          totalItems={totalData}
          itemsPerPage={limit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <Modal isOpen={isOpenImportFromExcell} onClose={closeImportFromExcell}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium mb-4">Impor Data</h2>
          <p className="text-xs font-light">Mengimpor data perkara dari file .xlxs atau .xls</p>
        </div>
        <div className="overflow-y-auto mt-4">
          <div className="mt-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Pilih File untuk diunggah</label>
            <input
              type="file"
              id="file_input"
              className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50
              file:bg-gray-950 file:text-gray-50 hover:file:bg-gray-300 hover:file:text-gray-950
              file:mr-5 file:py-2 file:px-6"
              accept=".xlsx, .xls"
              onChange={handleFileChange} />
            <p className="mt-1 px-4 py-0.5 text-xs font-light"><i>Format file yang bisa diunggah hanya .xlsx dan .xls</i></p>
          </div>
          <div className="mt-1">
            {importData.length > 0 && (
              <table className="text-sm">
                <thead className="border-b-2">
                  <tr>
                    <th className="py-3 px-4">No</th>
                    <th className="py-3 px-4">Tanggal Pendaftaran</th>
                    <th className="py-3 px-4">Nomor Perkara</th>
                    <th className="py-3 px-4">Klasifikasi</th>
                    <th className="py-3 px-4">Jenis Perkara</th>
                  </tr>
                </thead>
                <tbody>
                  {importData.map((row, index) => (
                    <tr key={index} className="border-b-2">
                      <td className="my-3 mx-4 text-center overflow-hidden">{row.no}</td>
                      <td className="my-3 mx-4 text-center overflow-hidden">{row.tglDaftar}</td>
                      <td className="my-3 mx-4 text-center overflow-hidden">{row.nomor}/{row.kodePerkara}/{row.tahun}/{row.kodeSatker}</td>
                      <td className="my-3 mx-4 text-center overflow-hidden">{row.klasifikasi}</td>
                      <td className="my-3 mx-4 text-center overflow-hidden">{row.jenis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-1.5 p-3">
          <button
            onClick={closeImportFromExcell}
            className="mt-4 bg-red-300 px-4 py-2 rounded"
            disabled={loading}
          >
            Kembali
          </button>
          <button
            onClick={() => handleImportPerkara()}
            className="mt-4 bg-green-300 px-4 py-2 rounded"
            disabled={loading}
          >
            {!loading ? "Simpan" : (
              <PulseLoader size={9} />
            )}
          </button>
        </div>
      </Modal>

    </DashboardLayout>
  );
};

export default Perkara;
