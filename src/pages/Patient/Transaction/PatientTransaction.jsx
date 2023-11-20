import searchIconGrey from '../../../assets/icon/search-grey.svg'
import { Input } from '../../../components/ui/Form/Input';
import '../Patient.css'

export const PatientTransaction = () => {
  const yourDataArray = [
    {
      id: '123',
      idPatient: '403',
      payment: 'BCA Virtual Account',
      total: 209000,
      date: '17 Oktober 2002',
      image: 'https://images.google.com/',
      status: 'Pending',
    },
  ];
  const thead = ["ID", "ID Pasien", "Metode Pembayaran", "Total Harga", "Tgl Lahir", "Gambar", "Status Pembayaran"];
  return (
    <>
      <div className="table-responsive rounded-4 border-1 border border-secondary p-4">
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-4">
          <h6 className="fw-semibold fs-2 m-0">Transaksi Pembelian Obat</h6>
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
        <div className=" table-responsive table-wrapper">
          <table className="table table-light">
            <thead>
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
              {yourDataArray.map((data, index) => (
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
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
