import { TransactionModal } from '../../../components/ui/Modal/TransactionModal';
import '../Patient.css'
import { DoctorTable } from '../components/DoctorTable';
import { DrugTable } from '../components/DrugTable';

export const PatientTransaction = () => {
  return (
    <>
      <div className='d-flex flex-column gap-3'>
        <DoctorTable />
        <DrugTable />
        {/* <TransactionModal /> */}
      </div>
    </>
  )
}


