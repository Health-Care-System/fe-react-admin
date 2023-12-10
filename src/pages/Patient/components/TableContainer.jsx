import searchIconGrey from '../../../assets/icon/search-grey.svg';
import Input from '../../../components/ui/Form/Input';

export const TableContainer = ({
  handleInput,
  inputValue,
  name,
  title,
  children,
  thead
}) => {
  return (
    <div className="table-responsive rounded-4 border-1 border p-4">
      <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-4">
        <h6 className="fw-semibold fs-2 m-0">{title}</h6>
        <div className="position-relative mt-3 mt-md-0">
          <Input
            name={name}
            onChange={(e) => handleInput(e)}
            value={inputValue}
            type={'text'}
            placeholder={'Cari ID Tranksaksi'}
            className={'rounded-5 ps-5 border-0 bg-white py-2'}
          />
          <img
            src={searchIconGrey}
            className="position-absolute searchIcon"
            alt="Search"
          />
        </div>
      </div>
      <div className=" table-responsive table-wrapper" style={{ minHeight: '13rem', maxHeight: 'calc(100vh - 44rem)' }}>
        <table className="table table-borderless table-striped" >
          <thead className=' sticky-top z-0'>
            <tr>
              {thead?.map((item, index) => (
                <th
                  key={index}
                  className={`fw-semibold text-nowrap ${item === 'Status' && 'text-center'}`}
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