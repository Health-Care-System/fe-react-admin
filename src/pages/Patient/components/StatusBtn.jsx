import { useState } from "react"
import { Button } from "../../../components/ui/Button"
import { Transparent } from "../../../components/ui/Container";
import { CustomModal } from "../../../components/ui/Modal/Modal";
import infoIcon from '../../../assets/icon/warning-icon.svg'

export const StatusBtn = ({ status, handleAction, id, offset }) => {
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalCancel, setModalCancel] = useState(false);

  if (status === 'success') {
    return <StatusInfo status={'Diterima'} color={'#d0fad0'} />
  }

  if (status === 'cancelled') {
    return <StatusInfo status={'Ditolak'} color={'#fddcd2'} />
  }

  const handleModalConfirm = (e) => {
    e.stopPropagation();
    setModalConfirm(!modalConfirm);
  }
  const handleModalCancel = (e) => {
    e.stopPropagation();
    setModalCancel(!modalCancel);
  }

  return (
    <>
      <div className=" d-inline-flex gap-3" style={{ zIndex: 10 }}>
        <Button
          onClick={(e) => handleModalCancel(e)}
          className={'btn-outline-primary border-2 fw-semibold'}>Tolak
        </Button>
        <Button
          onClick={(e) => handleModalConfirm(e)}
          className={'btn-primary text-white fw-semibold'}>
          Terima
        </Button>
      </div>

      {modalConfirm &&
        <Transparent
          disabled={true}
          className='min-vw-100'
        >
          <CustomModal
            icon={infoIcon}
            title={'Terima Pembayaran?'}
            content={'Apabila anda menerima transaksi pembayaran pasien, maka status akan berubah menjadi Diterima.'}
            confirmAction={(e) => handleAction('success', id, offset, e)}
            cancelAction={(e) => handleModalConfirm(e)}
          />
        </Transparent>
      }
      {modalCancel &&
        <Transparent
          disabled={true}
          className='min-vw-100'
        >
          <CustomModal
            title={'Tolak Pembayaran?'}
            content={'Apabila anda menolak transaksi pembayaran pasien, maka status akan berubah menjadi Ditolak.'}
            confirmAction={(e) => handleAction('cancelled', id, offset, e)}
            cancelAction={(e) => handleModalCancel(e)}
          />
        </Transparent>
      }
    </>
  )
}

const StatusInfo = ({ status, color }) => {
  return (
    <div className="px-4 rounded-5" style={{ backgroundColor: color, width: 'fit-content' }}>
      <p className={`fw-semibold ${status === 'Diterima' ? 'text-primary' : 'text-danger'}`}>{status}</p>
    </div>
  )
}