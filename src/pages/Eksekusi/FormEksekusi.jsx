import React, { useState } from 'react'
import PageLayout from '../../components/layouts/PageLayout'
import uploadFile from '../../utils/uploadFile'
import { JENIS_EKSEKUSI } from '../../utils/data'
import SelectDropDown from '../../components/inputs/SelectDropDown'

const FormEksekusi = () => {
    const [data, setData] = useState({
        tglPermohonan: "",
        jenisEksekusi: "",
        nomor: "",
        desc: "",
        lampiran: []
    })
    const handleValueChange = (key, value) => {
        setData((prevData) => ({ ...prevData, [key]: value }));
    };

    const createPermohonan = async () => { };
    const handleUploadFile = async () => { };

    return (
        <PageLayout>
            <div className="col-span-6 lg:col-span-4 col-end-7 lg:col-end-5 bg-linear-to-br from-gray-100 to-gray-300 px-5 py-0.5 m-5 rounded-md">
                <div className='mt-5'>
                    <h2 className='text-xl md:text-2xl'>Permohonan Eksekusi</h2>
                    <p className='text-xs md:text-[13px] text-gray-400 mt-1.5'>
                        Masukkan data permohonan eksekusi yang anda ajukan
                    </p>
                </div>
                <div className="border-b border-gray-400/50 my-4"></div>
                <div className='text-medium font-bold'>Data Pemohon</div>
                <div className="border-b border-gray-400/50 my-4"></div>
                <div className='text-medium font-bold'>Data Permohonan</div>
                <div className='grid grid-cols-8 gap-4 mt-4'>
                    <div className='col-span-2 md:col-span-2'>
                        <label className='text-xs font-medium text-slate-600'>
                            Tanggal Pendaftaran
                        </label>
                        <input
                            placeholder='Tanggal Pendaftaran Perkara'
                            className='form-input'
                            value={data.tglPermohonan}
                            onChange={({ target }) => handleValueChange("tglPermohonan", target.value)
                            }
                            type='date'
                        />
                    </div>
                    <div className='col-span-10 md:col-span-6'>
                        <label className='text-xs font-medium text-slate-600'>
                            Jenis Permohonan Eksekusi
                        </label>
                        <SelectDropDown
                            options={JENIS_EKSEKUSI}
                            value={data.jenisEksekusi}
                            onChange={(value) => handleValueChange("jenisEksekusi", value)}
                            placeholder="Pilih Jenis Permohonan Eksekusi"
                        />
                    </div>
                </div>
                <div className='mt-3'>
                    <label className='text-xs font-medium text-slate-600'>
                        Nomor Dokumen
                    </label>
                    <input
                        placeholder='Nomor Dokumen'
                        className='form-input'
                        value={data.nomor}
                        onChange={({ target }) => handleValueChange("nomor", target.value)
                        }
                    />
                </div>
                <div className='mt-3'>
                    <label className='text-xs font-medium text-slate-600'>
                        Keterangan
                    </label>
                    <textarea
                        rows={4}
                        placeholder='Keterangan Permohonan Eksekusi'
                        className='form-input'
                        value={data.desc}
                        onChange={({ target }) => handleValueChange("desc", target.value)
                        }
                    />
                </div>
                <div className="border-b border-gray-400/50 my-4"></div>
                <div className='mt-3'>
                    <div className='flex justify-between'>
                        <div className='text-medium font-bold'>Dokumen Elektronik</div>
                        <button className='w-2xs bg-cyan-500 px-2.5 py-3 rounded-md m-2'>
                            Upload Dokumen
                        </button>
                    </div>
                </div>

            </div>
            <div className='col-span-2 col-end-7 bg-gray-100 px-5 py-0.5 m-5 rounded-md invisible lg:visible'>
                <p>Info Card</p>
            </div>
        </PageLayout>
    )
}

export default FormEksekusi