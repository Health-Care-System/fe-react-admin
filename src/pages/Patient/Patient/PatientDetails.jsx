import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { useGetAllDoctorTransaction, useGetAllDrugTransaction } from "../../../services/patient-services";
import { theadDoctorDetails, theadDrugDetails } from "../../../utils/dataObject";
import { formattedDate } from "../../../utils/helpers";
import { ImageModal } from "../Transaction/PatientTransaction";
import { Column } from "../components/Column";
import { StatusBtn } from "../components/StatusBtn";

export const PatientDetails = () => {
  const title = ['ID', 'Nama Lengkap', 'Email', 'Gender', 'Tanggal Lahir', 'Gol. Darah', 'Berat Badan', 'Tinggi Badan'];
  const values = [123, 'Rizal Nugraha', 'rizal@example.com', 'Male', '2000-01-01', 'O', 70, 175];

  const data = title.map((label, index) => ({
    label,
    value: values[index],
  }));
  return (
    <>
      <section className=" mx-4">
        <table className="row">
          <tbody className="col-12 col-lg-6">
            {data.slice(0, 4).map((item, index) => (
              <tr key={index} className="d-flex">
                <td className="fw-semibold fs-2 title-width">{item.label}</td>
                <td className="w-auto">{item.value}</td>
              </tr>
            ))}
          </tbody>
          <tbody className="col-12 col-lg-6">
            {data.slice(4).map((item, index) => (
              <tr key={index} className=" d-flex">
                <td className=" fw-semibold fs-2 title-width">{item.label}</td>
                <td className="w-auto">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mx-4 mt-5 d-flex flex-column gap-5">
        <TableDoctorDetails />
        <TableDrugDetails />
      </section>
      
      <section className="d-flex justify-content-center gap-3 my-5">
        <Link to={'/patients/data'} className="btn btn-primary text-white w-8 fw-semibold">
          Kembali
        </Link>
        <Button className={'btn-outline-primary w-8 fw-semibold border-2'}>Hapus</Button>
      </section>
    </>
  )
}

const TableDoctorDetails = () => {
  const {
    data,
    refetch,
    isPending,
    isError
  } = useGetAllDoctorTransaction();

  return (
    <>
      <TableDetailsContainer
        thead={theadDoctorDetails}
        title={'Transaksi Konsultasi Dokter'}
      >
        <Column
          isError={isError}
          isPending={isPending}
          refetch={refetch}
          data={data}
          search={''}
          renderItem={(data, index) => {
            const date = formattedDate(data.date);
            const subTotal = data.total.toLocaleString('ID-id');
            return (
              <tr className="text-nowrap" key={index}>
                <td>{data.id}</td>
                <td>{data.idDoctor}</td>
                <td>{data.payment}</td>
                <td>{`Rp ${subTotal}`}</td>
                <td>{date}</td>
                <td>
                  <ImageModal />
                </td>
                <td className="d-flex justify-content-center">
                  <StatusBtn status={data.status} />
                </td>
              </tr>
            )
          }
          }
        />
      </TableDetailsContainer>
    </>
  )
}
const TableDrugDetails = () => {
  const {
    data,
    refetch,
    isPending,
    isError
  } = useGetAllDrugTransaction();

  return (
    <>
      <TableDetailsContainer
        thead={theadDrugDetails}
        title={'Transaksi Pembelian Obat'}
      >
        <Column
          isError={isError}
          isPending={isPending}
          refetch={refetch}
          data={data}
          search={''}
          renderItem={(data, index) => {
            const date = formattedDate(data.date);
            const subTotal = data.total.toLocaleString('ID-id');
            return (
              <tr className="text-nowrap" key={index}>
                <td>{data.id}</td>
                <td>{data.payment}</td>
                <td>{`Rp ${subTotal}`}</td>
                <td>{date}</td>
                <td>
                  <ImageModal />
                </td>
                <td className="d-flex justify-content-center">
                  <StatusBtn status={data.status} />
                </td>
              </tr>
            )
          }
          }
        />
      </TableDetailsContainer>
    </>
  )
}

const TableDetailsContainer = ({ thead, title, children }) => {
  return (
    <>
      <div>
        <h6 className="fw-semibold fs-2 m-0 mb-2">{title}</h6>
        <div className=" table-responsive table-wrapper" style={{ maxHeight: '12rem' }}>
          <table className="table table-borderless table-striped" >
            <thead className=' sticky-top z-0'>
              <tr>
                {thead?.map((item, index) => (
                  <th
                    key={index}
                    className={`fw-semibold text-nowrap ${item === 'Status' && 'text-center'}`}
                    scope="col">
                    {item}
                  </th>
                ))
                }
              </tr>
            </thead>
            <tbody>
              {children}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}