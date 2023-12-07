import '../Patient.css'
import { DoctorTable } from '../components/DoctorTable';
import { MedicineTable } from '../components/MedicineTable';

export const PatientTransaction = () => {
  return (
    <>
      <div className='d-flex flex-column gap-3'>
        <DoctorTable />
        <MedicineTable />
      </div>
    </>
  )
}


