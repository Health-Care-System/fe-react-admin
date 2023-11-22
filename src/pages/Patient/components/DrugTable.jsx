import { useGetAllDrugTransaction } from "../../../services/patient-services"
import useForm from "../../../hooks/useForm";
import { theadDrug } from "../../../utils/dataObject";
import { TableContainer } from "./TableContainer";
import { Column } from "./Column";
import { StatusBtn } from "./StatusBtn";
import { ImageModal } from "./ImageModal";

const initialState = {
  search: ''
}


export const DrugTable = () => {
  const {
    data,
    refetch,
    isPending,
    isError
  } = useGetAllDrugTransaction();

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
        title={'Transaksi Pembelian Obat'}
        thead={theadDrug}
      >
        <Column
          isError={isError}
          isPending={isPending}
          refetch={refetch}
          data={data}
          search={form.search}
          renderItem={(data, index) =>
            <tr className=" text-nowrap" key={index}>
              <td>{data?.id ?? '-'}</td>
              <td>{data?.idPatient ?? '-'}</td>
              <td>{data?.payment ?? '-'}</td>
              <td>{`Rp ${data.total.toLocaleString('ID-id')}`}</td>
              <td>{data.date ?? '-'}</td>
              <td>
                <ImageModal />
              </td>
              <td className="d-flex justify-content-center">
                <StatusBtn status={data.status} />
              </td>
            </tr>
          }
        />
      </TableContainer>

    </>
  )
}

