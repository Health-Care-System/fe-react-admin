import { Button } from "../../../components/ui/Button"

export const StatusBtn = ({ status, handleAction, id }) => {  
  if (status === 'success') {
    return <StatusInfo status={'Diterima'} color={'#d0fad0'} />
  }
  
  if (status === 'cancelled') {
    return <StatusInfo status={'Ditolak'} color={'#fddcd2'} />
  }
  


  return (
    <>
      <div className=" d-inline-flex gap-3">
        <Button 
          onClick={() => handleAction('cancelled', id)}
          className={'btn-outline-primary border-2 fw-semibold'}>Tolak
        </Button>
        <Button 
          onClick={() => handleAction('success', id)}
          className={'btn-primary text-white fw-semibold'}>
          Terima
        </Button>
      </div>
    </>
  )
}

const StatusInfo = ({ status, color}) => {  
  return(
    <div className="px-4 rounded-5" style={{ backgroundColor: color, width: 'fit-content'}}>
      <p className={`fw-semibold ${status === 'Diterima' ? 'text-primary' : 'text-danger'}`}>{status}</p>
    </div>
  )
}