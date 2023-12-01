import { Link, useLocation, useNavigate } from "react-router-dom";
import add from "../../assets/icon/add.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import bulletIcon from '../../assets/icon/patient.svg'
import "./DaftarPasien.css";
import { DaftarObat } from "../DaftarObat/DaftarObat";

export const DaftarPasien = () => {
  const PasienData = [
    {
      id: "314",
      fullname: "Rizal Nugraha",
      gender: "Laki-Laki",
      tgl_lahir: "17 Oktober 2003",
      gol_darah: "A",
      berat_badan: "59 Kg",
      tinggi_badan: "155 cm",
    },
    {
        id: "313",
        fullname: "Faisal Rahman",
        gender: "Perempuan",
        tgl_lahir: "11 Agustus 2000",
        gol_darah: "B",
        berat_badan: "70 Kg",
        tinggi_badan: "162 cm",
      },
      {
        id: "312",
        fullname: "Namira Zaitun",
        gender: "Perempuan",
        tgl_lahir: "17 September 2000",
        gol_darah: "B",
        berat_badan: "79 Kg",
        tinggi_badan: "160 cm",
      },
      {
        id: "311",
        fullname: "Desi Indah",
        gender: "Laki-Laki",
        tgl_lahir: "15 Desember 1999",
        gol_darah: "B",
        berat_badan: "60 Kg",
        tinggi_badan: "159 cm",
      },
      {
        id: "310",
        fullname: "Khaterina Lubis",
        gender: "Perempuan",
        tgl_lahir: "1 Januari 2001",
        gol_darah: "O",
        berat_badan: "50 Kg",
        tinggi_badan: "155 cm",
      },
  
  ];


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
    <div className="main-container" style={{ display: 'flex' }}>
      <div className="DaftarPasien border border-2 rounded "
      style={{ marginLeft: "7.5p", marginRight: "20px", paddingLeft: 43 }}>
         
        <div className="ListPasien">
        <div
          className="title"
          style={{ marginLeft: "40px", marginTop: "30px" }}
        >
          <div className="daftar-pasien d-flex justify-content-between align-items-center">
            <h5 className="daftar-pasien fw-semibold fs-2" style={{ marginLeft: "-55px" }}>Daftar Pasien</h5>
            <Link className="view-all3 fw-semibold ">Lihat Semua</Link>
          </div>
        </div>

        <div className="tabel-pasien table-responsive" style={{ marginRight: "38px", marginLeft: "-13px" }}>
          <table className="tabel-daftar-pasien table table-striped" style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nama Lengkap</th>
                <th scope="col">Gender</th>
                <th scope="col">Tgl Lahir</th>
                <th scope="col">Gol.Darah</th>
                <th scope="col">Berat Badan</th>
                <th scope="col">Tinggi Badan</th>
              </tr>
            </thead>
       
            <tbody>
              {PasienData.map((pasien) => (
                <tr
                  key={pasien.id}
                  onClick={() => handleRowClick(pasien.fullname)}
                >
                  <td>{pasien.id}</td>
                  <td>{pasien.fullname}</td>
                  <td>{pasien.gender}</td>
                  <td>{pasien.tgl_lahir}</td>
                  <td>{pasien.gol_darah}</td>
                  <td>{pasien.berat_badan}</td>
                  <td>{pasien.tinggi_badan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      
    <div className="additional-content">
        < DaftarObat />
    </div>
      
    </div>
  );
};
