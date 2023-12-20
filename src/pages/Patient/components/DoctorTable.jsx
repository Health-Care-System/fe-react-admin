// Packages
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetAllDoctorTransaction } from "../../../services/patient-services";

// Utils & Services
import useForm from "../../../hooks/useForm";
import { formatDate } from "../../../utils/helpers";
import useDebounce from "../../../hooks/useDebounce";
import { theadDoctor } from "../../../utils/dataObject";
import { getDoctorTransactionByID, updateStatusOrderDoctor } from "../../../services/transaction-services";

// Components
import { StatusBtn } from "./StatusBtn";
import { ImageModal } from "./ImageModal";
import { Button } from "../../../components/ui/Button";
import { TableContainer } from "../../../components/Table/TableContainer";
import { RowTable } from "../../../components/Table/RowTable";


const initialState = {
  searchDoctor: '',
  imageSrc: null,
  modalImg: false,
}

export const DoctorTable = () => {
  const {
    data,
    refetch,
    isPending,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage
  } = useGetAllDoctorTransaction();
  
  const {
    form,
    handleInput,
    setForm,
  } = useForm(initialState);
  
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateStatusOrderDoctor,
    onError: error => {
      console.error(error);
    },
    onSuccess: (newData) => {
      // Mencari indeks dari pages, berdasarkan offset pagenya
      const pageIndex = data?.pages?.findIndex(item => item?.pagination?.offset === newData.offset);
      
      // Mengupdate cache dengan hasil mutasi yang baru
      queryClient.setQueryData(['doctorTransaction'], oldData => {
        if (oldData) {
          // Membuat salinan array results
          const updatedResults = [...oldData.pages];
          
          // Mengganti item di updatedResults dengan data baru
          updatedResults[pageIndex].results.forEach((result) => {
            if (result.transaction_id === newData.id) {
              // Ubah nilai payment_status
              result.payment_status = newData.newStatus;
            }
          });
  
          // Mengembalikan objek yang baru dengan array pages yang telah diperbarui
          return {
            ...oldData,
            pages: updatedResults
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

  const handleEdit = (status, id, offset, e) => {
    e.stopPropagation();
    mutation.mutate({
      newStatus: status,
      id,
      offset
    })
  }
  
  const [filterData, setFilterData] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  
  const debouncedValue = useDebounce(form?.searchDoctor, 500);
  useEffect(() => {
    if (debouncedValue !== '') {
      getDoctorTransactionByID(
        setLoadingSearch,
        setFilterData,
        debouncedValue
        )
    }
  }, [debouncedValue]);
          
  return (
    <>
      <TableContainer
        handleInput={handleInput}
        inputValue={form.searchDoctor}
        name={'searchDoctor'}
        title={'Transaksi Konsultasi Dokter'}
        thead={theadDoctor}
        maxHeight={'45rem'}
        className={'border'}
        bgThead={'bg-light'}
        placeHolder={'Cari ID Transaksi'}
      >
        <RowTable
          isError={isError}
          isPending={isPending || loadingSearch}
          refetch={refetch}
          isDebounce={debouncedValue !== ''}
          data={debouncedValue !== '' ? filterData : data?.pages}
          isFetch={isFetchingNextPage}
          reffer={ref}
          totalRow={8}
          totalCol={4}
          ifEmpty={'Tidak ada riwayat transaksi konsultasi dokter!'}
          renderItem={(item, index, offset) => {
            const date = formatDate(item?.created_at);
            const subTotal = item?.price?.toLocaleString('ID-id');
            return (
              <tr className="text-nowrap" key={index}>
                <td>{item?.transaction_id}</td>
                <td>{item?.Doctor_id}</td>
                <td>{item?.user_id}</td>
                <td className="text-capitalize">{item?.payment_method}</td>
                <td>{`Rp ${subTotal}`}</td>
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
                    isPending={mutation.isPending}
                    id={item?.transaction_id}
                    handleAction={handleEdit}
                    status={item?.payment_status}
                    offset={offset}
                  />
                </td>
              </tr>
            )
          }
          }
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

