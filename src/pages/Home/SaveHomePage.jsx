import { Link } from "react-router-dom";
import { RecentPatient } from "../../components/RecentPatients";
import { DaftarDokter } from "../../components/DaftarDokter";
import "./HomePage.css";
import { DaftarObat } from "../../components/DaftarObat";
import { StokObat } from "../../components/StokObat";

// Arrow function
export const HomePage = () => {
  return (
    <div className="p-2" style={{ maxWidth: "auto" }}>
      <div className="d-flex justify-content-between align-items-center p-2 border border-2 rounded">
        <h5 className="fw-bold mb-2 mt-3 me-5 mr-6">Recent Patients</h5>
        <Link className="view-all">View All</Link>
        <div className="daftar-obat d-flex justify-content-between align-items-center">
          <h5 className="daftar-obat">Daftar Obat</h5>
          <Link className="view-all3">View All</Link>
        </div>
        {/* <p className="stok-obat fw-600 fs-20px" style={{ fontSize: "20px", fontWeight: "600" }}>
          Stok Obat
        </p>
        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            style={{ backgroundColor: "#CBE4DE73" }}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Daily
          </button>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item" type="button">
                Action
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Another action
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Something else here
              </button>
            </li>
          </ul>
        </div> */}
      </div>
      
      <div className="d-flex justify-content-between ">
        <RecentPatient />
        <DaftarObat />
        {/* <StokObat /> */}
      </div>

      <div className="d-flex justify-content-between align-items-center p-2">
        <h5 className="fw-bold mb-2 mt-3  me-5 mr-6">Daftar Dokter</h5>
        <Link className="view-all2">View All</Link>
        {/* <div className="daftar-obat d-flex justify-content-between align-items-center">
          <h5 className="daftar-obat">Daftar Obat</h5>
          <Link className="view-all3">View All</Link>
        </div> */}
      </div>

      {/* <DaftarDokter /> */}

      <div className="d-md-flex ">
        <DaftarDokter />
        <div className="">
          {/* <DaftarObat /> */}
        </div>
      </div>
    </div>
  );
};
