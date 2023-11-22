import { Link } from 'react-router-dom'
import back from '../../assets/icon/arrow-right.svg' 
import Photo from '../../assets/icon/Photo.svg'
import deleteIcon from '../../assets/icon/modal-delete.svg'

export const DetailDoctor = () => {
    return(
        <div className='detailDoctor'>
            <div className='d-flex align-items-center' style={{marginLeft:'20px'}}>
            <a href="#" className="nav-link p-0 text-body-secondary">
                <img src= {back} alt="Bootstrap" width={30} height={30}  className="img-fluid" />
            </a>
            <div style={{ marginLeft: '15px', marginTop: '10px', color: 'black'}}>
                <h6 className='fw-bold fs-2'>Detail Doctor</h6>
            </div>
            </div>

            <div class="d-flex ">
                <div className="photo" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Upload Photo Profile" style={{marginLeft:'70px', marginTop:'30px'}}>
                    <img src={Photo} class="rounded float-start" alt="example place" style={{ height: 200, widht: 150 }}/>
                </div>

                <div className="table-responsive" style={{marginTop:'25px', marginLeft:'50px', width:'60%'}}>
                    <table className="table">
                    <thead>
                        <tr>
                        <th className='fw-semibold'>Nama </th>
                        <th className='fw-normal' >Dr.Joshua Kristin</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold fs-3' >Jenis Kelamin</th>
                        <th className='fw-normal' scope="col">Pria</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold fs-3' >Email</th>
                        <th className='fw-normal' scope="col">Joshuacrstn@gmail.com</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold fs-3' >Password</th>
                        <th className='fw-normal' scope="col">-</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold' >Tanggal Lahir</th>
                        <th className='fw-normal' scope="col">17 Oktober 1970</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold' >No. Telephone</th>
                        <th className='fw-normal' scope="col">0821 8849 099</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold' >Spesialis</th>
                        <th className='fw-normal' scope="col">Poli Gigi</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold' >Pengalaman</th>
                        <th className='fw-normal' scope="col">10 Tahun</th>
                        </tr>
                    </thead>
                    </table>
                </div>
            </div>
            <div className=" d-flex justify-content-center col-12" style={{marginTop: '20px'}}>
                <Link to={"/doctors/edit-doctor"} className="btn btn-dark" style={{marginRight: '10px'}}>Edit</Link>
                {/* <button type="button" class="btn btn-secondary">Delete</button> */}

                <button
                    type="button"
                    className="btn btn-primary text-white d-flex btn"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                >
                    Delete
                </button>
            </div>

  
            {/* Modal */}
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-sm" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header border-bottom-0 ">
                        <img src= {deleteIcon} alt="Bootstrap" width={76} height={76} className="mx-auto d-block"/>
                    </div>
                    <div className="modal-body py-0 text-center">
                        <h5>Hapus Dokter ?</h5>
                        <p>Apabila anda menghapus Dokter, maka data Dokter akan hilang</p>
                    </div>
                    <div className="modal-footer d-flex justify-content-center col-12 border-top-0">
                        <button type="button" className="btn btn-lg btn-primary rounded-20">
                        Ya
                        </button>
                        <button
                        type="button"
                        className="btn btn-lg btn-secondary"
                        data-bs-dismiss="modal"
                        >
                        Tidak
                        </button>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}