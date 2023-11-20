import "./DaftarObat.css"

// import { Button } from "../ui/Button";

export const DaftarObat = () => {
    const listObat = [
        {
          nama: 'DULCOLAC SUP',
          stok: '30',
        },
        {
          nama: 'DULCOLAC SUP',
          stok: '20',
        },
        {
          nama: 'DULCOLAC SUP',
          stok: '0',
        },
        {
          nama: 'DULCOLAC SUP',
          stok: '45',
        },
        {
          nama: 'DULCOLAC SUP',
          stok: '67',
        },
        {
          nama: 'DULCOLAC SUP',
          stok: '53',
        },
      ];

    return (
      <>
        <div className="table-obat card shadow border-0">
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th className="table-nama-obat">Nama Obat</th>
                        <th className="table-stok">Stok Obat</th> 
                    </tr>
                </thead>
                <tbody>
                  {listObat.map((obat, index) => (
                    <tr key={index}>
                      <td className="d-flex flex-row align-items-center gap-2 text-nowrap">
                        <p className="m-0">{obat.nama}</p>
                      </td>
                      <td>{obat.stok}</td>

                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
      </>
    )
}