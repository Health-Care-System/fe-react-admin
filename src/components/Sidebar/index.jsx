import { Link, useLocation } from 'react-router-dom';
import { menus } from '../../utils/dataObject';
import './Sidebar.css'
import brandLogo from '../../assets/icon/brandLogo.png';
import logoutIcon from '../../assets/icon/logout.svg';
export const Sidebar = () => {
  const location = useLocation();

  return (
    <>
      <aside className='sidebar'>
        {/* Container porfile doctor */}
        <figure className='figure d-flex'>
          <img src={brandLogo} width={'231'} alt='Healthify' />
        </figure>

        {/* Container list navigasi */}
        <ul className='list-group gap-2 mt-4'>
          {menus?.map((item, index) => {
            const active = item.link === location.pathname && 'btn-primary text-white';

            return (
              <li key={index} className={`list-unstyled`}>
                <Link to={item.link} className='text-decoration-none'>
                  <div className={`${active} d-flex navBtn btn`}>
                    <img
                      src={
                        item.link === location.pathname
                          ? item.icon2
                          : item.icon
                      }
                      width={'24'}
                      alt={item.label}
                    />
                    {item.label}
                  </div>
                </Link>
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
