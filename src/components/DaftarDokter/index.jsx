import bulletIcon from '../../assets/icon/patient.svg'
import "./DaftarDokter.css"


// import { Button } from "../ui/Button";

export const DaftarDokter = () => {
    const listDokter = [
        {
          name: 'Dr.Joshua Kristin',
          gender: 'Laki-Laki',
          specialist: 'Gigi',
          image: 'path/to/image2.jpg',
        },
        {
          name: 'Dr.Adinda Tarisa',
          gender: 'Perempuan',
          specialist: 'Umum',
          image: 'path/to/image2.jpg',
        },
        {
          name: 'Dr.Namira Zaitun',
          gender: 'Perempuan',
          specialist: 'Kulit',
          image: 'path/to/image2.jpg',
        },
        {
          name: 'Dr.Budi Santoso',
          gender: 'Laki-Laki',
          specialist: 'Mata',
          image: 'path/to/image2.jpg',
        },
        {
          name: 'Dr.Yoga Wibowo',
          gender: 'Laki-Laki',
          specialist: 'Telinga',
          image: 'path/to/image2.jpg',
        },
        {
          name: 'Dr.Strange',
          gender: 'Laki-Laki',
          specialist: 'Telinga',
          image: 'path/to/image2.jpg',
        },
      ];

    return (
      <>
        <div className="table-dokter table-responsive card shadow border-0">
            <table className="table table-borderless">
                <thead>
                    <tr>
                        <th className="table-name">Name</th>
                        <th className="table-gender">Jenis Kelamin</th>
                        <th>Spesialis</th>
                    </tr>
                </thead>
                <tbody>
                  {listDokter.map((dokter, index) => (
                    <tr key={index}>
                      <td className="d-flex flex-row align-items-center gap-2 text-nowrap">
                        <div className="rounded-circle border border-2 border-dark">
                          <img src={bulletIcon} alt={dokter.name} width={34} height={34} className="rounded-circle object-fit-cover" />
                        </div>
                        <p className="m-0">{dokter.name}</p>
                      </td>
                      <td>{dokter.gender}</td>
                      <td>{dokter.specialist}</td>

                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
      </>
    )
}