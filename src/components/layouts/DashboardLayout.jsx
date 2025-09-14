import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import Navbar from './Navbar'
import SideMenu from './SideMenu'
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from '../../hooks/useUserAuth'

const DashboardLayout = ({ children, activeMenu, breadcrumb }) => {
    useUserAuth()
    const { user } = useContext(UserContext)

    const navigate = useNavigate();

    const handleClick = (route) => {
        navigate(route)
    }
    return (
        <div>
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className='flex'>
                    <div className='max-[1080px]:hidden'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>

                    <div className='grow mx-5'>
                        <div className='w-full m-4'>
                            <nav className="flex" aria-label="Breadcrumb">
                                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                                    {breadcrumb && breadcrumb.map((item) => (
                                        <li key={item.label} className='inline-flex items-center'>
                                            {item.label === "Beranda" ? (
                                                <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                                </svg>
                                            ) : (
                                                <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                                </svg>
                                            )}
                                            <button onClick={() => handleClick(item.link)} className='inline-flex items-center text-sm font-medium text-gray-900 hover:text-blue-700'>
                                                {item.label}
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        </div>
                        <div className='card my-6'>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DashboardLayout