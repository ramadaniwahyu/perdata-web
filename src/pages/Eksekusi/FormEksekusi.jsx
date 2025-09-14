import React from 'react'
import PageLayout from '../../components/layouts/PageLayout'

const FormEksekusi = () => {
    return (
        <PageLayout>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <h2 className='text-xl md:text-2xl'>Cari Permohonan Eksekusi</h2>
                <p className='text-xs md:text-[13px] text-gray-400 mt-1.5'>
                    Halaman untuk melihat mencari Permohonan Eksekusi
                </p>
            </div>
        </PageLayout>
    )
}

export default FormEksekusi