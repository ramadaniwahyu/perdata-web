import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import Navbar from './Navbar'
import SideMenu from './SideMenu'

const PageLayout = ({children, activeMenu}) => {
  const {user} = useContext(UserContext)
    return (
      <div>
          <Navbar activeMenu={activeMenu}/>
  
          {user&& (
              <div className='flex'>
                  <div className='max-[1080px]:hidden'>
                      <SideMenu activeMenu={activeMenu}/>
                  </div>
  
                  <div className='grow mx-5'>{children}</div>
              </div>
          )}
      </div>
    )
}

export default PageLayout