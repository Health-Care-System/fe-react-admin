import { Link } from 'react-router-dom'
import back from '../../assets/icon/arrow-right.svg' 
import Photo from '../../assets/icon/Photo.svg'
import { Button } from '../../components/ui/Button'

export const EditDoctor = () => {
    return(
        <div className="Edit-Doctor">

            <div className='d-flex align-items-center' style={{marginLeft:'20px'}}>
                <a href="#" className="nav-link p-0 text-body-secondary">
                    <img src= {back} alt="Bootstrap" width={30} height={30}  className="img-fluid" />
                </a>
                <div style={{ marginLeft: '15px', marginTop: '10px', color: 'black'}}>
                    <h6 className='fw-bold fs-2'>Edit Doctor</h6>
                </div>
            </div>

            <div class="d-flex ">
                <div className="photo" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Upload Photo Profile" style={{marginLeft:'70px', marginTop:'30px'}}>
                    <img src={Photo} class="rounded float-start" alt="example place" style={{ height: 270, widht: 220 }}/>
                </div>
                
                <div class="col-sm-8" style={{marginLeft:'30px'}}>
                    <div className="formCreate" style={{marginTop: '30px'}}>
                        <form className=" needs-validation" noValidate>
                            <div className="col-md-11 mb-3 row ">
                                <label htmlFor="Nama" className="col-2 col-form-label text-end">
                                Nama
                                </label>
                                <div className='col-10'>
                                    <input
                                    type="text"
                                    placeholder='Masukkan Nama Lengkap Pasien'
                                    className="form-control"
                                    id="nama"
                                    aria-describedby="validationServer03Feedback"
                                    required=""
                                    />
                                </div>
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                Please provide a valid city.
                                </div>
                            </div>
                    
                            <div className="col-md-11 mb-3 row">
                                <label htmlFor="JenisKelamin" className="col-2 col-form-label text-end">
                                Jenis Kelamin
                                </label>
                                <div className='col-10'>
                                <div className="form-check form-check-inline">
                                    <input
                                    className="form-check-input"
                                    type="radio"
                                    name="JenisKelamin"
                                    id="Laki-Laki"
                                    defaultValue="Laki-Laki"
                                    />
                                    <label className="form-check-label" htmlFor="inlineRadio1">
                                    Laki-Laki
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                    className="form-check-input"
                                    type="radio"
                                    name="JenisKelamin"
                                    id="Perempuan"
                                    defaultValue="Perempuan"
                                    />
                                    <label className="form-check-label" htmlFor="inlineRadio2">
                                    Perempuan
                                    </label>
                                </div>
                                </div>
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                Please provide a valid city.
                                </div>
                            </div>
                    
                            
                            <div className="col-md-11 mb-3 row">
                                <label htmlFor="Email" className="col-2 col-form-label text-end">
                                Email
                                </label>
                                <div className='col-10'>
                                    <input
                                    type="text"
                                    placeholder='Masukkan Email'
                                    className="form-control"
                                    id="Email"
                                    aria-describedby="validationServer03Feedback"
                                    required=""
                                    />
                                </div>
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                Please provide a valid city.
                                </div>
                            </div>
                    
                            <div className="col-md-11 mb-3 row">
                                <label htmlFor="password" className="col-2 col-form-label text-end">
                                Password
                                </label>
                                <div className='col-10'>
                                    <input
                                    type="text"
                                    placeholder='Masukkan Password'
                                    className="form-control"
                                    id="password"
                                    aria-describedby="validationServer03Feedback"
                                    required=""
                                    />
                                </div>
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                Please provide a valid city.
                                </div>
                            </div>
                    
                            <div className="col-md-11 mb-3 row">
                                <label htmlFor="tanggalLahir" className="col-2 col-form-label text-end">
                                Tanggal Lahir
                                </label>
                                <div className='col-10'>
                                    <input
                                    type="date"
                                    placeholder=''
                                    className="form-control"
                                    id="tanggalLahir"
                                    aria-describedby="validationServer03Feedback"
                                    required=""
                                    />
                                </div>
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                Please provide a valid city.
                                </div>
                            </div>
                    
                            <div className="col-md-11 mb-3 row">
                                <label htmlFor="noTelephone" className="col-2 col-form-label text-end">
                                No Telephone
                                </label>
                                <div className='col-10 '>
                                    <input
                                    type="text"
                                    placeholder='Masukkan No Telephone'
                                    className="form-control"
                                    id="noTelephone"
                                    aria-describedby="validationServer03Feedback"
                                    required=""
                                    />
                                </div>
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                Please provide a valid city.
                                </div>
                            </div>
                    
                            <div className="col-md-11 mb-3 row">
                                <label htmlFor="spesialis" className="col-2 col-form-label text-end">
                                Spesialis
                                </label>
                                <div className='col-10'>
                                    <input
                                    type="text"
                                    placeholder='Spesialis'
                                    className="form-control"
                                    id="spesialis"
                                    aria-describedby="validationServer03Feedback"
                                    required=""
                                    />
                                </div>
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                Please provide a valid city.
                                </div>
                            </div>

                            <div className="col-md-11 mb-3 row">
                                <label htmlFor="pengalaman" className="col-2 col-form-label text-end">
                                Pengalaman
                                </label>
                                <div className='col-10'>
                                    <input
                                    type="text"
                                    placeholder='Tahun Pengalaman Praktik'
                                    className="form-control"
                                    id="pengalaman"
                                    aria-describedby="validationServer03Feedback"
                                    required=""
                                    />
                                </div>
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                Please provide a valid city.
                                </div>
                            </div>

                            <div className="col-md-11 mb-3 row">
                                <label htmlFor="alumnus" className="col-2 col-form-label text-end">
                                Alumnus
                                </label>
                                <div className='col-10'>
                                    <input
                                    type="text"
                                    placeholder='Riwayat Pendidikan'
                                    className="form-control"
                                    id="alumnus"
                                    aria-describedby="validationServer03Feedback"
                                    required=""
                                    />
                                </div>
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                Please provide a valid city.
                                </div>
                            </div>

                            <div className="col-md-11 mb-3 row">
                                <label htmlFor="noSTR" className="col-2 col-form-label text-end">
                                No STR
                                </label>
                                <div className='col-10'>
                                    <input
                                    type="text"
                                    placeholder='No STR'
                                    className="form-control"
                                    id="noSTR"
                                    aria-describedby="validationServer03Feedback"
                                    required=""
                                    />
                                </div>
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                Please provide a valid city.
                                </div>
                            </div>

                            <div className="col-md-11 mb-3 row">
                                <label htmlFor="jamKerja" className="col-2 col-form-label text-end">
                                Jam Kerja
                                </label>
                                <div className='col-10'>
                                    <input
                                    type="text"
                                    placeholder='Jam Kerja'
                                    className="form-control"
                                    id="jamKerja"
                                    aria-describedby="validationServer03Feedback"
                                    required=""
                                    />
                                </div>
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                Please provide a valid city.
                                </div>
                            </div>

                            <div className="col-md-11 mb-3 row">
                                <label htmlFor="statusAktif" className="col-2 col-form-label text-end">
                                Status Aktif
                                </label>
                                <div className='col-10'>
                                    <input
                                    type="text"
                                    placeholder='Status Aktif'
                                    className="form-control"
                                    id="statusAktif"
                                    aria-describedby="validationServer03Feedback"
                                    required=""
                                    />
                                </div>
                                <div id="validationServer03Feedback" className="invalid-feedback">
                                Please provide a valid city.
                                </div>
                            </div>
                            
                            
                            <div className=" d-flex justify-content-center col-12 ">
                            <Button className="btn btn-secondary mx-2" onClick={() => { }}>Batal</Button> 
                            <Button className="btn-primary text-white d-flex btn" onClick={() => { }} >Simpan</Button> 
                            
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* <div className="row d-flex justify-content-center align-content-between flex-wrap">
            </div> */}
        </div>
    )
}