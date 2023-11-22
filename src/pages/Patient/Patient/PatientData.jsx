import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Form/Input";
import { ColumnSkeleton } from "../../../components/ui/Skeleton/ColumnSkeleton";
import { useGetAllPatients } from "../../../services/patient-services";
import { thead } from "../../../utils/dataObject";
import searchIconGrey from '../../../assets/icon/search-grey.svg'
import '../Patient.css'

export const PatientData = () => {
  return (
    <div className="table-responsive rounded-4 border p-4">
      <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-4">
        <h6 className="fw-semibold fs-2 m-0">Daftar Pasien</h6>
        <div className="position-relative mt-3 mt-md-0">
          <Input
            name={'searchUserInput'}
            placeHolder={'cari...'}
            className={'rounded-5 ps-5 border-0 bg-white py-2'}
          />
          <img
            src={searchIconGrey}
            className="position-absolute searchIcon"
            alt="Search"
          />
        </div>
      </div>
      <div className=" table-responsive table-wrapper" style={{ maxHeight: 'calc(100vh - 19rem)' }}>
        <table className="table border-bottom table-hover">
          <thead className=" sticky-top z-0">
            <tr>
              {thead?.map((item, index) => (
                <th
                  key={index}
                  className="fw-semibold text-nowrap"
                  scope="col">
                  {item}
                </th>
              ))
              }
            </tr>
          </thead>
          <TableBody />
        </table>
      </div>
    </div>
  )
}

const TableBody = () => {
  const navigate = useNavigate();
  const onNavigate = (id) => {
    navigate(`/patients/data/${id}`)
  }
  const {
    data,
    isPending,
    isError,
    refetch
  } = useGetAllPatients();

  if (isError) {
    return (
      <tbody>
        <tr className=" table-borderless">
          <td className="text-center" colSpan={8}>
            <p>Gagal Memuat Data!</p>
            <Button onClick={refetch} className={'btn-primary text-white mt-2'}>Coba lagi</Button>
          </td>
        </tr>
      </tbody>
    )
  }

  if (isPending) {
    return <ColumnSkeleton totalRow={8} />
  }

  return (
    <>
      <tbody>
        {data?.results?.map((data, index) => (
          <tr
            onClick={() => onNavigate(data.id)}
            className="text-nowrap cursor-pointer"
            key={index}
          >
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.gender}</td>
            <td>{data.birthdate}</td>
            <td>{data.blood}</td>
            <td>{data.weight}</td>
            <td>{data.height}</td>
          </tr>
        ))}
      </tbody>
    </>
  )
}
