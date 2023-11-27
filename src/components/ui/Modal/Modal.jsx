import dangerIcon from '../../../assets/icon/dangerIcon.png';
import { Button } from '../Button';
import './Modal.css'

export const CustomModal = ({ icon, title, content, cancelAction, confirmAction}) => {
  return (
    <>
      <div className="wrapper-modal">
        <div className='card border-0 d-flex flex-column rounded-4 justify-content-center custom-modal'>
          <img 
            src={icon ? icon : dangerIcon} 
            height={76} 
            width={76} 
            className='mx-auto'
            alt="Peringatan" 
          />
          <div className="card-body py-0">
            <h5 className="card-title text-center fs-2 fw-semibold">{title}</h5>
            <p className="card-text text-center">
              {content}
            </p>
            
            <div className='d-flex flex-row justify-content-center w-100 gap-3 mt-3'>
              <Button
                type={'button'}
                onClick={cancelAction}
                className={'btn-primary text-white fw-semibold w-50 text-nowrap'}
              >
                Tidak
              </Button>
              <Button
                type={'button'}
                onClick={confirmAction}
                className={'btn-outline-primary fw-semibold border-2 rounded-2 w-50'}
              >
                Ya
              </Button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
