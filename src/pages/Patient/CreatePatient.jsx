

export const CreatePatient = () => {
    
    return(
        <div className="create" style={{marginTop: '20px'}}>
            <form className=" needs-validation" novalidate>
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
                    <label htmlFor="Umur" className="col-2 col-form-label text-end">
                    Umur
                    </label>
                    <div className='col-10'>
                        <input
                        type="text"
                        placeholder='Masukkan Umur Pasien'
                        className="form-control"
                        id="Umur"
                        aria-describedby="validationServer03Feedback"
                        required=""
                        />
                    </div>
                    <div id="validationServer03Feedback" className="invalid-feedback">
                    Please provide a valid city.
                    </div>
                </div>
        
                <div className="col-md-11 mb-3 row">
                    <label htmlFor="Tanggal" className="col-2 col-form-label text-end">
                    Tanggal Konsultasi
                    </label>
                    <div className='col-10'>
                        <input
                        type="date"
                        placeholder='Tanggal Konsultasi Rutin Pasien'
                        className="form-control"
                        id="Tanggal"
                        aria-describedby="validationServer03Feedback"
                        required=""
                        />
                    </div>
                    <div id="validationServer03Feedback" className="invalid-feedback">
                    Please provide a valid city.
                    </div>
                </div>
        
                <div className="col-md-11 mb-3 row">
                    <label htmlFor="Dokter" className="col-2 col-form-label text-end">
                    Dokter Anda
                    </label>
                    <div className='col-10'>
                        <input
                        type="text"
                        placeholder='Dokter Pasien'
                        className="form-control"
                        id="Dokter"
                        aria-describedby="validationServer03Feedback"
                        required=""
                        />
                    </div>
                    <div id="validationServer03Feedback" className="invalid-feedback">
                    Please provide a valid city.
                    </div>
                </div>
        
                <div className="col-md-11 mb-3 row">
                    <label htmlFor="Diagnosis" className="col-2 col-form-label text-end">
                    Diagnosis
                    </label>
                    <div className='col-10 '>
                        <input
                        type="text"
                        placeholder='Diagnosis Pasien'
                        className="form-control"
                        id="Diagnosis"
                        aria-describedby="validationServer03Feedback"
                        required=""
                        />
                    </div>
                    <div id="validationServer03Feedback" className="invalid-feedback">
                    Please provide a valid city.
                    </div>
                </div>
        
                <div className="col-md-11 mb-3 row">
                    <label htmlFor="Status" className="col-2 col-form-label text-end">
                    Status/Tindakan
                    </label>
                    <div className='col-10'>
                        <input
                        type="text"
                        placeholder='Status Pasien'
                        className="form-control"
                        id="Status"
                        aria-describedby="validationServer03Feedback"
                        required=""
                        />
                    </div>
                    <div id="validationServer03Feedback" className="invalid-feedback">
                    Please provide a valid city.
                    </div>
                </div>
        
                
                <div className="col-md-11 mb-3 row">
                    <label htmlFor="Catatan" className="col-2 col-form-label text-end">
                    Catatan
                    </label>
                    <div className="col-10">
                    <textarea
                    className="form-control"
                    placeholder="Catatan Pasien"
                    id="Catatan"
                    rows={3}
                    defaultValue={""}
                    />
                    </div>
                </div>
                <div className=" d-flex justify-content-center col-12 ">
                <button type="button" class="btn btn-dark" style={{marginRight:'10px'}}>Batal</button>
                <button type="button" class="btn btn-secondary">Simpan</button>
                </div>
            </form>
        </div>
    )
}