import { Button } from "../../components/ui/Button";
import add from "../../assets/icon/add.svg";
import { Link, useNavigate } from "react-router-dom";
import { genderFormat, theadDoctorList } from "../../utils/dataObject";
import { useGetAllDoctors } from "../../services/doctor-sevices";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Column } from "../Patient/components/Column";

export const DoctorPage = () => {
  const navigate = useNavigate();
  const onNavigate = (doctorData) => {
    navigate(`/doctors/detail-doctor/${doctorData.id}`, {
      state: { data: doctorData },
    });
  };
  const {
    data,
    refetch,
    isPending,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetAllDoctors();

  console.log(data);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <section className="container-fluid ">
      <div className="m-3">
        <div className="card ">
          <div className="card-body ">
            <h3 className="card-title fs-2 fw-semibold mb-2">Daftar Dokter</h3>
            <Link
              to="/doctors/create-doctor"
              className="card-subtitle d-flex gap-2 float-start float-md-end  text-decoration-none mb-2 "
            >
              <Button className="bg-primary text-white fw-semibold d-flex gap-1 rounded-3 ">
                <img
                  className="img-fluid"
                  src={add}
                  alt="Button Create"
                  style={{ height: 24, widht: 24 }}
                />
                Tambah Dokter
              </Button>
            </Link>
            <TableContainerDoctor thead={theadDoctorList}>
              <Column
                isError={isError}
                isPending={isPending}
                refetch={refetch}
                data={data?.pages}
                isFetch={isFetchingNextPage}
                reffer={ref}
                ifEmpty={"Tidak ada ada dokter!"}
                renderItem={(doctorData, index, offset) => {
                  return (
                    <tr
                      onClick={() => onNavigate(doctorData, offset)}
                      className="text-nowrap cursor-pointer"
                      key={index}
                    >
                      <td>{doctorData?.id}</td>
                      <td>
                        <div className="d-flex gap-2 align-items-center ">
                          <img
                            src={doctorData?.profile_picture}
                            alt="avatar doctor"
                            className="object-fit-cover rounded-circle "
                            style={{ width: "1.5rem", height: "1.5rem" }}
                          />
                          <p>{doctorData?.fullname}</p>
                        </div>
                      </td>
                      <td>{genderFormat[doctorData?.gender]}</td>
                      <td>{doctorData?.email}</td>
                      <td>{doctorData?.specialist}</td>
                      <td>{doctorData?.experience}</td>
                      <td className="text-secondary">{doctorData?.no_str}</td>
                    </tr>
                  );
                }}
              />
            </TableContainerDoctor>
          </div>
        </div>
      </div>
    </section>
  );
};

const TableContainerDoctor = ({ maxHeight, thead, bgThead, children }) => {
  return (
    <>
      <div
        className="table-responsive table-wrapper"
        style={{
          height: "fit-content",
          maxHeight: `calc(100vh - ${maxHeight})`,
        }}
      >
        <table className="table table-borderless table-striped align-middle">
          <thead className="sticky-top z-0 ">
            <tr>
              {thead?.map((item, index) => (
                <th
                  key={index}
                  className={`fw-semibold text-nowrap ${bgThead} ${
                    item === "Status" && "text-center"
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
