// Packages
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetAllDoctorTransaction } from "../../../services/patient-services";

// Utils & Services
import useForm from "../../../hooks/useForm";
import { formattedDate } from "../../../utils/helpers";
import { theadDoctor } from "../../../utils/dataObject";

// Components
import { Column } from "./Column";
import { StatusBtn } from "./StatusBtn";
import { ImageModal } from "./ImageModal";
import { TableContainer } from "./TableContainer";
import { Button } from "../../../components/ui/Button";
import { updateStatusOrder } from "../../../services/transaction-services";


const initialState = {
  search: '',
  imageSrc: null,
  modal: false,
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
    handleInput,
    setForm,
  } = useForm(initialState);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateStatusOrder,
    onError: error => {
      console.error(error);
    },
    onSuccess: (newData) => {
      // Mencari indeks dari item yang diperbarui di dalam array results
      const updatedIndex = data?.results.findIndex(item => item?.transaction_id === newData.id);
  
      // Mengupdate cache dengan hasil mutasi yang baru
      queryClient.setQueryData(['doctorTransaction'], oldData => {
        if (oldData) {
          // Membuat salinan array results untuk memastikan immutability
          const updatedResults = [...oldData.results];
          
          // Mengganti item di updatedResults dengan data baru
          updatedResults[updatedIndex] = {
            ...updatedResults[updatedIndex],
            payment_status: newData.newStatus
          };
  
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
      modal: true,
      imageSrc: src
    }))
  }

  const closeModal = () => {
    setForm((prev) => ({
      ...prev,
      modal: false
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
            const date = formattedDate(data?.created_at);
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
                  />
                </td>
              </tr>
            )
          }
          }
        />
      </TableContainer>
      {form.modal &&
        <ImageModal closeModal={closeModal} source={form.imageSrc} />
      }

    </>
  )
}

