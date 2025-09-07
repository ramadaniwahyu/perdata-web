import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axiosInstance from '../../../utils/axiosInstance';
import { API_PATHS } from '../../../utils/apiPath';

const PrintRelaas = (tglRelaas) => {
    const location = useLocation();
    const { data, tglPos } = location.state;
    const [relaas, setRelaas] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(tglPos)
        const search = `?tglKirim=${tglPos}`
        async function fetchData() {
            const response = await axiosInstance.get(API_PATHS.RELAAS.ALL_SEARCH(search))
            setRelaas(
                response.data.panggilan.length > 0
                    ? response.data.panggilan
                    : []
            );
            console.log(response)
        }
        fetchData();
        console.log(data)
    }, [tglPos])

    if (loading) return null;

    return (
        <div className='w-full'>
            <div className='text-center font-bold text-4xl'>Pengiriman Surat Tercatat</div>
            <table className='w-full border border-gray-500 mt-5'>
                <thead>
                    <tr className='border border-gray-500'>
                        <th className='border border-gray-500'>No</th>
                        <th className='border border-gray-500'>Perihal</th>
                        <th className='border border-gray-500'>Nama / Alamat</th>
                        <th className='border border-gray-500'>Jurusita</th>
                    </tr>
                </thead>
                <tbody>
                    {relaas.length > 0 ?
                        relaas.map((item, index) => (
                            <tr key={item._id} className='border border-gray-500'>
                                <td className='px-4 py-0.5 text-center border border-gray-500'>{index+1}</td>
                                <td className='px-4 py-0.5 text-center border border-gray-500'>{item.jenisPanggilan.name}</td>
                                <td className='px-4 py-0.5 border border-gray-500'>
                                    <b>{item.pihak}</b>&nbsp;({item.nomorPerkara})<br />
                                    {item.alamat}
                                </td>
                                <td className='px-4 py-0.5 text-center border border-gray-500'>{item.jurusita.name}</td>
                            </tr>
                        )) : (
                            <tr key={0}>
                                <td colSpan={4}>Tidak ada  data</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <table className="nocss">
                <tbody>
                    <tr>
                        <td className="nocss">
                            &nbsp;<br /><br /><br />&nbsp;
                        </td>
                        <td className="nocss">
                            &nbsp;<br /><br /><br />&nbsp;
                        </td>
                        <td className="nocss">
                            &nbsp;<br /><br /><br />&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td className="nocss">Tanggal Pengambilan Surat: <br />{moment(tglPos).format("DD-MM-YYYY")}</td>
                        <td className="nocss">&nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;&nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;&nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp;</td>
                        <td className="nocss">Kediri, {moment(tglPos).format("DD-MM-YYYY")}</td>
                    </tr>
                    <tr>
                        <td className="nocss">
                            <br /><br /><br /><br /><br />
                            <strong><u>Petugas Pos</u></strong>
                        </td>
                        <td className="nocss"></td>
                        <td className="nocss">
                            <br /><br /><br /><br /><br />
                            <strong><u>Kasir</u></strong>
                        </td>
                    </tr>
                    <tr>
                        <td className="nocss">
                            &nbsp;<br /><br />&nbsp;
                        </td>
                        <td className="nocss">
                            &nbsp;<br /><br />&nbsp;
                        </td>
                        <td className="nocss">
                            &nbsp;<br /><br />&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td className="nocss">
                            Tanggal Pembayaran: <br />
                            Rp. <br /><br /><br /><br />
                            <strong><u>Petugas Pos</u></strong>
                        </td>
                        <td className="nocss"></td>
                        <td className="nocss"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PrintRelaas