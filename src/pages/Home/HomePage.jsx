import { Link } from "react-router-dom";
import "./HomePage.css";
import { DaftarPasien } from "../../components/DaftarPasien/DaftarPasien";
// import { DokterData } from "../Doctor/DokterData";
// import { DoctorPage } from "../Doctor/DoctorPage";

// Arrow function
export const HomePage = () => {
  return (
    <div className="homepage">
    < DaftarPasien />
    {/* < DoctorPage /> */}
    {/* < DokterData /> */}
    </div>
    
  );
};
