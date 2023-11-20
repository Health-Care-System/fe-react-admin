import { Link } from "react-router-dom"
import add from '../../assets/icon/add.svg'


export const DoctorPage = () => {

  const DataArray = [
    { name: 'Dr.Joshua Kristin', 
      gender: 'Pria',  
      specialis: 'Gigi', 
      jam: '19.00 - 21.00' },

      { name: 'Dr. Adinna Tarisa', 
      gender: 'Wanita', 
      age: '21 Thn', 
      specialis: 'Umum', 
      jam: '19.00 - 21.00' },
  ];
  return (
    <div className="DoctorPage border border-2 rounded" style={{marginLeft:'30px', marginRight:'20px'}}>
      <div className="ListDoctor">
          <div className="title" style={{ marginLeft: '40px', marginTop: '30px' }}>
            <h6 className="fw-bold">Daftar Dokter</h6>
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end" style={{ marginRight: '20px' }}>
          <Link to="/doctors/create-doctor" className="btn-primary text-white d-flex btn">
            <img
                className="img-fluid"
                src={add}
                alt="Button Create"
                style={{ height: 24, widht: 24 }}
                />
              Tambah Dokter
            </Link>
          </div>

          

          <div className="table-responsive" style={{marginLeft: '30px'}}>
            <table className="table" style={{ marginTop: '20px' }}>
              <thead>
                <tr>
                  <th scope="col">Nama</th>
                  <th scope="col">Jenis Kelamin</th>
                  <th scope="col">Specialis</th>
                  <th scope="col">Jam Kerja</th>
                </tr>
              </thead>
              <tbody>
                {DataArray.map((data, index) => (
                  <tr key={index}>
                    <td>{data.name}</td>
                    <td>{data.gender}</td>
                    <td>{data.specialis}</td>
                    <td>{data.jam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}
