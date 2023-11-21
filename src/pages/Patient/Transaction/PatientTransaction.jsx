import { useState } from 'react';
import searchIconGrey from '../../../assets/icon/search-grey.svg'
import { Input } from '../../../components/ui/Form/Input';
import '../Patient.css'
import {
  doctorTransaction,
  drugTransaction,
  theadDoctor,
  theadPatient
} from '../../../utils/dataObject';
import { Select } from '../../../components/ui/Form/Select';

export const PatientTransaction = () => {
  const [state, setState] = useState({
    doctorTransactions: doctorTransaction,
    drugTransactions: drugTransaction,
    searchDoctors: '',
    searchDrugs: '',
    statusDoctor: '',
    statusDrugs: '',
  });

  const hanldeInput = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const status = [
    { label: 'Pending', value: 'Pending' },
    { label: 'Sukses', value: 'Sukses' },
    { label: 'Tolak', value: 'Tolak' }
  ];
  const filterDoctor = state.doctorTransactions.filter((item) => item.id.includes(state.searchDoctors))
  const filterDrug = state.drugTransactions.filter((item) => item.id.includes(state.searchDrugs))

  return (
    <>
      <TablePatients
        title={'Transaksi Konsultasi Dokter'}
        thead={theadDoctor}
        name={'searchDoctors'}
        handleChange={hanldeInput}
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
              <ImageModal />
            </td>
            <td>
              <Select
                options={status}
                name={'statusDoctor'}
                handleChange={(e) => hanldeInput(e)}
                value={state.statusDoctor ?? data.status}
              />
            </td>
          </tr>
        ))}
      </TablePatients>
      <TablePatients
        title={'Transaksi Pembelian Obat'}
        thead={theadPatient}
        name={'searchDrugs'}
        handleChange={hanldeInput}
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

const ImageModal = () => {
  return (
    <>
      <button
        type="button"
        className=" bg-transparent border-0 text-decoration-underline"
        style={{ color: '#1766D6' }}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Link
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-transparent border-0">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <img src={'https://images.unsplash.com/photo-1700469880511-3ef0cee47985?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} className=' img-fluid' />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}