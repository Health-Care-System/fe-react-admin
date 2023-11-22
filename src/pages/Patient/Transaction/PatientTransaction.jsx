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


export const ImageModal = () => {
  return (
    <>
      <button
        type="button"
        className="bg-transparent border-0 text-primary fw-semibold"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Link
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-transparent border-0">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <img src={'https://images.unsplash.com/photo-1700469880511-3ef0cee47985?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} className=' img-fluid' />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}