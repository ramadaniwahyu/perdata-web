import moment from 'moment';
import React, { useEffect, useState } from 'react'

const RelaasCard = ({data, footerMenu}) => {
    const [status, setStatus] = useState(null);
    const [relaas, setRelaas] = useState(data)

    const statusPelaksanaan = () => {
        if (data.tglPelaksanaan) {
            setStatus("Pelaksanaan")
        } else if (data.nomorKirim) {
            setStatus("Pengiriman")
        } else {
            setStatus("Pembuatan")
        }
    }

    const getStatusColor = () => {
        switch (status) {
            case "Pelaksanaan":
                return "text-lime-500 bg-lime-50 border border-lime-500/20";
            case "Pengiriman":
                return "text-yellow-500 bg-yellow-50 border border-yellow-500/20";
            default:
                return "text-cyan-500 bg-cyan-50 border border-cyan-500/20";
        }
    };

    const getBgStatusColor = () => {
        switch (status) {
            case "Pelaksanaan":
                return "bg-lime-50";
            case "Pengiriman":
                return "bg-yellow-50";
            default:
                return "bg-cyan-100/50";
        }
    }

    useEffect(() => {
        // console.log({footerMenu})
        statusPelaksanaan();
    }, [])

    return (
        <div className={`${getBgStatusColor()} rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200/50 mt-2`}>
            <div className='flex justify-between items-center gap-3 px-4 border-b-0'>
                <div className={`text-[20px] font-medium px-4 py-0.5 rounded`}>
                    {relaas.jenisPanggilan.name}
                </div>
                <div className={`text-[11px] font-medium ${getStatusColor()} px-4 py-0.5 rounded`}>
                    {status}
                </div>
            </div>
            <div className={`px-4 border-l-[3px] ${status === "Pelaksanaan"
                ? "border-lime-500"
                : status === "Pengiriman"
                    ? "border-yellow-500"
                    : "border-cyan-500"
                }`}>
                <div className='px-4'>
                    <div className='flex items-center justify-between gap-5'>
                        <div className='mt-4'>
                            <p className='text-[13px] font-medium text-gray-900'>
                                {relaas.nomorPerkara || <i className='font-light'>Belum diisi.</i>}
                            </p>
                            <p className='text-[13px] text-gray-900'>
                                <b>{relaas.pihak}</b> <br />
                                {relaas.alamat}
                            </p>
                        </div>
                        {footerMenu}
                    </div>
                    <div className='flex items-center justify-between text-[11px] border-t-2 border-gray-300 mt-2'>
                        <div className=''>
                            Tanggal: {relaas.tglKirim ? moment(relaas.tglKirim).format("DD-MM-YYYY") : <i className='font-light'>Belum diisi.</i>}
                        </div>
                        <div className='flex items-center mt-1'>
                            <img src={relaas.jurusita.jsImage} className='w-5 h-5 rounded-2xl' />
                            <p className='text-[11px]'>&nbsp;{relaas.jurusita.name}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default RelaasCard