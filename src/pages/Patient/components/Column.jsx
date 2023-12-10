import { Spinner } from "../../../components/Loader/Spinner";
import { Button } from "../../../components/ui/Button";

export const Column = ({
  isError,
  isPending,
  data,
  refetch,
  renderItem,
  ifEmpty,
  reffer,
  isDebounce,
  isFetch
}) => {
  if (isError) {
    return (
      <TableRow>
        <div className="py-5">
          <p>Gagal memuat data!</p>
          <Button className={'btn-primary text-white mt-1'} onClick={refetch}>Coba Lagi</Button>
        </div>
      </TableRow>
    )
  }

  if (isPending) {
    return (
      <TableRow>
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </TableRow>
    )
  }

  if (data?.length < 1 || data[0] === null) {
    return (
      <tr>
        <td colSpan={12} className="text-center rounded-3 fs-2">{ifEmpty}</td>
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