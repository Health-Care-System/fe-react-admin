// Packages
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Utils / service
import useForm from "../../../hooks/useForm";
import { formatDate } from "../../../utils/helpers";
import useDebounce from "../../../hooks/useDebounce";
import { theadMedicine } from "../../../utils/dataObject";
import { useGetAllMedicineTransaction } from "../../../services/patient-services"
import { getMedicineTransactionByID, updateStatusOrderMedicine } from "../../../services/transaction-services";

// Components
import { StatusBtn } from "./StatusBtn";
import { TransactionModal } from "../../../components/ui/Modal/TransactionModal";
import { TableContainer } from "../../../components/Table/TableContainer";
import { RowTable } from "../../../components/Table/RowTable";

const initialState = {
  searchMedicine: '',
  imageSrc: null,
  modalImg: false,
  offset: null,
  modalTransactions: false,
  modalData: null,
}

export const MedicineTable = () => {
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

  const closeModal = () => {
    setForm((prev) => ({
      ...prev,
      modalTransaction: false
    }))
  }

  const handleEdit = (status, id, offset, e) => {
    e.stopPropagation();
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

  const openDetailTransactionModal = (item, e) => {
    e.stopPropagation();
    setForm((prev) => ({
      ...prev,
      modalTransaction: true,
      modalData: item
    })
    )
  }

  const [filterData, setFilterData] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const debouncedValue = useDebounce(form?.searchMedicine, 500);
  useEffect(() => {
    if (debouncedValue !== '') {
      getMedicineTransactionByID(
        setLoadingSearch,
        setFilterData,
        debouncedValue
      )
    }
  }, [debouncedValue]);

  return (
    <>
      <TableContainer
        name={'searchMedicine'}
        title={'Transaksi Pembelian Obat'}
        placeHolder={'Cari ID Transaksi'}
        handleInput={handleInput}
        className={'border'}
        bgThead={'bg-light'}
        thead={theadMedicine}
        inputValue={form.searchMedicine}
        maxHeight={'45rem'}
      >
        <RowTable
          isError={isError}
          isPending={isPending || loadingSearch}
          refetch={refetch}
          reffer={ref}
          isDebounce={debouncedValue !== ''}
          data={debouncedValue !== '' ? filterData : data?.pages}
          isFetch={isFetchingNextPage}
          search={form.search}
          totalRow={6}
          ifEmpty={'Tidak ada riwayat transaksi!'}
          renderItem={(item, index, offset) => {
            const date = formatDate(item?.created_at)
            return (
              <tr
                onClick={(e) => openDetailTransactionModal(item, e)}
                className="text-capitalize text-nowrap cursor-pointer"
                key={index}>
                <td>{item?.id}</td>
                <td>{item?.medicine_transaction?.user_id}</td>
                <td>{item?.medicine_transaction?.payment_method}</td>
                <td>{`Rp ${item?.medicine_transaction?.total_price.toLocaleString('ID-id')}`}</td>
                <td>{date}</td>
                <td className="d-flex justify-content-center">
                  <StatusBtn
                    isPending={mutation.isPending}
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

      {form.modalTransaction &&
        <TransactionModal data={form.modalData} close={closeModal} />
      }
    </>
  )
}


