import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ColumnSkeleton = ({ totalRow, totalCol }) => {
  const columns = Array.from({ length: totalRow }).map((_, index) => (
    <td className='pe-2 z-n1' key={index}>{<Skeleton />}</td>
  ));

  const rows = Array.from({ length: totalCol }).map((_, rowIndex) => (
    <tr key={rowIndex}>{columns}</tr>
  ));

  return <>{rows}</>;
};
