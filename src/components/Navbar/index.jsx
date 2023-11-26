import notifIcon from '../../assets/icon/notif.svg';
import styles from './Navbar.module.css'
import { useLocation } from 'react-router-dom';
import { navbarTitle } from '../../utils/dataObject';
import { Avatar } from '../Avatar';

export const Navbar = () => {
  // Buat render title dan content secara dinamis berdasarkan rute
  const location = useLocation();
  const currentRoute = location.pathname.split('/')[1];
  const currentNavItem = navbarTitle.find((item) => item.route === currentRoute);

  return (
    <header className={styles.navbar}>
      <nav className='d-flex w-100 justify-content-between align-items-center py-4 py-md-0'>
        <div>
          <h5 className='fw-semibold m-0'>
            {
              currentNavItem
                ? currentNavItem.title
                : null
            }
          </h5>
        </div>
        <div className='d-flex gap-2 align-items-center'>
          <div className='d-flex align-items-center pe-3 pe-md-0 gap-3'>
            <img src={notifIcon} className={styles.iconSize} alt='Notification' />
            <div className=' d-none d-lg-block'>
              <Avatar />
            </div>
          </div>
        </div>

      </nav>
    </header>
  )
}
