// Packages
import Cookies from 'js-cookie';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// Utils
import { menus } from '../../utils/dataObject';

// Components
import { Transparent } from '../ui/Container';
import { CustomModal } from '../ui/Modal/Modal';

// Assets
import brandLogo from '../../assets/icon/brandLogo.png';
import logoutIcon from '../../assets/icon/logout.svg';
import './Sidebar.css';

export const Sidebar = () => {
  const [modal, setModal] = useState(false)
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove('tokenAdmin');
    navigate('/login');
  }

  return (
    <>
      <aside className='sidebar'>
        {/* Container porfile doctor */}
        <figure className='figure d-flex'>
          <img src={brandLogo} width={'200'} alt='Healthify' />
        </figure>

        {/* Container list navigasi */}
        <ul className='list-group gap-2 mt-3'>
          {menus?.map((item, index) => {
            return (
              <li key={index} className={`list-unstyled`}>
                <NavLink to={item.link} className='text-decoration-none'>
                  {({ isActive }) => (
                    <div className={`${isActive && 'btn-primary text-white'} text-primary d-flex navBtn btn`}>
                      <img
                        src={
                          isActive
                            ? item.icon2
                            : item.icon
                        }
                        width={'24'}
                        alt={item.label}
                      />
                      {item.label}
                    </div>
                  )}
                </NavLink>
              </li>
            )
          })}
        </ul>
        <btn onClick={() => setModal(true)} className='logoutBtn mt-3 text-primary d-flex btn'>
          <p>Logout</p>
          <img src={logoutIcon} alt='Logout' />
        </btn>

        {/* Modal Logout */}
        {modal &&
          <Transparent
            disabled={true}
            className='min-vw-100'
          >
            <CustomModal
              title={'Ingin Keluar?'}
              content={'Apabila anda keluar maka anda tidak dapat menerima informasi terbaru.'}
              confirmAction={handleLogout}
              cancelAction={() => setModal(false)}
            />
          </Transparent>
        }
      </aside>
    </>
  )
}
