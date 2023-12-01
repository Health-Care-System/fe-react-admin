import { Link, useLocation, useNavigate } from "react-router-dom";
import add from "../../assets/icon/add.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import bulletIcon from '../../assets/icon/patient.svg'

export const DoctorPage = () => {
  const dokterData = [
    {
      id: "017",
      fullname: "Dr. Dewi Ayu",
      gender: "Wanita",
      email: "dewiayu@gmail.com",
      specialist: "Gigi",
      experience: "8 Tahun",
      no_str: "9911602319118526",
    },
    {
      id: "016",
      fullname: "Dr. Namira Zaitun",
      gender: "Wanita",
      email: "namirazaitun@gmail.com",
      specialist: "Umum",
      experience: "7 Tahun",
      no_str: "9911602319118527",
    },
    {
      id: "015",
      fullname: "Dr. Budi Santoso",
      gender: "Pria",
      email: "budisantoso@gmail.com",
      specialist: "Jantung",
      experience: "11 Tahun",
      no_str: "9911602319118528",
    },
    {
      id: "014",
      fullname: "Dr. Desi Indah",
      gender: "Wanita",
      email: "desiindah@gmail.com",
      specialist: "Mata",
      experience: "9 Tahun",
      no_str: "9911602319118529",
    },
    

  ];

  const location = useLocation();
  const newFormData = location.state ? location.state.newFormData : null;
  const navigate = useNavigate();
  const handleRowClick = (doctor) => {
    navigate(`/doctors/detail-doctor/${doctor.id}`, {
      state: { data: newFormData },
    });
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.example.com/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="DoctorPage border border-2 rounded"
      style={{ marginRight: "21px", marginTop: "40px" }}
    >
      <div className="ListDoctor">
        <div
          className="title"
          style={{ marginLeft: "40px", marginTop: "30px" }}
        >
          <div className="daftar-pasien d-flex justify-content-between align-items-center">
            <h5 className="daftar-pasien fw-semibold fs-1" style={{ marginLeft: "-9px" }}>Daftar Dokter</h5>
            <Link className="view-all3 fw-semibold " style={{ marginRight: "30px"}}>Lihat Semua</Link>
          </div>
        </div>

        <div className="table-responsive" style={{ marginLeft: "30px", marginRight: "40px" }}>
          <table className="table table-striped" style={{ marginTop: "20px" }}>
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
          <tbody>
              {dokterData.map((doctor) => (
                <tr
                  key={doctor.id}
                  onClick={() => handleRowClick(doctor.fullname)}
                >
                  <td>{doctor.id}</td>
                  <td className="d-flex flex-row align-items-center gap-2 text-nowrap">
                    <div className="rounded-circle border border-2 border-dark">
                      <img
                        src={bulletIcon}
                        alt={doctor.fullname}
                        width={34}
                        height={34}
                        className="rounded-circle object-fit-cover"
                      />
                    </div>
                    <p className="m-0">{doctor.fullname}</p>
                  </td>
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
  );
};
