import React from 'react'
import PageLayout from '../../components/layouts/PageLayout'

const CariEksekusi = () => {
    return (
        <PageLayout>
            <div className="block col-span-6 lg:col-span-4 col-end-7 lg:col-end-5 bg-gray-100 px-5 py-0.5 m-5 rounded-md">
                <h2 className='text-xl md:text-2xl'>Cari Permohonan Eksekusi</h2>
                <p className='text-xs md:text-[13px] text-gray-400 mt-1.5'>
                    Halaman untuk melihat mencari Permohonan Eksekusi
                </p>
            </div>
            <div className='col-span-2 col-end-7 bg-gray-100 px-5 py-0.5 m-5 rounded-md invisible lg:visible'>
                <p>Info Card</p>
            </div>
        </PageLayout>
    )
}

export default CariEksekusi