import moment from "moment";
import React from "react";

const JurusitaTable = ({ tableData }) => {
    const getActiveBadgeColor = (active) => {
        switch (active) {
            case "Active":
                return "bg-green-100 text-green-500 border-green-200";
            case "Inactive":
                return "bg-gray-100 text-gray-500 border-gray-200";
            default:
                return "bg-gray-100 text-gray-500 border-gray-200";
        }
    };

    return (
        <div className="overflow-x-auto p-0 rounded-lg mt-3">
            <table className="min-w-full">
                <thead>
                    <tr className="text-left">
                        <th className="py-3 px-4 text-gray-800 font-medium text-[13px]"></th>
                        <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">Nama</th>
                        <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">NIP</th>
                        <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">Status Pengguna</th>
                        <th className="py-3 px-4 text-gray-800 font-medium text-[13px] hidden md:table-cell">Created On</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item) => (
                        <tr key={item._id} className="border-t border-gray-200">
                            <td className="my-3 mx-4 text-gray-700 text-[13px] line-clamp-1 overflow-hidden">
                                    <img
                                        src={item.profileImage}
                                        alt="Profile Image"
                                        className='w-10 h-10 bg-slate-400 rounded'
                                    />
                            </td>
                            <td className="my-3 mx-4 text-gray-700 text-[13px] overflow-hidden">
                                    {item.name}
                            </td>
                            <td className="my-3 mx-4 text-gray-700 text-[13px] overflow-hidden">{item.email}</td>
                            <td className="my-3 mx-4 text-gray-700 text-[13px] overflow-hidden">
                                {item.iActive ? "Aktif" : "Tidak Aktif"}
                            </td>
                            {/* <td className="py-4 px-4">
                                <span className={`px-2 py-1 text-xs rounded inline-block ${getActiveBadgeColor(item.active)}`}>{item.active}</span>
                            </td> */}
                            {/* <td className="py-4 px-4">
                                <span className={`px-2 py-1 text-xs rounded inline-block ${getPriorityBadgeColor(item.priority)}`}>{item.priority}</span>
                            </td> */}
                            <td className="py-4 px-4 text-gray-700 text-[13px] text-nowrap hidden md:table-cell">{item.createdAt ? moment(item.createdAt).format('Do MMM YYYY') : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default JurusitaTable;
