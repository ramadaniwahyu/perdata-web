import moment from 'moment';
import React, { useEffect, useState } from 'react'

const PerkaraCard = (
    // klasifikasi,
    // jenis,
    // tglDaftar,
    // nomor,
    // kodePerkara,
    // tahun,
    // kodeSatker,
    // tglPutusan,
    // tglMinutasi,
    data,
    onClick
) => {
    const [status, setStatus]= useState(null)

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

    useEffect(() => {
        statusPerkara();
    }, [])

    return (
        <div 
        className='bg-white rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200/50 cursor-pointer' 
        onClick={onClick}
        >
            <div className='flex items-end gap-3 px-4'>
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

            </div>
            <div className={`px-4 border-l-[3px] ${status === "Minutasi"
                    ? "border-lime-500"
                    : status === "Putusan"
                        ? "border-yellow-500"
                        : "border-cyan-500"
                }`}>
                <p className='text-sm font-medium text-gray-800 mt-4 line-clamp-2'>
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
    )
}

export default PerkaraCard