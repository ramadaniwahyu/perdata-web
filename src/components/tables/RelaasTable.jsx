import moment from "moment";
import React, { useEffect, useState } from "react";
import { LuFile } from "react-icons/lu";

const RelaasTable = ({ item, actionMenu }) => {
    const [status, setStatus] = useState(null);

    const statusPelaksanaan = () => {
        if (item.tglPelaksanaan) {
            setStatus("Pelaksanaan");
        } else if (item.nomorKirim) {
            setStatus("Pengiriman");
        } else {
            setStatus("Pembuatan");
        }
    };

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
                return "bg-gray-50";
            case "Pengiriman":
                return "bg-yellow-50";
            default:
                return "bg-cyan-100/50";
        }
    };

    useEffect(() => {
        statusPelaksanaan();
    }, []);

    return (
        <tr key={item._id} className={`${getBgStatusColor()} px-2 border-l-[4px] ${status === "Pelaksanaan"
            ? "border-lime-500"
            : status === "Pengiriman"
                ? "border-yellow-500"
                : "border-cyan-500"
            } border-t-[1px] border-t-gray-300`}>
            <td className="py-3 px-4 text-gray-700 text-[13px] overflow-hidden">
                <img
                    src={item.jurusita.jsImage}
                    alt="Jurusita"
                    title={item.jurusita.name}
                    className="w-8 h-8 bg-slate-400 rounded-full"
                />
            </td>
            <td className="py-3 px-4 text-gray-700 text-[13px] overflow-hidden">
                {moment(item.tglKirim).format("DD-MM-YYYY")}<br />
                {item.nomorKirim &&
                    <a className="flex text-gray-700 hover:text-blue-500 cursor-pointer" href={item.fileResi} target="blank">
                        {item.nomorKirim}&nbsp;<LuFile className="text-base" />
                    </a>
                }
            </td>
            <td className="py-3 px-4 text-gray-700 text-[13px] overflow-hidden">
                <p className="font-medium">
                    {item.nomorPerkara || (
                        <i className="font-light">Belum diisi.</i>
                    )}
                </p>
                <p className="">
                    <b>{item.pihak}</b> <br />
                    {item.alamat}
                </p>
            </td>
            <td className="py-3 px-4 text-gray-700 text-[13px] overflow-hidden">
                <div
                    className={`w-max text-[11px] font-medium ${getStatusColor()} px-2 py-0.5 rounded`}
                >
                    {status}
                </div>
            </td>
            <td className="py-3 px-4 text-gray-700 text-[13px] overflow-hidden">
                <p className="font-medium">
                    {item.jenisPanggilan.name}
                </p>
                {item.jenisPanggilan.name === "Panggilan Sidang"
                    ? (<p className="font-light">Tanggal Sidang: {moment(item.tglSidang).format("DD-MM-YYYY") || "-"}<br />Due Date: {moment(item.dueDate).format("DD-MM-YYYY")}</p>)
                    : ("")
                }
            </td>
            <td className="py-3 px-4 text-gray-700 text-[13px] overflow-hidden">
                {item.hasilPanggilan
                    ? (
                        <>
                            <p className="font-medium">{moment(item.tglPelaksanaan).format("DD-MM-YYYY")}</p>
                            <a className="flex font-light text-gray-700 hover:text-blue-500 cursor-pointer" href={item.fileResi} target="blank">
                                {item.hasilPanggilan}&nbsp;<LuFile className="text-base" />
                            </a>
                            <p className="font-light">
                                {item.desc || "-"}
                            </p>
                        </>
                    ) : (
                        <p className="font-light">Belum dilaksanakan</p>
                    )}
            </td>
            <td className="py-3 px-4 text-gray-700 text-[13px] overflow-hidden">
                {actionMenu}
            </td>
        </tr>
    );
};

export default RelaasTable;
