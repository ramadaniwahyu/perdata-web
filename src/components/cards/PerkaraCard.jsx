import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { LuFilePen } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const PerkaraCard = (data, onClick) => {
    const [status, setStatus]= useState(null)

    const navigate = useNavigate();

    const statusPerkara = () => {
        if (data.data.tglMinutasi) {
            setStatus("Minutasi")
        } else if (data.data.tglPutusan) {
            setStatus("Putusan")
        } else {
            setStatus("Persidangan")
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case "Minutasi":
                return "text-lime-500 bg-lime-50 border border-lime-500/20";
            case "Putusan":
                return "text-yellow-500 bg-yellow-50 border border-yellow-500/20";
            default:
                return "text-cyan-500 bg-cyan-50 border border-cyan-500/20";
        }
    };

    const handleClick = (data) => {
        navigate('buat', {
            state: {perkaraId: data._id}
        })
    }

    const viewDetailsClick = (data) => {
        navigate(`lihat`, {
            state: {perkaraId: data._id}
        })
    }

    useEffect(() => {
        statusPerkara();
    }, [])

    return <div 
        className='bg-blue-100 rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200/50 cursor-pointer' 
        >
            <div className='flex items-center gap-3 px-4 border-b-0'>
                <div 
                className={`text-[11px] font-medium ${getStatusColor()} px-4 py-0.5 rounded`}
                >
                    {status}
                </div>
                <div 
                className={`text-[11px] font-medium px-4 py-0.5 rounded`}
                >
                    {data.data.klasifikasi}
                </div>
                <div className='flex items-center justify-end text-[11px] hover:text-primary font-medium px-4 py-0.5' onClick={() => handleClick(data.data)}>
                    <LuFilePen className='text-base'/>{' '}Ubah
                </div>

            </div>
            <div onClick={() => viewDetailsClick(data.data)} className={`px-4 border-l-[3px] ${status === "Minutasi"
                    ? "border-lime-500"
                    : status === "Putusan"
                        ? "border-yellow-500"
                        : "border-cyan-500"
                }`}>
                <p className='text-sm font-medium text-gray-800 hover:text-primary mt-4 line-clamp-2'>
                    {data.data.nomor}/{data.data.kodePerkara}/{data.data.tahun}/{data.data.kodeSatker}
                </p>
                <div className='px-4'>
                    <div className='flex items-center justify-between my-1'>
                        <div>
                            <label className='text-xs text-gray-500'>Tanggal Pendaftaran</label>
                            <p className='text-[13px] font-medium text-gray-900'>
                                {data.data.tglDaftar? moment(data.data.tglDaftar).format("DD-MM-YYYY") : "-"}
                            </p>
                        </div>
                        <div>
                            <label className='text-xs text-gray-500'>Tanggal Putusan</label>
                            <p className='text-[13px] font-medium text-gray-900'>
                                {data.data.tglPutusan ? moment(data.data.tglPutusan).format("DD-MM-YYYY") : "-"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

export default PerkaraCard