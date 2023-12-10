import { PatientData } from "../Patient/Patient/PatientData";
import { DoctorData } from "../Doctor/DoctorPage";

export const HomePage = () => {
  return (
    <div className="d-flex flex-column gap-4 mx-4">
    <PatientData forPage={'homepage'} maxHeight={'45rem'} />
    <DoctorData maxHeight={'45rem'} forPage={'homepage'} />
    </div>
  );
};
