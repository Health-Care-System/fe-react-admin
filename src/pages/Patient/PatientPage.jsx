import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useState } from 'react';
import { CircleProgressBar } from '../../components/Chart/CircleProgressBar';
import circleMan from '../../assets/icon/CircleMan.svg'
import circleWoman from '../../assets/icon/CircleWoman.svg'


export const PatientPage = () => {

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSelectButtons, setShowSelectButtons] = useState(false);

  const yourDataArray = [
    { name: 'Joshua Kristin', 
      gender: 'Laki-Laki', 
      age: '21 Thn', 
      doctor: 'Dr. Djaja Surya', 
      date: '17 okt 23', 
      diagnosis: 'Demam', 
      status: 'Diberi Resep' },

      { name: 'Joshua Kristin', 
      gender: 'Laki-Laki', 
      age: '21 Thn', 
      doctor: 'Dr. Djaja Surya', 
      date: '17 okt 23', 
      diagnosis: 'Demam', 
      status: 'Diberi Resep' },
  ];

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems([...Array(yourDataArray.length).keys()]);
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = (index) => {
    const selectedIndex = selectedItems.indexOf(index);
    let newSelectedItems = [...selectedItems];

    if (selectedIndex === -1) {
      // If the item is not in the array, add it
      newSelectedItems.push(index);
    } else {
      // If the item is already in the array, remove it
      newSelectedItems.splice(selectedIndex, 1);
    }

    setSelectedItems(newSelectedItems);
  };

  const toggleSelectButtons = () => {
    setShowSelectButtons(!showSelectButtons);
  };

  const handleDelete = () => {
    // Implement your delete logic using the selectedItems array
    console.log('Delete items:', selectedItems);
    // Add Logic
    setSelectedItems([]);
    setShowSelectButtons(false);
  };

  const handleCancel = () => {
    // Implement your cancel logic
    // Clear the selected items array and hide the select buttons
    setSelectedItems([]);
    setShowSelectButtons(false);
  };

  

  return (
    <div className="Container">

      <div className="row d-flex justify-content-center align-content-between flex-wrap" style={{ marginBottom: "50px", marginLeft:'30px', marginTop: '15px'}}>
          <div className="col-md-4 mb-3" style={{ marginBottom: 15 }}>
            <div className="card" style={{ width: "80%", maxWidth: "400px", backgroundColor: '#EBEBEB' }}>
              <div className='d-flex gap-4 align-items-center'>
                <div className="card-body">
                  <div className="custom-circle-progress" style={{ width: '90px', height: '90px', marginLeft:'20px' }}>
                    <CircleProgressBar total={784} percentage={40} />
                  </div>
                </div>
                <div className="d-grid gap-1" style={{marginRight: '60px'}}>
                  <div className="d-flex gap-1 align-items-center justify-content-start ">
                    <img
                      src={circleWoman}
                      alt="circle"
                      className="chart_gender_circle"
                    />
                    <p className="fs-4 ">Wanita</p>
                    <span className="fs-4 ">40%</span>
                  </div>

                  <div className="d-flex gap-1 align-items-center justify-content-start ">
                    <img src={circleMan} alt="circle" className="chart_gender_circle" />
                    <p className="fs-4">Pria</p>
                    <span className="fs-4 ">60%</span>
                  </div>
                </div>
              </div>
              {/* <div className="footer" style={{ textAlign: "center" }}>
                  Chart
              </div> */}
            </div>
          </div>


          <div className="col-md-4 mb-3" style={{ marginBottom: 15 }}>
            <div className="card" style={{ width: "80%", backgroundColor: '#EBEBEB' }}>
              <div className="card-body">
                <h3 className="fw-bold text-center">
                  470
                </h3>
              </div>
              <div className="fw-bold" style={{ textAlign: "center", color: '#565556' }}>
                Pasien Pria
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3" style={{ marginBottom: 15 }}>
            <div className="card" style={{ width: "80%", backgroundColor: '#EBEBEB' }}>
              <div className="card-body">
                <h3 className="fw-bold text-center">
                  314
                </h3>
              </div>
              <div className="fw-bold" style={{ textAlign: "center", color: '#565556' }}>
                Pasien Wanita
              </div>
            </div>
          </div>
        </div>


        <div className="List">
          <div className="title" style={{ marginLeft: '40px', marginTop: '30px' }}>
            <h6 className="fw-bold">Daftar Pasien</h6>
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end" style={{ marginRight: '20px' }}>
            {showSelectButtons ? (
              <>
                <Button
                  className="btn btn-danger"
                  style={{ marginRight: '10px', width: '10px' }}
                  onClick={handleDelete}
                >
                  Hapus
                </Button>
                <Button
                  className="btn btn-secondary"
                  style={{ marginRight: '10px', width: '10px' }}
                  onClick={handleCancel}
                >
                  Batal
                </Button>
              </>
            ) : (
              <Button
                className="btn btn-dark"
                style={{ marginRight: '10px', width: '10px' }}
                onClick={toggleSelectButtons}
              >
                Pilih
              </Button>
            )}
            <Link to="/patients/create-patient" className="btn btn-outline-info">
              Tambah Pasien
            </Link>
          </div>

          <div className="table-responsive" style={{marginLeft: '30px'}}>
            <table className="table" style={{ marginTop: '20px' }}>
              <thead>
                <tr>
                  {showSelectButtons && (
                    <th scope="col">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="selectAllCheckbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                  )}
                  <th scope="col">Nama</th>
                  <th scope="col">Jenis Kelamin</th>
                  <th scope="col">Umur</th>
                  <th scope="col">Dokter</th>
                  <th scope="col">Tgl Konsultasi</th>
                  <th scope="col">Diagnosa</th>
                  <th scope="col">Status Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {yourDataArray.map((data, index) => (
                  <tr key={index}>
                    {showSelectButtons && (
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(index)}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </td>
                    )}
                    <td>{data.name}</td>
                    <td>{data.gender}</td>
                    <td>{data.age}</td>
                    <td>{data.doctor}</td>
                    <td>{data.date}</td>
                    <td>{data.diagnosis}</td>
                    <td>{data.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

    </div>

    
  )
}
