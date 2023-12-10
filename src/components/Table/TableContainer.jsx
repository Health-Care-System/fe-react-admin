import { Link } from 'react-router-dom';
import searchIconGrey from '../../assets/icon/search-grey.svg';
import Input from '../ui/Form/Input';

export const TableContainer = ({
  handleInput,
  inputValue,
  name,
  title,
  children,
  placeHolder,
  maxHeight,
  className,
  thead,
  bgThead,
  forPage
}) => {
  return (
    <div className={`table-responsive rounded-4 p-4 ${className}`}>
      <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-4">
        <h6 className="fw-semibold fs-2 m-0">{title}</h6>
        {forPage === 'homepage' ? (
          <Link to={'/patients/data'} className="text-decoration-none fw-semibold">
          Lihat Semua
          </Link>
        ) : (
          name !== null && (
            <div className="position-relative mt-3 mt-md-0">
              <Input
                name={name}
                onChange={(e) => handleInput(e)}
                value={inputValue}
                type={'text'}
                placeholder={placeHolder}
                className={'rounded-5 ps-5 border-0 bg-white py-2'}
              />
              <img
                src={searchIconGrey}
                className="position-absolute searchIcon"
                alt="Search"
              />
            </div>
          )
        )}

      </div>
      <div 
        className="table-responsive table-wrapper" 
        style={{ 
          height: 'fit-content', 
          minHeight: '13rem', 
          maxHeight: `calc(100vh - ${maxHeight})`
          }}>
        <table className="table table-borderless table-striped align-middle" >
          <thead className='sticky-top z-0 '>
            <tr>
              {thead?.map((item, index) => (
                <th
                  key={index}
                  className={`fw-semibold text-nowrap ${bgThead} ${item === 'Status' && 'text-center'}`}
                  scope="col">
                  {item}
                </th>
              ))
              }
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  )
}