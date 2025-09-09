import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { Link, useNavigate } from "react-router-dom";

import DashboardLayout from "../../../components/layouts/DashboardLayout";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPath";
import { KLASIFIKASI_PERKARA } from "../../../utils/data";
import { LuFilePlus, LuFileSpreadsheet } from "react-icons/lu";
import PerkaraCard from "../../../components/cards/PerkaraCard";
import PerkaraTabs from "../../../components/tabs/PerkaraTabs";
import Modal from "../../../components/modals/Dialog";

const Perkara = () => {
  const [allPerkara, setAllPerkara] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterKlasifikasi, setFilterKlasifikasi] = useState("Perdata Gugatan");
  const [loading, setLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10)

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
      // const response = await axiosInstance.get(API_PATHS.PERKARA.ALL)
      const response = await axiosInstance.get(API_PATHS.PERKARA.ALL, {
        params: {
          klasifikasi: filterKlasifikasi === "Perdata Gugatan" ? "Perdata Gugatan" : filterKlasifikasi,
          page: currentPage,
          limit: limit
        },
      });
      setAllPerkara(response.data?.perkara?.length > 0 ? response.data?.perkara : []);

      const klasifikasiArray = KLASIFIKASI_PERKARA;
      setTabs(klasifikasiArray);
    } catch (error) {
      console.log(error)
      console.error("Error memuat data Perkara", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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
        console.log(data)
        setImportData(data);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  useEffect(() => {
    getAllPerkara();
    return () => { };
  }, [filterKlasifikasi])

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

      <Modal isOpen={isOpenImportFromExcell} onClose={closeImportFromExcell}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium mb-4">Impor Data</h2>
          <p className="text-xs font-light">Mengimpor data perkara dari file .xlxs atau .xls</p>
        </div>
        <div className="mt-4">
          <div className="mt-1">
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          </div>
          <div className="mt-1">
            {importData.length > 0 && (
              <table className="">
                <thead className="border-b-2">
                  <tr>
                    <th>No</th>
                    <th>Tanggal Pendaftaran</th>
                    <th>Klasifikasi</th>
                    <th>Jenis Perkara</th>
                    <th>Nomor Perkara</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {importData.map((row, index) => (
                    <tr key={index} className="border-b-2">
                      <td>{row.no}</td>
                      <td>{row.tglDaftar}</td>
                      <td>{row.klasifikasi}</td>
                      <td>{row.jenis}</td>
                      <td>{row.nomor}/{row.kodePerkara}/{row.tahun}/{row.kodeSatker}</td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Modal>

    </DashboardLayout>
  );
};

export default Perkara;
