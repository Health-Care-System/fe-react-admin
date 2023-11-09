import notifIcon from '../../assets/icon/notif.svg';
import styles from './Navbar.module.css'
import { useLocation } from 'react-router-dom';
import { navbarTitle } from '../../utils/dataObject';
import { Avatar } from '../Avatar';

export const Navbar = () => {
  // Buat render title dan content secara dinamis berdasarkan rute
  const location = useLocation(); 
  const currentRoute = location.pathname;
  const currentNavItem = navbarTitle.find((item) => item.route === currentRoute);

  return (
    <header className={styles.navbar}>
      <nav className='d-flex w-100 justify-content-between align-items-center'>
        <div>
          <h5 className='fw-bold m-0'>
            {
              currentNavItem
                ? currentNavItem.title
                : null
            }
          </h5>
        </div>
        <div className='d-flex gap-2 align-items-center'>
          {
            location.pathname === '/' &&
            <input type='text' className='form-control shadow border-0 py-3 px-4 rounded-4' style={{ width: '539px' }} placeholder='Search' />
          }

          <div className='d-flex align-items-center pe-3 pe-md-0 gap-2'>
            <img src={notifIcon} className={styles.iconSize} alt='Notification' />
            <Avatar />
          </div>
        </div>

      </nav>
    </header>
  )
}
