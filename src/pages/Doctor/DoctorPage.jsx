import { Button } from "../../components/ui/Button";
import add from "../../assets/icon/add.svg";
import { Link, useNavigate } from "react-router-dom";
import { genderFormat, theadDoctorList } from "../../utils/dataObject";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useGetAllDoctorData } from "../../services/doctor-sevices";
import { RowTable } from "../../components/Table/RowTable";
import ImageWithFallback from "../../components/Errors/ImageWithFallback";
import avatar from '../../assets/icon/user.png'

export const DoctorPage = () => {
  return (
    <section className="container-fluid ">
      <div className="m-3">
        <DoctorData />
      </div>
    </section>
  );
};

export const DoctorData = ({ forPage, maxHeight }) => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const onNavigate = (doctorData, offset) => {
    navigate(`/doctors/detail-doctor/${doctorData.id}`, {
      state: { data: doctorData, offset: offset },
    });
  };
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isPending,
    refetch,
    isFetchingNextPage,
  } = useGetAllDoctorData();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  return (
    <>
      <div className="card rounded-4 border">
        <div className="card-body bg-light rounded-4 p-4 border-0">
          <div className="d-flex flex-row justify-content-between">
          <h3 className="card-title fs-2 fw-semibold mb-2">Daftar Dokter</h3>
          {forPage === 'homepage'
          ? <Link to={'/doctors'} className="fw-semibold text-decoration-none">Lihat Semua</Link>
          : (
          <Link
            to="/doctors/create-doctor"
            className="card-subtitle d-flex gap-2 float-start float-md-end text-decoration-none mb-2"
          >
            <Button className="bg-primary text-white fw-semibold d-flex gap-1 rounded-3">
              <img
                className="img-fluid"
                src={add}
                alt="Button Create"
                style={{ height: 24, width: 24 }}
              />
              Tambah Dokter
            </Button>
          </Link>
          )
          }
          </div>
          <TableContainerDoctor 
            maxHeight={maxHeight ?? '22rem'}
            thead={theadDoctorList}>
            <RowTable
              ifEmpty={"Tidak ada data dokter!"}
              isError={isError}
              isFetch={isFetchingNextPage}
              reffer={ref}
              refetch={refetch}
              isPending={isPending}
              data={data?.pages}
              totalRow={7}
              totalCol={10}
              renderItem={(data, index) => {
                return (
                  <tr
                    onClick={() => onNavigate(data)}
                    className="text-nowrap cursor-pointer"
                    key={index}
                  >
                    <td>{data?.id}</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center ">
                        <div>
                        <ImageWithFallback 
                          src={data?.profile_picture} 
                          width={24} 
                          height={24} 
                          fallback={avatar} 
                          className={'object-fit-cover rounded-circle'} />
                        </div>
                        <p>{data?.fullname}</p>
                      </div>
                    </td>
                    <td>{genderFormat[data?.gender]}</td>
                    <td>{data?.email}</td>
                    <td>{data?.specialist}</td>
                    <td>{data?.experience}</td>
                    <td className="text-secondary">{data?.no_str}</td>
                  </tr>
                );
              }}
            />
          </TableContainerDoctor>
        </div>
      </div>
    </>
  )
}

const TableContainerDoctor = ({ maxHeight, thead, bgThead, children }) => {
  return (
    <>
      <div
        className="table-responsive table-wrapper"
        style={{
          height: "fit-content",
          minHeight: '13rem',
          maxHeight: `calc(100vh - ${maxHeight})`,
        }}
      >
        <table className="table table-borderless table-striped align-middle">
          <thead className="sticky-top z-0 ">
            <tr>
              {thead?.map((item, index) => (
                <th
                  key={index}
                  className={`fw-semibold text-nowrap ${bgThead} ${item === "Status" && "text-center"
                    }`}
                  scope="col"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  );
};
