import React, { useEffect, useState } from 'react'
import { LuFilePen } from 'react-icons/lu';

const JurusitaCard = (data, onButtonClick) => {

    const [jabatan, setJabatan] = useState(null)

    const jabatanJurusita = () => {
        if (data.data.jabatan === "Jurusita") {
            setJabatan("Jurusita")
        } else {
            setJabatan("Jurusita Pengganti")
        }
    };

    const getJabatanColor = () => {
        switch (jabatan) {
            case "Jurusita":
                return "text-lime-500 bg-lime-50 border border-lime-500/20";
            case "Jurusita Pengganti":
                return "text-yellow-500 bg-yellow-50 border border-yellow-500/20";
            default:
                return "text-yellow-500 bg-yellow-50 border border-yellow-500/20";
        }
    };

    useEffect(() => {
        jabatanJurusita();
    }, [])

    return (
        <div onClick={onButtonClick}
            className='bg-blue-100 rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200/50 cursor-pointer'
        >
            <div className='flex justify-end items-center gap-3 px-4 border-b-0'>
                <div
                    className={`text-[11px] font-medium ${getJabatanColor()} px-4 py-0.5 rounded`}
                >
                    {jabatan}
                </div>

            </div>
            <div className={`px-3 border-l-[3px] ${jabatan === "Jurusita"
                ? "border-lime-500"
                : "border-yellow-500"
                }`}>
                <div className='px-3'>
                    <div className='flex items-center justify-start my-1'>
                        <div className='relative'>
                            <img
                                src={data.data.jsImage ? data.data.jsImage : "https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png"}
                                alt="Jurusita Image"
                                className='w-30 h-30 bg-slate-400 rounded-4xl'
                            />
                        </div>
                        <div className='mx-4'>
                            <p className='text-sm font-medium text-gray-800 mt-4 line-clamp-2'>
                                {data.data.name} <br /> <small>{data.data.nip}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JurusitaCard