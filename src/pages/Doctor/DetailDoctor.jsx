import { Link, useLocation, useNavigate } from 'react-router-dom'
import back from '../../assets/icon/arrow-right.svg' 
import Photo from '../../assets/icon/Photo.svg'
import deleteIcon from '../../assets/icon/DeleteIconMerah.svg'
import { Button } from '../../components/ui/Button'
import client from '../../utils/auth'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const DetailDoctor = () => {
    const navigate = useNavigate();
    // const data = location.state ? location.state.data : null;
    const { state } = useLocation();
    const { data } = state || {};


    
    const handleEditClick = (e) => {
        navigate('/doctors/edit-doctor', { state: { editform: data }});
    };


    const handleDelete = async () => {
        try {
          const res = await client.delete(`/admins/doctor/${data.id}`);
          console.log("masuk ga?")
          if (res?.status === 200) {
            navigate('/doctors')
            // toast.success('Anda berhasil menghapus pasien!', {
            //   delay: 800
            // });
          } else {
            throw new Error('Gagal menghapus data pasien!');
          }
        } catch (error) {
        //   toast.error(error.message, {
        //     delay: 800
        //   });
        } finally {
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
                        <img src={Photo} className="rounded" alt="example place" style={{ height: '270px', width: '220px' }} />
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

                        <tr>
                        <th className='fw-semibold fs-3' >Biaya</th>
                        <th className='fw-normal' scope="col">{data.email}</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold' >Spesialis</th>
                        <th className='fw-normal' scope="col">{data.specialist}</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold' >Pengalaman</th>
                        <th className='fw-normal' scope="col">{data.experience}</th>
                        </tr>
                        

                        <tr>
                        <th className='fw-semibold' >Alumnus</th>
                        <th className='fw-normal' scope="col">{data.alumnus}</th>
                        </tr>

                        <tr>
                        <th className='fw-semibold' >No.STR</th>
                        <th className='fw-normal' scope="col">{data.no_str}</th>
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
                <Button className="btn btn-primary text-white mx-2"  onClick={() => {handleEditClick() }}>Edit</Button> 
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

                        <Button type="button" className="btn btn-outline-success" onClick={(e) => {handleDelete(e) }}>
                        Ya
                        </Button>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}