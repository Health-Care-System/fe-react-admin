import { useGetAllDoctorTransaction } from "../../../services/patient-services"
import useForm from "../../../hooks/useForm";
import { theadDoctor } from "../../../utils/dataObject";
import { TableContainer } from "./TableContainer";
import { Column } from "./Column";
import { formattedDate } from "../../../utils/helpers";
import { StatusBtn } from "./StatusBtn";
import { ImageModal } from "./ImageModal";


const initialState = {
  search: ''
}


export const DoctorTable = () => {
  const {
    data,
    refetch,
    isPending,
    isError
  } = useGetAllDoctorTransaction();

  const {
    form,
    handleInput
  } = useForm(initialState);
  return (
    <>
      <TableContainer
        handleInput={handleInput}
        inputValue={form.search}
        name={'search'}
        title={'Transaksi Konsultasi Dokter'}
        thead={theadDoctor}
      >
        <Column
          isError={isError}
          isPending={isPending}
          refetch={refetch}
          data={data}
          search={form.search}
          ifEmpty={'Tidak ada riwayat transaksi konsultasi dokter!'}
          renderItem={(data, index) => {
            const date = formattedDate(data.date);
            const subTotal = data.total.toLocaleString('ID-id');
            return (
              <tr className="text-nowrap" key={index}>
                <td>{data.id}</td>
                <td>{data.idDoctor}</td>
                <td>{data.idPatient}</td>
                <td>{data.payment}</td>
                <td>{`Rp ${subTotal}`}</td>
                <td>{date}</td>
                <td>
                  <ImageModal />
                </td>
                <td className="d-flex justify-content-center">
                <StatusBtn status={data.status} />
              </td>
              </tr>
            )
          }
          }
        />
      </TableContainer>

    </>
  )
}

