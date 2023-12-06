// Packages
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetAllDoctorTransaction } from "../../../services/patient-services";

// Utils & Services
import useForm from "../../../hooks/useForm";
import { formatDate } from "../../../utils/helpers";
import { theadDoctor } from "../../../utils/dataObject";
import { updateStatusOrderDoctor } from "../../../services/transaction-services";

// Components
import { Column } from "./Column";
import { StatusBtn } from "./StatusBtn";
import { ImageModal } from "./ImageModal";
import { TableContainer } from "./TableContainer";
import { Button } from "../../../components/ui/Button";


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
  console.log(data)
  
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

  const handleEdit = (status, id, offset) => {
    mutation.mutate({
      newStatus: status,
      id,
      offset
    })
  }
    
  return (
    <>
      <TableContainer
        handleInput={handleInput}
        inputValue={form.searchDoctor}
        name={'searchDoctor'}
        title={'Transaksi Konsultasi Dokter'}
        thead={theadDoctor}
      >
        <Column
          isError={isError}
          isPending={isPending}
          refetch={refetch}
          data={data?.pages}
          search={form.search}
          isFetch={isFetchingNextPage}
          reffer={ref}
          ifEmpty={'Tidak ada riwayat transaksi konsultasi dokter!'}
          renderItem={(data, index, offset) => {
            const date = formatDate(data?.created_at);
            const subTotal = data?.price?.toLocaleString('ID-id');
            return (
              <tr className="text-nowrap" key={index}>
                <td>{data?.transaction_id}</td>
                <td>{data?.Doctor_id}</td>
                <td>{data?.user_id}</td>
                <td className="text-capitalize">{data?.payment_method}</td>
                <td>{`Rp ${subTotal}`}</td>
                <td>{date}</td>
                <td>
                  {!data?.payment_confirmation
                    ? '-'
                    : <Button
                      className={'p-0 text-primary fw-semibold'}
                      onClick={() => handleModalLink(data?.payment_confirmation)}>Link</Button>
                  }
                </td>
                <td className="d-flex justify-content-center">
                  <StatusBtn
                    id={data?.transaction_id}
                    handleAction={handleEdit}
                    status={data?.payment_status}
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

