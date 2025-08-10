import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPath";
import { KLASIFIKASI_PERKARA } from "../../../utils/data";
import { LuFilePlus } from "react-icons/lu";
import PerkaraCard from "../../../components/cards/PerkaraCard";
import PerkaraTabs from "../../../components/tabs/PerkaraTabs";

const Perkara = () => {
  const [allPerkara, setAllPerkara] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterKlasifikasi, setFilterKlasifikasi] = useState("Perdata Gugatan");
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const getAllPerkara = async () => {
    setLoading(true)
    try {
      // const response = await axiosInstance.get(API_PATHS.PERKARA.ALL)
      const response = await axiosInstance.get(API_PATHS.PERKARA.ALL, {
        params: {
          klasifikasi: filterKlasifikasi === "Perdata Gugatan" ? "Perdata Gugatan" : filterKlasifikasi,
        },
      });
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

  useEffect(() => {
    getAllPerkara();
    return () => {};
  }, [filterKlasifikasi])

  return (
    <DashboardLayout activeMenu="Perkara">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl md:text-xl font-medium">Perkara</h2>
          </div>
          <div className="flex items-center gap-3">
              <PerkaraTabs 
              tabs={tabs}
              activeTab={filterKlasifikasi}
              setActiveTab={setFilterKlasifikasi}
              />
            </div>
            <div className="flex item-center justify-end">
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
      </div>
    </DashboardLayout>
  );
};

export default Perkara;
