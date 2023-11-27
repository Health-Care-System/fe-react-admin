import { Link, useLocation, useNavigate } from 'react-router-dom'
import back from '../../assets/icon/arrow-right.svg' 
import Photo from '../../assets/icon/Photo.svg'
import deleteIcon from '../../assets/icon/DeleteIconMerah.svg'
import visibility from '../../assets/icon/visibility.svg'
import { Button } from '../../components/ui/Button'
import { useState } from 'react'
import axios from 'axios'

export const DetailDoctor = () => {
    const navigate = useNavigate();
    // const data = location.state ? location.state.data : null;
    const {state} =  useLocation();
    console.log(state)
    const {data} = state;

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleEditClick = (e) => {
        navigate('/doctors/edit-doctor', { state: { editform: data }});
    };

    const handleDelete = async () => {
        try {
          await axios.delete('URL_API');
          console.log('Data berhasil dihapus:', data);
          navigate('/doctors');
        } catch (error) {
          console.error('Terjadi kesalahan saat menghapus data:', error);
        }
    }

    return(
        <div className='detailDoctor'>
            <div className='d-flex align-items-center' style={{marginLeft:'20px'}}>
                <Link className='nav-link active p-0 text-body-secondary'to={"/doctors"} >
                <img src= {back} alt="Bootstrap" width={30} height={30}  className="img-fluid" />
                </Link>
            {/* <a href="#" className="nav-link p-0 text-body-secondary">
                <img src= {back} alt="Bootstrap" width={30} height={30}  className="img-fluid" />
            </a> */}
            <div style={{ marginLeft: '15px', marginTop: '10px', color: 'black'}}>
                <h6 className='fw-semibold fs-2'>Detail Doctor</h6>
            </div>
            </div>

            <div className="container-fluid">
            {data && (
                <div className="row" style={{marginLeft:'20px'}}>
                    <div className="col-lg-3 col-md-12 d-flex flex-column align-items-center">
                    <div className="photo mt-3" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Upload Photo Profile">
                        <img src={Photo} className="rounded" alt="example place" style={{ height: '270px', width: '220px' }} />
                    </div>
                    </div>

                    <div className="col-lg-9 col-md-12 mt-lg-3 mt-md-0" style={{marginTop:'10px'}}>
                    <div className="table-responsive" style={{marginLeft:'50px', width:'80%'}}>
                    <table className="table">
                    <thead>
                        <tr>
                        <th className='fw-semibold'>Nama </th>
                        <th className='fw-normal' >{data.fullname}</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold fs-3' >Jenis Kelamin</th>
                        <th className='fw-normal' scope="col">{data.gender}</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold fs-3' >Email</th>
                        <th className='fw-normal' scope="col">{data.email}</th>
                        </tr>

                        {/* <tr>
                        <th className='fw-semibold fs-3' >Password</th>
                        <th className='fw-normal' scope="col">{data.password}</th>
                        <span className="input-group-text" onClick={togglePasswordVisibility}>
                            <img src={visibility} alt={showPassword ? 'hide' : 'show'} />
                        </span>
                        </tr> */}

                        <tr>
                        <th className='fw-semibold fs-3' >Password</th>
                        <td className='fw-normal'>
                            {showPassword ? data.password : '********'}
                            {/* <span className="input-group-text" onClick={togglePasswordVisibility}> */}
                            <img src={visibility} alt={showPassword ? 'hide' : 'show'} onClick={togglePasswordVisibility} style={{ marginLeft: '200px' }}/>
                            {/* </span> */}
                        </td>
                        </tr>

                        <tr>
                        <th className='fw-semibold' >Tanggal Lahir</th>
                        <th className='fw-normal' scope="col">{data.tanggalLahir}</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold' >No. Telephone</th>
                        <th className='fw-normal' scope="col">{data.noTelephone}</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold' >Spesialis</th>
                        <th className='fw-normal' scope="col">{data.specialist}</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold' >Pengalaman</th>
                        <th className='fw-normal' scope="col">{data.pengalaman}</th>
                        </tr>
                    </thead>
                    </table>
                </div>
                    </div>
                </div>
            )}
            </div>

            <div className=" d-flex justify-content-center mt-3" style={{marginTop: '20px'}}>
                {/* <Link to={"/doctors/edit-doctor"} className="btn btn-dark" style={{marginRight: '10px'}}>Edit</Link> */}
                <Button className="btn btn-primary text-white mx-2"  onClick={(e) => {handleEditClick(e) }}>Edit</Button> 
                {/* <button type="button" class="btn btn-secondary">Delete</button> */}

                <button
                    type="button"
                    className="btn btn-outline-success d-flex btn"
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
                <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
                <div className="modal-content rounded-4 shadow">
                    <div className="modal-header border-bottom-0 ">
                        <img src= {deleteIcon} alt="Bootstrap" width={76} height={76} className="mx-auto d-block"/>
                    </div>
                    <div className="modal-body py-0 text-center">
                        <h5>Hapus Dokter ?</h5>
                        <p>Apabila anda menghapus Dokter, maka data Dokter akan hilang</p>
                    </div>
                    <div className="modal-footer d-flex justify-content-center col-12 border-top-0">
                        <button
                        type="button"
                        className="btn btn-primary text-white mx-2"
                        data-bs-dismiss="modal"
                        >
                        Tidak
                        </button>

                        <Button type="button" className="btn btn-outline-success" onClick={handleDelete}>
                        Ya
                        </Button>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}