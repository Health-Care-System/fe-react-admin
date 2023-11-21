import searchIconGrey from '../../../assets/icon/search-grey.svg'
import { Input } from '../../../components/ui/Form/Input';
import { doctorTransaction, patientTransaction, theadDoctor, theadPatient } from '../../../utils/dataObject';
import '../Patient.css'

export const PatientTransaction = () => {

  return (
    <>
      <TablePatients
        title={'Transaksi Konsultasi Dokter'}
        thead={theadDoctor}
      >
        {doctorTransaction.map((data, index) => (
          <tr className=" text-nowrap" key={index}>
            <td>{data.id}</td>
            <td>{data.idPatient}</td>
            <td>{data.idDoctor}</td>
            <td>{data.payment}</td>
            <td>{data.total}</td>
            <td>{data.date}</td>
            <td>{data.image}</td>
            <td>{data.status}</td>
          </tr>
        ))}
      </TablePatients>
      <TablePatients
        title={'Transaksi Pembelian Obat'}
        thead={theadPatient}>
        {patientTransaction.map((data, index) => (
          <tr className=" text-nowrap" key={index}>
            <td>{data.id}</td>
            <td>{data.idPatient}</td>
            <td>{data.payment}</td>
            <td>{data.total}</td>
            <td>{data.date}</td>
            <td>{data.image}</td>
            <td>{data.status}</td>
          </tr>
        ))}
      </TablePatients>
    </>
  )
}

const TablePatients = ({ title, thead, children }) => {
  return (
    <>
      <div className="table-responsive rounded-4 border-1 border p-4">
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-4">
          <h6 className="fw-semibold fs-2 m-0">{title}</h6>
          <div className="position-relative mt-3 mt-md-0">
            <Input
              name={'searchUserInput'}
              placeHolder={'Cari ID Tranksaksi'}
              className={'rounded-5 ps-5 border-0 bg-white py-2'}
            />
            <img
              src={searchIconGrey}
              className="position-absolute searchIcon"
              alt="Search"
            />
          </div>
        </div>
        <div className=" table-responsive table-wrapper" style={{maxHeight: '22.625rem'}}>
          <table className="table table-light border-bottom" >
            <thead className=' sticky-top'>
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
            <tbody>
              {children}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
