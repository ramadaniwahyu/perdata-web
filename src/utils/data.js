import { LuClipboardCheck, LuLayoutDashboard, LuLogOut, LuUserPen, LuUsersRound } from "react-icons/lu";

export const SIDE_MENU_DATA =[
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
        path: '/perkara'
    },
    {
        id: '03',
        label: 'Jurusita',
        icon: LuUserPen,
        path: '/jurusita'
    },
    {
        id: '04',
        label: 'Pengguna',
        icon: LuUsersRound,
        path: '/pengguna'
    },
    {
        id: '05',
        label: 'Keluar',
        icon: LuLogOut,
        path: 'logout'
    },
]