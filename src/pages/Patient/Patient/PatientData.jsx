// Packages
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Utils / Services / Hooks
import { 
  getDataUserById, 
  useGetAllPatients 
} from "../../../services/patient-services";
import useForm from "../../../hooks/useForm";
import { thead } from "../../../utils/dataObject";
import useDebounce from "../../../hooks/useDebounce";

// Components
import { RowTable } from "../../../components/Table/RowTable";
import { TableContainer } from "../../../components/Table/TableContainer";
import '../Patient.css'

const initialState = {
  search: '',
}

export const PatientData = () => {
  
  // State untuk fungsi pencarian, state filteredData akan menampung data hasil pencarian
  // Untuk loadingSearch berfungsi memberikan efek loading saat pencarian
  const [filterData, setFilterData] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  
  // Object Destructuring dari React Query (data, isPending, isError, refetch)
  // Data diadapat dari hit API untuk mendapatkan data semua pasien.
  // Refetch adalah sebuah function yang digunakan untuk refecthing ulang ke endpoint API.
  const {
    data,
    isPending,
    isError,
    refetch
  } = useGetAllPatients();
  
  // useForm adalah sebuah custom hooks untuk form, yang sudah dibekali dengan handleInput untuk onChange
  const {
    form,
    handleInput
  } = useForm(initialState);
  
  // Handle rute navigasi ke setiap halaman detail patients
  const navigate = useNavigate();
  const onNavigate = (id) => {
    navigate(`/patients/data/${id}`)
  }
  
  // Akan melakukan hit API setelah delay 500ms, 
  // data hasil pencarian akan disimpan ke dalam state filterData
  // function getDataUserById ada di file patient-service.
  // FUngsi dibawah hanya dipakai untuk pencarian saja, 
  // jika debouncedValue === '', maka yang akan dirender di tabel adalah object data pada line 33
  const debouncedValue = useDebounce(form?.search, 500);
  useEffect(() => {
    if (debouncedValue !== '') {
      getDataUserById(
        setLoadingSearch,
        setFilterData,
        debouncedValue
        )
    }
  }, [debouncedValue]);
  return (
    <TableContainer
      name={'search'}
      title={'Daftar Pasien'}
      placeHolder={'Cari ID Pasien'}
      className={'border'}
      bgThead={'bg-light'}
      maxHeight={'22rem'}
      thead={thead}
      inputValue={form?.search}
      handleInput={handleInput}
    >
      <RowTable
        isError={isError}
        isPending={debouncedValue !== '' ? loadingSearch : isPending}
        data={debouncedValue !== '' ? filterData : data?.results}
        refetch={refetch}
        search={form?.search}
        ifEmpty={'Tidak ada pasien'}
        paddingError={'py-2'}
        totalCol={10}
        totalRow={8}
        renderItem={(data, index) => {
          return (
            <tr
              onClick={() => onNavigate(data.id)}
              className="text-nowrap cursor-pointer"
              key={index}
            >
              <td>{data?.id}</td>
              <td>{data?.fullname}</td>
              <td>{data?.email}</td>
              <td>{data?.gender}</td>
              <td>{data?.birthdate}</td>
              <td>{data?.blood_type}</td>
              <td>{data?.weight}</td>
              <td>{data?.height}</td>
            </tr>
          )
        }
        }
      />
    </TableContainer>
  )
}