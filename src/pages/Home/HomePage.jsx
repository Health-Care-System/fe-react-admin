import { PatientData } from "../Patient/Patient/PatientData";
import { DoctorData } from "../Doctor/DoctorPage";
import { MedicineTable } from "./MedicineTable";

export const HomePage = () => {
  return (
    <div className="d-flex flex-column gap-4 mx-4">
      <div className="row">
        <div className="col-12 col-xl-8 col-xxl-9 mb-4 mb-xl-0">
          <PatientData forPage={'homepage'} maxHeight={'45rem'} />
        </div>
        <div className="col-12 col-xl-4 col-xxl-3">
          <MedicineTable />
        </div>
      </div>
      <DoctorData maxHeight={'45rem'} forPage={'homepage'} />
    </div>
  );
};
