import { Button } from "../../../components/ui/Button";

export const Column = ({ isError, isPending, data, refetch , renderItem, search }) => {
  if (isError) {
    return <Button className={'btn-primary text-white'} onClick={refetch}>Coba Lagi</Button>
  }

  if (isPending) {
    return <p>Loading...</p>
  }
  
  const filterData = data?.results.filter(data => data.id.includes(search));   
  return (
    <>
      {filterData?.map((data, index) => (
        renderItem(data, index)
      ))}
    </>
  )

}