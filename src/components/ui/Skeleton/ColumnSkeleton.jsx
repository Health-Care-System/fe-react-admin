import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const ColumnSkeleton = ({ totalRow }) => {
  const columns = Array.from({ length: totalRow }).map((_, index) => (
    <td className='pe-2 z-0' key={index}>{<Skeleton />}</td>
  ));

  return (
    <>
      <tr>{columns}</tr>
      <tr>{columns}</tr>
      <tr>{columns}</tr>
      <tr>{columns}</tr>
    </>
  );
};