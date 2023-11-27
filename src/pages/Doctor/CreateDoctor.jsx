import { Button } from "../../components/ui/Button"
import Photo from '../../assets/icon/Upload-image.svg'
import  Input  from "../../components/ui/Form/Input"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import visibility from '../../assets/icon/visibility.svg'
import axios from "axios"
import client from "../../utils/auth"


export const CreateDoctor = () => {
    const navigate = useNavigate();
    const [form, setForm] =  useState([]);
    const [newform, setNewForm] = useState({
        fullname: '',
        gender: '',
        email: '',
        password: '',
        tanggalLahir: '',
        specialist: '',
        experience: '',
        alumnus: '',
        noTelephone: '',
        no_str: '',
    });

    const [errorMsg, setErrorMsg] = useState({
        fullname: '',
        gender: '',
        email: '',
        password: '',
        tanggalLahir: '',
        specialist: '',
        experience: '',
        alumnus: '',
        noTelephone: '',
        no_str: '',
    })

    // const{
    //     register,
    //     // handleSubmit,
    //     formState: {errors},
    // } = useForm()
    // const onSubmit = (data) => console.log(data)

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleInputChange = (e) => {
        console.log("masuk ga?");
        const { name, value } = e.target;
        setNewForm({
        ...newform,
        [name]: value,
        });

        validateForm(e);
    }

    const validateForm = (e) => {
        const { name, value } = e.target
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if(name === "fullname"){
            if(value === ""){
                setErrorMsg({
                    ...errorMsg,
                    fullname: "Nama Tidak Boleh Kosong"
                })
            }else{
                setErrorMsg({
                    ...errorMsg,
                    fullname: ''
                })
            }
        } else if(name === "gender"){
            if(value === ""){
                setErrorMsg({
                    ...errorMsg,
                    gender: 'Jenis Kelamin harus dipilih'
                })
            }else{
                setErrorMsg({
                    ...errorMsg,
                    gender:''
                })
            }
        } else if(name === "email"){
            if(value === "") {
                setErrorMsg({
                    ...errorMsg,
                    email: 'Email tidak boleh kosong.'
                })
            } else if(!emailRegex.test(value)){
                setErrorMsg({
                    ...errorMsg,
                    email: 'Masukkan email yang valid.'
                })
            }
            else {
                setErrorMsg({
                    ...errorMsg,
                    email: ''
                })
            }
        } else if(name === "password") {
            if(value === "") {
                setErrorMsg({
                    ...errorMsg,
                    password: 'Password tidak boleh kosong.'
                })
            } else if(!passwordRegex.test(value)){
                setErrorMsg({
                    ...errorMsg,
                    password: 'Password harus memiliki setidaknya 8 character, 1 special character, angka, dan huruf.'
                })
            } else {
                setErrorMsg({
                    ...errorMsg,
                    password: ''
                })
            }
        } else if(name === "tanggalLahir"){
            if(value === ""){
                setErrorMsg({
                    ...errorMsg,
                    tanggalLahir: 'Tanggal Lahir harus diisi'
                })
            }else{
                setErrorMsg({
                    ...errorMsg,
                    tanggalLahir: ''
                })
            }
        } else if(name === "specialist"){
            if(value === ""){
                setErrorMsg({
                    ...errorMsg,
                    specialist: 'Specialis harus diisi'
                })
            }else{
                setErrorMsg({
                    ...errorMsg,
                    specialist: ''
                })
            }
        } else if(name === "experience"){
            if(value === ""){
                setErrorMsg({
                    ...errorMsg,
                    experience: 'Pengalaman harus diisi'
                })
            }else{
                setErrorMsg({
                    ...errorMsg,
                    experience: ''
                })
            }
        } else if(name === "alumnus"){
            if(value === ""){
                setErrorMsg({
                    ...errorMsg,
                    alumnus: 'Alumnus harus diisi'
                })
            }else{
                setErrorMsg({
                    ...errorMsg,
                    alumnus: ''
                })
            }
        }else if (name === "noTelephone"){
            if(value === ""){
                setErrorMsg({
                    ...errorMsg,
                    noTelephone: 'No Telephone harus diisi'
                })
            }else{
                setErrorMsg({
                    ...errorMsg,
                    noTelephone: ''
                })
            }
        }else if (name === "no_str"){
            if(value === ""){
                setErrorMsg({
                    ...errorMsg,
                    no_str: 'No STR harus diisi'
                })
            }else{
                setErrorMsg({
                    ...errorMsg,
                    no_str: ''
                })
            }
        }else{

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("masuk ga?");

        const data = new FormData()

        data.append('fullname', newform.fullname)

        validateForm(e);

        if (
            newform.fullname && 
            newform.gender && 
            newform.email && 
            newform.password &&
            newform.tanggalLahir && 
            newform.specialist && 
            newform.experience &&
            newform.alumnus && 
            newform.noTelephone && 
            newform.no_str
        ){
            
        try {
            // Kirim data ke server menggunakan axios.post
            const res = await client.post('/admins/register/doctor', data);
    
            // Tambahkan data yang berhasil disimpan ke state atau lakukan penanganan lainnya
            setForm([...form, res.data]);
    
            // Reset formulir setelah berhasil disimpan
            setNewForm({
                fullname: '',
                gender: '',
                email: '',
                password: '',
                tanggalLahir: '',
                specialist: '',
                experince: '',
                alumnus: '',
                noTelephone: '',
                no_str: '',
            });
    
            // Navigasi ke halaman 'doctors' dengan membawa data baru
            // navigate('/doctors', { state: { newFormData: response.data } });
            navigate('/doctors');
            } catch (error) {
            console.error('Error posting data:', error);
            // Handle error jika terjadi
            }
        }
    }

    return(
        <div className="Create-Doctor">

            <div className="container-fluid">
                <div className="row" style={{marginLeft:'20px'}}>
                    <div className="col-lg-3 col-md-12 d-flex flex-column align-items-center">
                        <img src={Photo} className="rounded" alt="example place" style={{ height: '270px', width: '220px' }} />
                    <div className="btn-group-vertical justify-content-end" role="group" aria-label="Vertical button group">
                        <Button className="btn btn-primary text-white fs-4" type="submit">
                            Unggah Photo
                        </Button>
                        <Button className="btn btn-primary text-white fs-4" type="submit">
                            Hapus Photo
                        </Button>
                    </div>
                    </div>

                    <div className="col-lg-8 col-md-12 mt-lg-3 mt-md-0">
                    <div className="formCreate mt-3">
                        <form onSubmit={handleSubmit} >
                        <div className="col-md-12 mb-3 row ">
                                <label htmlFor="fullname" className="col-2 col-form-label text-end">
                                Nama
                                </label>
                                <div className='col-10'>
                                    <Input
                                    type="text"
                                    name="fullname"
                                    handleChange={(e) => handleInputChange(e)}
                                    value={newform.fullname}
                                    placeHolder={"Masukkan nama"}
                                    className="form-control"
                                    />
                                    <p className="error" style={{ color: 'red' }}>{errorMsg.fullname}</p>
                                </div>
                            </div>

                            <div className="col-md-12 mb-3 row">
                                <label htmlFor="Email" className="col-2 col-form-label text-end">
                                Email
                                </label>
                                <div className='col-10'>
                                    <Input
                                    type="text"
                                    placeHolder={'Masukkan Email'}
                                    className="form-control"
                                    name="email"
                                    value={newform.email}
                                    handleChange={(e) => handleInputChange(e)}
                                    />
                                    <p className="error" style={{ color: 'red' }}>{errorMsg.email}</p>
                                </div>
                            </div>
                    
                            {/* <div className="col-md-12 mb-3 row">
                                <label htmlFor="password" className="col-2 col-form-label text-end">
                                Password
                                </label>
                                <div className='col-10 input-group'>
                                    <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeHolder={'Masukkan Password'}
                                    className="form-control"
                                    name="password"
                                    value={newform.password}
                                    style={{ width: '100px' }}
                                    handleChange={(e) => handleInputChange(e)}
                                    />
                                    <div className="input-group-text" onClick={togglePasswordVisibility}>
                                        <img src={visibility} alt={showPassword ? 'hide' : 'show'} />
                                    </div>
                                    <p className="error" style={{ color: 'red' }}>{errorMsg.password}</p>
                                </div>
                            </div> */}

                            <div className="col-md-12 mb-3 row">
                            <label htmlFor="password" className="col-2 col-form-label text-end">
                                Password
                            </label>
                            <div className='col-10 input-group'>
                                <Input
                                type={showPassword ? 'text' : 'password'}
                                placeHolder={'Masukkan Password'}
                                className="form-control w-50"
                                name="password"
                                value={newform.password}
                                handleChange={(e) => handleInputChange(e)}
                                />
                                <span className="input-group-text" onClick={togglePasswordVisibility}>
                                <img src={visibility} alt={showPassword ? 'hide' : 'show'} />
                                </span>
                                <p className="error" style={{ color: 'red' }}>{errorMsg.password}</p>
                            </div>
                            </div>
                    
                            <div className="col-md-12 mb-3 row">
                                <label htmlFor="gender" className="col-2 col-form-label text-end">
                                Jenis Kelamin
                                </label>
                                <div className='col-10'>
                                <div className="form-check form-check-inline">
                                    <Input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    value="Laki-Laki"
                                    checked={newform.gender === "Laki-Laki"}
                                    handleChange={(e) => handleInputChange(e)}
                                    />
                                    <label className="form-check-label" htmlFor="inlineRadio1">
                                    Laki-Laki
                                    </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <Input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    value="Perempuan"
                                    checked={newform.gender === "Perempuan"}
                                    handleChange={(e) => handleInputChange(e)}
                                    />
                                    <label className="form-check-label" htmlFor="inlineRadio2">
                                    Perempuan
                                    </label>
                                </div>
                                <p className="error" style={{ color: 'red' }}>{errorMsg.gender}</p>
                                </div>
                            </div>
                    
                            <div className="col-md-12 mb-3 row">
                                <label htmlFor="tanggalLahir" className="col-2 col-form-label text-end">
                                Tanggal Lahir
                                </label>
                                <div className='col-10'>
                                    <Input
                                    type="date"
                                    placeHolder=''
                                    className="form-control"
                                    name="tanggalLahir"
                                    value={newform.tanggalLahir}
                                    handleChange={(e) => handleInputChange(e)}
                                    />
                                    <p className="error" style={{ color: 'red' }}>{errorMsg.tanggalLahir}</p>
                                </div>
                            </div>
                    
                            {/* <div className="col-md-12 mb-3 row">
                                <label htmlFor="specialis" className="col-2 col-form-label text-end">
                                Spesialis
                                </label>
                                <div className='col-10'>
                                    <Input
                                    type="text"
                                    placeHolder={'Spesialis'}
                                    className="form-control"
                                    name="specialist"
                                    value={newform.specialist}
                                    handleChange={(e) => handleInputChange(e)}
                                    />
                                    <p className="error" style={{ color: 'red' }}>{errorMsg.specialist}</p>
                                </div>
                            </div> */}

                            <div className="col-md-12 mb-3 row">
                                <label htmlFor="specialis" className="col-2 col-form-label text-end">
                                Spesialis
                                </label>
                                <div className='col-10'>
                                    <select
                                    name="specialist"
                                    onChange={(e) => handleInputChange(e)}
                                    value={newform.specialist}
                                    className="form-select"
                                    aria-label="Default select example"
                                    >
                                        <option selected="">Choose</option>
                                        <option value ="Dokter Umum">Dokter Umum</option>
                                        <option value ="Anak">Spesialis Anak</option>
                                        <option value ="Kulit">Spesialis Kulit</option>
                                        <option value ="Gigi">Spesialis Gigi</option>
                                        <option value ="Psikolog Klinis">Psikolog Klinis</option>
                                    </select>
                                    <p className="error" style={{ color: 'red' }}>{errorMsg.specialist}</p>
                                </div>
                            </div>

                            <div className="col-md-12 mb-3 row">
                                <label htmlFor="experience" className="col-2 col-form-label text-end">
                                Pengalaman
                                </label>
                                <div className='col-10'>
                                    <Input
                                    type="text"
                                    placeHolder={'Tahun Pengalaman Praktik'}
                                    className="form-control"
                                    name="experience"
                                    value={newform.experience}
                                    handleChange={(e) => handleInputChange(e)}
                                    />
                                    <p className="error" style={{ color: 'red' }}>{errorMsg.experience}</p>
                                </div>
                            </div>

                            <div className="col-md-12 mb-3 row">
                                <label htmlFor="alumnus" className="col-2 col-form-label text-end">
                                Alumnus
                                </label>
                                <div className='col-10'>
                                    <Input
                                    type="text"
                                    placeHolder={'Riwayat Pendidikan'}
                                    className="form-control"
                                    name="alumnus"
                                    value={newform.alumnus}
                                    handleChange={(e) => handleInputChange(e)}
                                    />
                                    <p className="error" style={{ color: 'red' }}>{errorMsg.alumnus}</p>
                                </div>
                            </div>

                            <div className="col-md-12 mb-3 row">
                                <label htmlFor="noTelephone" className="col-2 col-form-label text-end">
                                No Telephone
                                </label>
                                <div className='col-10'>
                                    <Input
                                    type="text"
                                    placeHolder={'No Telephone'}
                                    className="form-control"
                                    name="noTelephone"
                                    value={newform.noTelephone}
                                    handleChange={(e) => handleInputChange(e)}
                                    />
                                    <p className="error" style={{ color: 'red' }}>{errorMsg.noTelephone}</p>
                                </div>
                            </div>

                            <div className="col-md-12 mb-3 row">
                                <label htmlFor="no_str" className="col-2 col-form-label text-end">
                                Nomor STR
                                </label>
                                <div className='col-10'>
                                    <Input
                                    type="text"
                                    placeHolder={'No STR'}
                                    className="form-control"
                                    name="no_str"
                                    value={newform.no_str}
                                    handleChange={(e) => handleInputChange(e)}
                                    />
                                    <p className="error" style={{ color: 'red' }}>{errorMsg.no_str}</p>
                                </div>
                            </div>

                        <div className="d-flex justify-content-center mt-3">
                            <Button className="btn btn-outline-success mx-2" type="button" onClick={() => { }}>
                            Batal
                            </Button>
                            <Button className="btn btn-primary text-white mx-2" type="submit">
                            Simpan
                            </Button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>

            {/* <div className="row d-flex justify-content-center align-content-between flex-wrap">
            </div> */}
        </div>
    )
}