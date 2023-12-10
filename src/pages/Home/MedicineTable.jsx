import { useEffect } from "react";
import { RowTable } from "../../components/Table/RowTable";
import { useGetAllMedicine } from "../../services/medicine-service";
import { useInView } from "react-intersection-observer";
import { MedicineTableContainer } from "../Medicine/MedicinePage";
import { theadMedicineHome } from "../../utils/dataObject";

export const MedicineTable = () => {
  const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isPending,
    refetch,
    isFetchingNextPage,
  } = useGetAllMedicine();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <MedicineTableContainer
      thead={theadMedicineHome}
      pageFor={'homepage'}
      className={'border'}
      >
    <RowTable
      ifEmpty={"Tidak ada data Obat!"}
      isError={isError}
      isFetch={isFetchingNextPage}
      reffer={ref}
      refetch={refetch}
      isPending={isPending}
      data={data?.pages}
      totalRow={7}
      totalCol={10}
      renderItem={(data) => {
        return (
          <tr key={data?.id}>
            <td>{data?.name}</td>
            <td>{data?.stock}</td>
          </tr>
        );
      }}
    />
  </MedicineTableContainer>
  )
}
