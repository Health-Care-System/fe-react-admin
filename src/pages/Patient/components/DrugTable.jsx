import { useMutation, useQueryClient } from "@tanstack/react-query";

// Utils / service
import useForm from "../../../hooks/useForm";
import { formatDate } from "../../../utils/helpers";
import { theadDrug } from "../../../utils/dataObject";
import { useGetAllMedicineTransaction } from "../../../services/patient-services"
import { updateStatusOrderMedicine } from "../../../services/transaction-services";

// Components
import { Column } from "./Column";
import { StatusBtn } from "./StatusBtn";
import { ImageModal } from "./ImageModal";
import { TableContainer } from "./TableContainer";
import { Button } from "../../../components/ui/Button";

const initialState = {
  search: '',
  imageSrc: null,
  modalImg: false,
}

export const DrugTable = () => {
  const {
    data,
    refetch,
    isPending,
    isError
  } = useGetAllMedicineTransaction();

  const {
    form,
    handleInput,
    setForm,
  } = useForm(initialState);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateStatusOrderMedicine,
    onError: error => {
      console.error(error);
    },
    onSuccess: (newData) => {
      // Mencari indeks dari item yang diperbarui di dalam array results
      const updatedIndex = data?.results?.findIndex(item => item?.id === newData?.results?.id);
  
      // Mengupdate cache dengan hasil mutasi yang baru
      queryClient.setQueryData(['medicineTransaction'], oldData => {
        if (oldData) {
          // Membuat salinan array results untuk memastikan immutability
          const updatedResults = [...oldData.results];
          // Mengganti item di updatedResults dengan data baru
          updatedResults[updatedIndex] = newData.results;
  
          // Mengembalikan objek yang baru dengan array results yang telah diperbarui
          return {
            ...oldData,
            results: updatedResults
          };
        }
  
        return oldData; // Mengembalikan null jika oldData null
      });
    }
  });
  

  const handleModalLink = (src) => {
    setForm((prev) => ({
      ...prev,
      modalImg: true,
      imageSrc: src
    }))
  }

  const closeModal = () => {
    setForm((prev) => ({
      ...prev,
      modalImg: false
    }))
  }

  const handleEdit = (status, id) => {
    mutation.mutate({
      newStatus: status,
      id: id
    })
  }
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
          ifEmpty={'Tidak ada riwayat transaksi pembelian obat!'}
          renderItem={(item, index) => {
            const date = formatDate(item?.created_at)
            return (
              <tr className="text-capitalize text-nowrap" key={index}>
                <td>{item?.id}</td>
                <td>{item?.medicine_transaction?.user_id}</td>
                <td>{item?.medicine_transaction?.payment_method}</td>
                <td>{`Rp ${item?.medicine_transaction?.total_price.toLocaleString('ID-id')}`}</td>
                <td>{date}</td>
                <td>
                  {!item?.payment_confirmation
                    ? '-'
                    : <Button
                      className={'p-0 text-primary fw-semibold'}
                      onClick={() => handleModalLink(item?.payment_confirmation)}>Link</Button>
                  }
                </td>
                <td className="d-flex justify-content-center">
                  <StatusBtn 
                    id={item?.id}
                    handleAction={handleEdit}
                    status={item?.payment_status} />
                </td>
              </tr>
            )
          }}
        />
      </TableContainer>
      {form.modalImg &&
        <ImageModal 
          closeModal={closeModal} 
          source={form.imageSrc} />
      }

    </>
  )
}

