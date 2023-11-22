import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/ui/Form/Input";
import searchIconGrey from '../../../assets/icon/search-grey.svg'
import '../Patient.css'


export const PatientData = () => {
  const navigate = useNavigate();
  const onNavigate = (id) => {
    navigate(`/patients/data/${id}`)
  }

  const yourDataArray = [
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '170cm'
    },
    {
      id: '123',
      name: 'Joshua Kristin',
      email: 'joshua@gmail.com',
      gender: 'Laki-Laki',
      birthdate: '17 Oktober 2002',
      blood: 'A',
      weight: '70Kg',
      height: '160cm'
    },
  ];
  const thead = ["ID", "Nama Lengkap", "Email", "Gender", "Tgl Lahir", "Gol. Darah", "Berat Badan", "Tinggi Badan"];

  return (
    <div className="table-responsive rounded-4 border p-4">
      <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-4">
        <h6 className="fw-semibold fs-2 m-0">Daftar Pasien</h6>
        <div className="position-relative mt-3 mt-md-0">
          <Input
            name={'searchUserInput'}
            placeHolder={'cari...'}
            className={'rounded-5 ps-5 border-0 bg-white py-2'}
          />
          <img
            src={searchIconGrey}
            className="position-absolute searchIcon"
            alt="Search"
          />
        </div>
      </div>
      <div className=" table-responsive table-wrapper" style={{maxHeight: 'calc(100vh - 19rem)'}}>
      <table className="table border-bottom table-hover">
        <thead className=" sticky-top">
          <tr>
            {thead?.map((item, index) => (
              <th
                key={index}
                className="fw-semibold text-nowrap"
                scope="col">
                {item}
              </th>
            ))
            }
          </tr>
        </thead>
        <tbody>
          {yourDataArray.map((data, index) => (
            <tr 
              onClick={() => onNavigate(data.id)} 
              className="text-nowrap cursor-pointer" 
              key={index}
            >
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.gender}</td>
              <td>{data.birthdate}</td>
              <td>{data.blood}</td>
              <td>{data.weight}</td>
              <td>{data.height}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
