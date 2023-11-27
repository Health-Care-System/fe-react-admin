import {CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import { formatNumber } from '../../utils/helpers';

export const CircleProgressBar = ({total, percentage}) => {
  return (
    <>
      <CircularProgressbarWithChildren
        value={percentage} 
        strokeWidth={15}
        styles={buildStyles({
          textColor: '#000000',
          pathColor: `#2DB794`,
          trailColor: '#003240',
        })}
        >
        <div className='text-center mt-2 w-50'>
          <h5 className='m-0 fw-semibold fs-2 w-100'>{formatNumber(total)}</h5>
          <p className='m-0 fs-4'>Pasien</p>
        </div>
      </CircularProgressbarWithChildren>
    </>
  )
}
