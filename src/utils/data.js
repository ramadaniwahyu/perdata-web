import { LuClipboardCheck, LuLayoutDashboard, LuLogOut, LuUserPen, LuUsersRound } from "react-icons/lu";

export const SIDE_MENU_DATA = [
    {
        id: '01',
        label: 'Dashboard',
        icon: LuLayoutDashboard,
        path: '/dashboard'
    },
    {
        id: '02',
        label: 'Perkara',
        icon: LuClipboardCheck,
        path: '/dashboard/perkara'
    },
    {
        id: '03',
        label: 'Jurusita',
        icon: LuUserPen,
        path: '/dashboard/jurusita'
    },
    {
        id: '04',
        label: 'Pengguna',
        icon: LuUsersRound,
        path: '/dashboard/pengguna'
    },
    {
        id: '05',
        label: 'Keluar',
        icon: LuLogOut,
        path: 'logout'
    },
]

export const dashData = {
    statistics: {
        total: 4,
        pending: 1,
        completed: 2,
        inProgress: 1
    },
    chart: {
        distribution: {
            pending: 1,
            inProgress: 1,
            completed: 2,
            all: 4
        },
        priorityLevel: {
            low: 2,
            medium: 1,
            high: 1,
        },
    },
    recent: [
        {
            _id: "12341",
            title: "Recent Data 1",
            priority: "Low",
            status: "Completed",
            dueDate: "2025-07-01T00:00:00.000Z",
            createdAt: "2025-06-28T00:00:00.000Z"
        },
        {
            _id: "12342",
            title: "Recent Data 2",
            priority: "High",
            status: "Pending",
            dueDate: "2025-07-02T00:00:00.000Z",
            createdAt: "2025-06-29T00:00:00.000Z"
        },
        {
            _id: "12343",
            title: "Recent Data 3",
            priority: "Medium",
            status: "In Progress",
            dueDate: "2025-07-03T00:00:00.000Z",
            createdAt: "2025-06-30T00:00:00.000Z"
        },
        {
            _id: "12344",
            title: "Recent Data 4",
            priority: "Low",
            status: "Completed",
            dueDate: "2025-07-10T00:00:00.000Z",
            createdAt: "2025-06-26T00:00:00.000Z"
        },
    ]

}

export const KODE_PERKARA = [
    { label: "Pdt.G", value: "Pdt.G"},
    { label: "Pdt.Bth", value: "Pdt.Bth"},
    { label: "Pdt.Plw", value: "Pdt.Plw"},
    { label: "Pdt.G.S", value: "Pdt.G.S"},
    { label: "Pdt.P", value: "Pdt.P"},
    { label: "Pdt.Eks", value: "Pdt.Eks"},
    { label: "Pdt.Eks.HT", value: "Pdt.Eks.HT"},
    { label: "Pdt.Eks.Fds", value: "Pdt.Eks.Fds"},
]

export const KLASIFIKASI_PERKARA = [
    {label: "Perdata Gugatan", value: "Perdata Gugatan"},
    {label: "Perdata Gugatan Sederhana", value: "Perdata Gugatan Sederhana"},
    {label: "Perdata Permohonan", value: "Perdata Permohonan"},
    {label: "Perdata Permohonan Eksekusi", value: "Perdata Permohonan Eksekusi"},
]

export const KODE_SATKER = [
    {label: "PN Gpr", value: "PN Gpr"},
]

export const JURUSITA = [
    {label: "Jurusita", value: "Jurusita", kode: "JS"},
    {label: "Jurusita Pengganti", value: "Jurusita Pengganti", kode: "JSP"},
]