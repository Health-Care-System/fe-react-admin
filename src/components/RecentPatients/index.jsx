import bulletIcon from '../../assets/icon/patient.svg'
import "./RecentPatients.css"


// import { Button } from "../ui/Button";

export const RecentPatient = () => {
    const patientData = [
        {
          id: '1',
          name: 'Joshua Kristin',
          gender: 'Male',
          weight: '58 kg',
          discase: 'Demam',
          date: '17 Okt 23',
          status: 'Recover',
          image: 'path/to/image2.jpg',
        },
        {
          id: '2',
          name: 'Namira Zaitun',
          gender: 'Female',
          weight: '48 kg',
          discase: 'Gerd',
          date: '17 Okt 23',
          status: 'Recover',
          image: 'path/to/image2.jpg',
        },
      ];

    return (
      <>
        <div className="table-responsive card shadow border-0">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Lengkap</th>
                        <th>Gender</th>
                        <th>Tgl Lahir</th>
                        <th>Gol.Darah</th>
                        <th>Berat Badan</th>
                        <th>Tinggi Badan</th>
                    </tr>
                </thead>
                <tbody>
                  {patientData.map((patient, index) => (
                    <tr key={index}>
                      <td>{patient.id}</td>
                      <td className="d-flex flex-row align-items-center gap-2 text-nowrap">
                        <div className="rounded-circle border border-2 border-dark">
                          <img src={bulletIcon} alt={patient.name} width={34} height={34} className="rounded-circle object-fit-cover" />
                        </div>
                        <p className="m-0">{patient.name}</p>
                      </td>
                      <td>{patient.gender}</td>
                      <td>{patient.weight}</td>
                      <td>{patient.discase}</td>
                      <td>{patient.date}</td>
                      <td>{patient.status}</td>

                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
      </>
    )
}