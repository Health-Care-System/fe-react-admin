import { Link, Outlet } from "react-router-dom"

export const PatientPage = () => {

  return (
    <>
      <nav>
        <Link to={'/patients/transactions'}>Data Transaksi</Link>
        <Link to={'/patients/datas'}>Data Pasien</Link>
        <Outlet />
      </nav>
    </>
  )
}
