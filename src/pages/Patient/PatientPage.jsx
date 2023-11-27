import { useEffect } from "react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"

export const PatientPage = () => {
  const subMenu = [
    { title: 'Data Transaksi', link: '/patients/transactions' },
    { title: 'Data Pasien', link: '/patients/datas' },
  ]
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === '/patients') navigate('/patients/transactions')
  }, [location.pathname, navigate])


  return (
    <>
      <section className="m-4 d-flex flex-column gap-4">
        <nav className="d-inline-flex gap-5">
          {subMenu?.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.link}
              className="text-decoration-none text-black-50 fs-2 fw-semibold"
            >
              {({ isActive }) => (
                <span className={`${isActive && "text-black pb-2 border-bottom border-2"}`}>{menu.title}</span>
              )}
            </NavLink>
          ))
          }
        </nav>
        <Outlet />
      </section>
    </>
  )
}
