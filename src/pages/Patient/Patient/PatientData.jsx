import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Link } from "react-router-dom";

export const PatientData = () => {
  
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showSelectButtons, setShowSelectButtons] = useState(false);

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
      height: '160cm'
    },
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

      <div className="table-responsive p-3 rounded-4 border-1 border" style={{ marginLeft: '30px' }}>
        <table className="table table-light" style={{ borderBottomColor: '#D9D9D9'}}>
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
              <th scope="col">ID</th>
              <th scope="col">Nama Lengkap</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Tgl Lahir</th>
              <th scope="col">Gol. Darah</th>
              <th scope="col">Berat Badan</th>
              <th scope="col">Tinggi Badan</th>
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

  </div>
  )
}
