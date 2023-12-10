import { Link, useLocation, useNavigate } from "react-router-dom";
import add from "../../assets/icon/add.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import bulletIcon from '../../assets/icon/patient.svg'
import "./DaftarObat.css";

export const DaftarObat = () => {
  const DataObat = [
    {
      fullname: "Paracetamol",
      stok_obat: "354",
    },
    {
      fullname: "Amoksisilin",
      stok_obat: "323",
    },
    {
      fullname: "Ibuprofen",
      stok_obat: "344",
    },
    {
      fullname: "Metformin",
      stok_obat: "233",
    },
    {
      fullname: "",
      stok_obat: "",
    },
    {
      fullname: "",
      stok_obat: "",
    },
    {
      fullname: "",
      stok_obat: "",
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
    <div className="main-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="DaftarObat border border-2 rounded "
      style={{ marginLeft: "40px", marginRight: "20px" }}>
        <div className="List-Obat">
        <div
          className="title"
          style={{ marginLeft: "40px", marginTop: "30px" }}
        >
          <div className="daftar-obat d-flex justify-content-between align-items-center">
          <h5 className="daftar-obat fw-semibold fs-2" style={{ marginRight: "106px", marginLeft: "-21px"}}>Daftar Obat</h5>
          <Link className="view-all fw-semibold ">Lihat Semua</Link>
            </div>
        </div>

        <div className="tabel-daftar-obat table-responsive" style={{ marginLeft: "20px", marginRight: "17px" }}>
          <table className="tabel-daftar-obat table table-striped" style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th scope="col">Nama Obat</th>
                <th scope="col">Stok Obat</th>
              </tr>
            </thead>
       
            <tbody>
              {DataObat.map((obat) => (
                <tr
                  key={obat.id}
                  onClick={() => handleRowClick(obat.fullname)}
                >
                  <td>{obat.fullname}</td>
                  <td>{obat.stok_obat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      
    <div className="additional-content">
        
    </div>
      
    </div>
  );
};
