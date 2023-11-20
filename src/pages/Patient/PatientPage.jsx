import { NavLink, Outlet } from "react-router-dom"

export const PatientPage = () => {
  const subMenu = [
    { title: 'Data Transaksi', link: '/patients/transactions' },
    { title: 'Data Pasien', link: '/patients/datas' },
  ]

  return (
    <>
      <nav className="d-inline-flex gap-5 mx-4">
        {subMenu?.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.link}
            className="text-decoration-none text-black-50 fs-2 fw-semibold"
          >
            {({ isActive }) => (
              <span className={`${isActive ? "text-black border-bottom border-2" : ""}`}>{menu.title}</span>
            )}
          </NavLink>
        ))
        }
      </nav>
      <Outlet />
    </>
  )
}
