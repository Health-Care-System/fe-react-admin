import { Link } from 'react-router-dom'
import back from '../../assets/icon/arrow-right.svg' 

export const DetailPatient = () =>{
    return(
        // Ini mending pake table atau bikin kolom biasa trus tambahin border bottom
        // Biar linenya ga nyampe ujung banget kek mana ya ndo?
        // Trus masih bingung cara nampilin modal di halaman lain, kek mana ya? apa pake redux?
        <div className='Detail'>
            <div className='d-flex align-items-center' style={{marginLeft:'20px'}}>
                <a href="#" className="nav-link p-0 text-body-secondary">
                    <img src= {back} alt="Bootstrap" width={30} height={30}  className="img-fluid" />
                </a>
                <div style={{ marginLeft: '15px', marginTop: '10px', color: 'black'}}>
                    <h6 className='fw-bold fs-2'>Detail Pasien</h6>
                </div>
            </div>

            <div className="table-responsive" style={{marginTop:'25px', marginLeft:'50px'}}>
            <table className="table">
            <thead>
                <tr>
                <th className='fw-bold fs-3 col-4'>Nama Pasien</th>
                <th className='fw-semibold' >Joshua Kristin</th>
                </tr>

                <tr>
                <th className='fw-bold fs-3' >Jenis Kelamin</th>
                <th className='fw-semibold' scope="col">Laki-Laki</th>
                </tr>

                <tr>
                <th className='fw-bold fs-3' >Umur</th>
                <th className='fw-semibold' scope="col">21 Tahun</th>
                </tr>

                <tr>
                <th className='fw-bold fs-3' >Dokter</th>
                <th className='fw-semibold' scope="col">Dr. Djaja Surya</th>
                </tr>

                <tr>
                <th className='fw-bold fs-3' >Tanggal Konsultasi</th>
                <th className='fw-semibold' scope="col">17 Oktober 2022</th>
                </tr>

                <tr>
                <th className='fw-bold fs-3' >Diagnosis</th>
                <th className='fw-semibold' scope="col">Demam</th>
                </tr>

                <tr>
                <th className='fw-bold fs-3' >Status Tindakan</th>
                <th className='fw-semibold' scope="col">Diberi Resep</th>
                </tr>

                <tr>
                <th className='fw-bold fs-3' >Catatan</th>
                <th className='fw-semibold' scope="col">-</th>
                </tr>
            </thead>
            </table>
            </div>

            <div className=" d-flex justify-content-center col-12" style={{marginTop: '20px'}}>
                <Link to={"/patients/edit-patient"} className="btn btn-dark" style={{marginRight: '10px'}}>Edit</Link>
                {/* <button type="button" class="btn btn-secondary">Delete</button> */}

                <Link to={"/patients"} className="btn btn-secondary" data-bs-toggle="modal"  data-bs-target="#staticBackdrop" style={{marginRight: '10px'}}>Delete</Link>
                {/* <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                >
                    Delete
                </button> */}
                {/* Modal */}
                
            </div>


        </div>
    )
}