import { Link } from 'react-router-dom'


export const PatientPage = () => {

  return (
    // Itu aku baru ngeh di UInya jadi kita bisa milih mau delete dari detail data atau dari halaman patientpage ya? ato gimana, soalnya di UInya ada yang ada tombol pilihnya ada yang ngga
    // atau aku yang salah tangkep?
    <div className="Container">

        <div className="chart d-flex justify-content-center align-content-between flex-wrap" style={{ margin: "0 auto", width: "99%", marginBottom: "50px" }}>
          <div className="card" style={{width: "20rem", marginRight: "1%", marginLeft: "1%", marginTop: 15, backgroundColor:'#EBEBEB' }} >
            <div className="card-body" >
              <h3 align="center" className="fw-bold">
                  784
              </h3>
            </div>
            <div className="footer" style={{ textAlign: "center" }}>
              Chart
            </div>
          </div>

          <div className="card" style={{width: "20rem", marginRight: "1%", marginLeft: "1%", marginTop: 15,backgroundColor:'#EBEBEB' }} >
            <div className="card-body">
              <h3 align="center" className="fw-bold">
                470
              </h3>
            </div>
            <div className="fw-bold" style={{ textAlign: "center", color:'#565556' }}>
              Pasien Pria
            </div>
          </div>

          <div className="card" style={{width: "20rem", marginRight: "1%", marginLeft: "1%", marginTop: 15, backgroundColor:'#EBEBEB' }} >
            <div className="card-body">
              <h3 align="center" className="fw-bold">
                314
              </h3>
            </div>
            <div className="fw-bold" style={{ textAlign: "center", color:'#565556' }}>
              Pasien Wanita
            </div>
          </div>
        </div>

        <div className="List">
        <div className="title" style={{marginLeft:'30px'}}>
          <h6 className='fw-bold' >
            Daftar Pasien
          </h6>
        </div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end" style={{marginRight:'20px'}}>
          <Link to={"/patients/create-patient"} className="btn btn-outline-info">Tambah Pasien</Link>
        </div>

        <div className='table-responsive'>
        <table className="table" style={{marginTop:'20px'}}>
          <thead>
            <tr>
              <th scope="col">Nama</th>
              <th scope="col">Jenis Kelamin</th>
              <th scope="col">Umur</th>
              <th scope="col">Dokter</th>
              <th scope="col">Tgl Konsultasi</th>
              <th scope="col">Diagnosa</th>
              <th scope="col">Status Tindakan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        </div>


        </div>

    </div>

    
  )
}
