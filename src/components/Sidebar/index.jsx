import { NavLink } from 'react-router-dom';
import { menus } from '../../utils/dataObject';
import './Sidebar.css'
import brandLogo from '../../assets/icon/brandLogo.png';
import logoutIcon from '../../assets/icon/logout.svg';
export const Sidebar = () => {

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

        {/* Button Logout  */}
        <btn className='btnWrapper'>
          <div className='logoutBtn d-flex btn'>
            <p>Logout</p>
            <img src={logoutIcon} alt='Logout' />
          </div>
        </btn>

      </aside>
    </>
  )
}
