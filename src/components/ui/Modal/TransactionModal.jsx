import { useState } from "react";
import { formatDateWithTime } from "../../../utils/helpers";

import { Button } from "../Button";
import { Transparent } from "../Container";
import { ImageModal } from "../../../pages/Patient/components/ImageModal";
import './Modal.css'

export const TransactionModal = ({ data, close }) => {
  const [modalImg, setModalImg] = useState(false);
  const date = formatDateWithTime(data?.created_at);
  const thead = ["ID Obat", "Jumlah", "Harga per Item", "Total Harga"];
  return (
    <>
      {modalImg &&
        <ImageModal
          closeModal={() => setModalImg(false)}
          source={data?.payment_confirmation} />
      }
      <Transparent
        onClick={close}
        className="min-vw-100"
      >
        <div id="modalTransactionMedicine" className="wrapper-transaction-modal px-4 px-md-0">
          <section
            className="transaction-modal bg-light">
            <div className="d-flex flex-row justify-content-between align-items-center bg-white-200 p-3 rounded-top-3">
              <div className="d-flex flex-column gap-1">
                <h5 className="fs-2 fw-semibold">Transaksi Obat</h5>
                <p className="text-secondary">{`Tanggal : ${date}`}</p>
              </div>

              <div className="d-flex flex-column gap-2">
                <BadgeStatus status={data?.payment_status} />
                <p>{`ID Transaksi : ${data?.id}`}</p>
              </div>
            </div>

            <div className="p-3 d-flex flex-column gap-3">
              <section>
                <h5 className="fs-2 fw-semibold">Pelanggan</h5>
                <div className="row text-capitalize">
                  <div className="col-6 d-flex flex-column gap-2">
                    <p>{`ID Pelanggan : ${data?.medicine_transaction?.user_id}`}</p>
                    <p>{`Nama : ${data?.medicine_transaction?.name}`}</p>
                    <p>{`Alamat : ${data?.medicine_transaction?.address}`}</p>
                    <p>{`No Handphone : ${data?.medicine_transaction?.hp}`}</p>
                  </div>
                  <div className="col-6 d-flex flex-column gap-2">
                    <p>{`Metode Pembayaran : ${data?.medicine_transaction?.payment_method}`}</p>
                    <div className=" d-inline-flex">
                      <p>{`Bukti Pembayaran :  `}</p>
                      <Button
                        className={'p-0 ms-1 text-primary fw-semibold'}
                        onClick={() => setModalImg(true)}>Link</Button>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h5 className="fs-2 fw-semibold">Detail Pembelian</h5>
                <div className=" table-responsive table-wrapper" style={{ maxHeight: 'calc(100vh - 44rem)' }}>
                  <table className="table table-borderless table-striped" >
                    <thead className=' sticky-top z-0'>
                      <tr>
                        {thead?.map((item, index) => (
                          <th
                            key={index}
                            className={`fw-semibold text-nowrap ${index > 1 && 'text-end'}`}
                            scope="col">
                            {item}
                          </th>
                        ))
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {data?.medicine_transaction?.medicine_details?.map((item, index) => {
                        const itemPrice = item?.total_price_medicine / item?.quantity;
                        return (
                          <tr key={index}>
                            <td>{item?.medicine_id}</td>
                            <td>{item?.quantity}</td>
                            <td className="text-end">{`Rp. ${itemPrice.toLocaleString('id-ID')}`}</td>
                            <td className="text-end">{`Rp ${item?.total_price_medicine.toLocaleString('id-ID')}`}</td>
                          </tr>
                        )
                      })
                      }
                    </tbody>
                  </table>

                </div>
                  <div className="d-flex align-items-center justify-content-end">
                    <h5 className="fs-3 m-0 fw-semibold">TOTAL PEMBAYARAN :</h5>
                    <p className="fs-3 ms-1 m-0 text-secondary fw-semibold">{`Rp. ${data?.medicine_transaction?.total_price.toLocaleString('id-ID')}`}</p>
                  </div>
              </section>
            </div>
            
            <Button className={'btn-outline-primary fw-semibold border-2 ms-3 mb-3'}>
              Unduh Detail Transaksi
            </Button>
          </section>
        </div>
      </Transparent>
    </>
  )
}

const BadgeStatus = ({ status }) => {
  if (status === 'pending') {
    return (
      <div className="rounded-5 px-2 text-center bg-warning-subtle">
        <p className=" text-center text-warning">Tertunda</p>
      </div>
    )
  }
  if (status === 'cancelled') {
    return (
      <div
        style={{ background: '#fddcd2' }}
        className="rounded-5 px-2 text-center">
        <p className=" text-danger fw-semibold">Ditolak</p>
      </div>
    )
  }

  return (
    <div style={{ background: '#d0fad0' }} className="rounded-5 px-2 text-center">
      <p className=" text-primary fw-semibold">Diterima</p>
    </div>
  )

}
