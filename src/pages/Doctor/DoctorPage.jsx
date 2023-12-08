import { Link, useLocation, useNavigate } from "react-router-dom"
import add from '../../assets/icon/add.svg'
import { useEffect, useState } from "react";
import axios from "axios";
import client from "../../utils/auth";

export const DoctorPage = () => {

  const location = useLocation();
  const newFormData = location.state ?.newFormData 
  const navigate = useNavigate();
  
  const handleRowClick = (doctor) => {
    // navigate(`/doctors/detail-doctor/${fullname}`, { state: { data: yourDataArray }});
    navigate(`/doctors/detail-doctor/${doctor.id}`, { state: { data: doctor }});
  };

  return (
    <div className="DoctorPage border border-2 rounded" style={{marginLeft:'30px', marginRight:'20px'}}>
      <div className="ListDoctor">
          <div className="title" style={{ marginLeft: '40px', marginTop: '30px' }}>
            <h6 className="fw-semibold fs-2">Daftar Dokter</h6>
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
            <table className="table table-striped" style={{ marginTop: '20px' }}>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Jenis Kelamin</th>
                  <th scope="col">Email</th>
                  <th scope="col">Specialis</th>
                  <th scope="col">Pengalaman</th>
                  <th scope="col">No STR</th>
                </tr>
              </thead>
              {/* <tbody>
              {newFormData && (
                <tr onClick={() => handleRowClick(newFormData.fullname)}>
                  <td>{index + 1}</td>
                  <td>{newFormData.profile_picture}</td>
                  <td>{newFormData.fullname}</td>
                  <td>{newFormData.gender}</td>
                  <td>{newFormData.email}</td>
                  <td>{newFormData.specialist}</td>
                  <td>{newFormData.experience}</td>
                  <td>{newFormData.no_str}</td> 
                  </tr>
                )}

                

                {yourDataArray.map((item) => (
                  <tr key={item.id} onClick={() => handleRowClick(item.fullname)}>
                    <td>{item.fullname}</td>
                    <td>{item.gender}</td>
                    <td>{item.specialist}</td>
                  </tr>
                ))}

              </tbody> */}

              <tbody>
                {data.map((doctor) => (
                  <tr key={doctor.id} onClick={() => handleRowClick(doctor)}>
                    <td>{doctor.id}</td>
                    <td>{doctor.fullname}</td>
                    <td>{doctor.gender}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.specialist}</td>
                    <td>{doctor.experience}</td>
                    <td>{doctor.no_str}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}
