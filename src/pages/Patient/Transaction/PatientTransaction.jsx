import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchIconGrey from '../../../assets/icon/search-grey.svg'
import { Input } from '../../../components/ui/Form/Input';
import '../Patient.css'
import {
  doctorTransaction,
  drugTransaction,
  theadDoctor,
  theadPatient
} from '../../../utils/dataObject';

export const PatientTransaction = () => {
  const [state, setState] = useState({
    doctorTransactions: doctorTransaction,
    drugTransactions: drugTransaction,
    searchDoctors: '',
    searchDrugs: ''
  });

  const onSearch = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const filterDoctor = state.doctorTransactions.filter((item) => item.id.includes(state.searchDoctors))
  const filterDrug = state.drugTransactions.filter((item) => item.id.includes(state.searchDrugs))

  return (
    <>
      <TablePatients
        title={'Transaksi Konsultasi Dokter'}
        thead={theadDoctor}
        name={'searchDoctors'}
        handleChange={onSearch}
        inputValue={state.searchDoctors}
      >
        {filterDoctor.map((data, index) => (
          <tr className="text-nowrap" key={index}>
            <td>{data.id}</td>
            <td>{data.idPatient}</td>
            <td>{data.idDoctor}</td>
            <td>{data.payment}</td>
            <td>{`Rp ${data.total.toLocaleString('ID-id')}`}</td>
            <td>{data.date}</td>
            <td>
              <Link style={{ color: '#104EB8' }} to={data.image}>
                Link
              </Link>
            </td>
            <td>{data.status}</td>
          </tr>
        ))}
      </TablePatients>
      <TablePatients
        title={'Transaksi Pembelian Obat'}
        thead={theadPatient}
        name={'searchDrugs'}
        handleChange={onSearch}
        inputValue={state.searchDrugs}
      >
        {filterDrug.map((data, index) => (
          <tr className=" text-nowrap" key={index}>
            <td>{data.id}</td>
            <td>{data.idPatient}</td>
            <td>{data.payment}</td>
            <td>{`Rp ${data.total.toLocaleString('ID-id')}`}</td>
            <td>{data.date}</td>
            <td>{data.image}</td>
            <td>{data.status}</td>
          </tr>
        ))}
      </TablePatients>
    </>
  )
}

const TablePatients = ({
  title,
  name,
  thead,
  children,
  handleChange,
  inputValue
}) => {
  return (
    <>
      <div className="table-responsive rounded-4 border-1 border p-4">
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-4">
          <h6 className="fw-semibold fs-2 m-0">{title}</h6>
          <div className="position-relative mt-3 mt-md-0">
            <Input
              name={name}
              handleChange={(e) => handleChange(e)}
              value={inputValue}
              type={'text'}
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
        <div className=" table-responsive table-wrapper" style={{ maxHeight: '22.625rem' }}>
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
