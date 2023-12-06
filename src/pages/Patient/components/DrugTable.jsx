// Packages
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
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
  offset: null,
}

export const DrugTable = () => {
  const {
    data,
    refetch,
    isPending,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useGetAllMedicineTransaction();

  const {
    form,
    handleInput,
    setForm,
  } = useForm(initialState);

  const { ref, inView } = useInView();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateStatusOrderMedicine,
    onError: error => {
      console.error(error);
    },
    onSuccess: (newData) => {
      // Mencari indeks dari pages, berdasarkan offset pagenya
      const pageIndex = data?.pages?.findIndex(item => item?.pagination?.offset === form.offset);

      // Mengupdate cache dengan hasil mutasi yang baru
      queryClient.setQueryData(['medicineTransaction'], oldData => {
        if (oldData) {
          // Membuat salinan array results untuk memastikan immutability
          const updatedResults = [...oldData.pages];
          // Mengganti item di updatedResults dengan data baru
          updatedResults[pageIndex].results.forEach((result) => {
            if (result?.id === newData?.results?.id) {
              // Ubah nilai payment_status
              result.payment_status = newData?.results?.payment_status
            }
          });

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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

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

  const handleEdit = (status, id, offset) => {
    mutation.mutate({
      newStatus: status,
      id,
      offset
    })
    setForm(prev => ({
      ...prev,
      offset: offset
    }))
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
          reffer={ref}
          data={data?.pages}
          isFetch={isFetchingNextPage}
          search={form.search}
          ifEmpty={'Tidak ada riwayat transaksi pembelian obat!'}
          renderItem={(item, index, offset) => {
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
                    status={item?.payment_status}
                    offset={offset}
                  />
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

