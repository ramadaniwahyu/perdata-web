import React, { useState } from 'react'
import PageLayout from '../../components/layouts/PageLayout'
import moment from 'moment';

import { LuBookPlus, LuFilePlus } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const CariEksekusi = () => {
    const now = new Date()
    const [nomor, setNomor] = useState("");
    const [tgl, setTgl] = useState(moment(now).format("YYYY-MM-DD"));

    const navigate = useNavigate();

    const handleGetDate = async (e) => {
        setTgl(e.target.value);
    };
    const handleNomor = (value) => {
        setNomor(value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        console.log("Nomor ", nomor);
        console.log("Tanggal ", tgl)
    }

    return (
        <PageLayout>
            <div className="col-span-6 lg:col-span-4 col-end-7 lg:col-end-5 bg-linear-to-br from-gray-100 to-gray-300 px-5 py-0.5 m-5 rounded-md">
                <div className='flex justify-between mt-5'>
                    <div>
                        <h2 className='text-xl md:text-2xl'>Cari Permohonan Eksekusi</h2>
                        <p className='text-xs md:text-[13px] text-gray-700 mt-1.5'>
                            Halaman untuk melihat mencari Permohonan Eksekusi
                        </p>
                    </div>
                    <div>
                        <button
                            className="lg:flex hidden create-btn"
                            onClick={() => navigate("form")}
                        >
                            <LuBookPlus className="text-lg" /> Input Permohonan Eksekusi
                        </button>
                    </div>
                </div>
                <div className='relative h-150 flex items-center justify-center mt-5'>
                    <form className='absolute inset-0 top-0'>
                        <input
                            placeholder='Masukkan Nomor Register Permohonan Eksekusi'
                            className='w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md m-2 placeholder:text-gray-500'
                            value={nomor}
                            onChange={({ target }) =>
                                handleNomor(target.value)}
                            type='text'
                        />
                        <input
                            placeholder='Masukkan Nomor Register Permohonan Eksekusi yang telah diajukan'
                            className='w-50 text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md m-2 placeholder:text-gray-500'
                            value={tgl}
                            onChange={handleGetDate}
                            type='date'
                        />
                        <button onClick={handleSearch} className='w-sm bg-cyan-500 px-2.5 py-3 rounded-md m-2'>
                            Cari
                        </button>
                    </form>
                </div>
            </div>
            <div className='col-span-2 col-end-7 bg-gray-100 px-5 py-0.5 m-5 rounded-md invisible lg:visible'>
                <p>Info Card</p>
            </div>
        </PageLayout>
    )
}

export default CariEksekusi