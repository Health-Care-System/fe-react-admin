import { Spinner } from "../Loader/Spinner"
import { Button } from "../ui/Button"
import { ColumnSkeleton } from "../ui/Skeleton/ColumnSkeleton"

export const RowTable = ({
  isError,
  isPending,
  data,
  refetch,
  renderItem,
  ifEmpty,
  paddingError,
  totalCol,
  totalRow,
  isDebounce,
  reffer,
  isFetch
}) => {
  
  if (isPending) {
    return (
      <ColumnSkeleton totalRow={totalRow} totalCol={totalCol} />
    )
  }
  
  if (isError) {
    return (
      <TableRow>
        <div className={paddingError ? paddingError : 'py-5'}>
          <p>Gagal memuat data!</p>
          <Button className={'btn-primary text-white mt-1'} onClick={refetch}>Coba Lagi</Button>
        </div>
      </TableRow>
    )
  }
  
  if (data?.length < 1 || data[0] === null) {
    return (
      <tr>
        <td colSpan={totalRow} className="text-center rounded-3 fs-2">{ifEmpty}</td>
      </tr>
    )
  }

  if (isDebounce) {
    return (
      <>
        {data?.length > 0 ? (
          data?.map((res, index) => renderItem(res, index, 0))
        ) : (
          <tr>
            <td colSpan={12} className="text-center py-5 rounded-3 fs-2">
              {ifEmpty}
            </td>
          </tr>
        )}
      </>
    );
  }

  return (
    <>
      {data?.map((item) => (
        item?.results?.map((res, index) => (
          renderItem(res, index, item?.pagination?.offset)
        ))
      ))
      }
      <tr colSpan={12} ref={reffer}>
        {isFetch
          ? <td colSpan={12} className="text-center text-secondary"><Spinner /></td>
          : ''
        }
      </tr>
    </>
  )

}

const TableRow = ({ children }) => {
  return (
    <>
      <tr>
        <td colSpan={12} className="text-center">
          {children}
        </td>
      </tr>
    </>
  )
}