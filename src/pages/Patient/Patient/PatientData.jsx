import { useNavigate } from "react-router-dom";
import { useGetAllPatients } from "../../../services/patient-services";
import '../Patient.css'
import { TableContainer } from "../../../components/Table/TableContainer";
import useForm from "../../../hooks/useForm";
import { thead } from "../../../utils/dataObject";
import { RowTable } from "../../../components/Table/RowTable";

const initialState = {
  searchUser: '',
}

export const PatientData = () => {
  const {
    data,
    isPending,
    isError,
    refetch
  } = useGetAllPatients();
  const {
    form,
    handleInput
  } = useForm(initialState);
  const navigate = useNavigate();
  const onNavigate = (id) => {
    navigate(`/patients/data/${id}`)
  }

  return (
      <TableContainer
          name={'search'}
          title={'Daftar Pasien'}
          placeHolder={'Cari ID Pasien'}
          className={'border'}
          bgThead={'bg-light'}
          maxHeight={'22rem'}
          thead={thead}
          inputValue={form.search}
          handleInput={handleInput}
        >
          <RowTable
          isError={isError}
          isPending={isPending}
          refetch={refetch}
          data={data}
          search={form?.search}
          ifEmpty={'Tidak ada riwayat transaksi konsultasi dokter!'}
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
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.gender}</td>
            <td>{data.birthdate}</td>
            <td>{data.blood}</td>
            <td>{data.weight}</td>
            <td>{data.height}</td>
          </tr>
            )
          }
          }
          />
        </TableContainer>
  )
}