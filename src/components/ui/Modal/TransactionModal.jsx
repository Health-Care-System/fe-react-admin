import { Transparent } from "../Container"

export const TransactionModal = ({ data }) => {
  return (
    <Transparent>
      <section className="position-fixed bg-light rounded-3 shadow-sm" style={{ zIndex: 50, maxWidth: '53.375rem', width: '100%' }}>
        <div className="d-flex flex-row justify-content-between align-items-center bg-white-200 p-3 rounded-top-3">
          <div>
            <h6>Transaksi Obat</h6>
            <p>Tanggal 2023-09-16</p>
          </div>

          <div>
            <p>Tertunda</p>
            <p>ID Transaksi</p>
          </div>
        </div>

        <div className="p-3">
          <h6>Pelanggan</h6>
          <div className="row">
            <div className="col-6">
              <p>ID Pelanggan</p>
              <p>Nama</p>
              <p>Alamat</p>
              <p>No Handphone</p>
            </div>
            <div className="col-6">
              <p>Metode Pembayaran</p>
              <p>Bukti Pembayaran</p>
            </div>
          </div>
        </div>
      </section>
    </Transparent>
  )
}
