import '../Patient.css'
import { DoctorTable } from '../components/DoctorTable';
import { DrugTable } from '../components/DrugTable';

export const PatientTransaction = () => {
  return (
    <>
      <div className=' overflow-y-scroll' style={{ maxHeight: 'calc(100vh - 10rem)'}}>
        <div className='d-flex flex-column gap-3 mb-5'>
        <DoctorTable />
        <DrugTable />
        </div>
      </div>
    </>
  )
}


