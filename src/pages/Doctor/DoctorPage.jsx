import { Button } from "../../components/ui/Button";
import add from "../../assets/icon/add.svg";
import { Link, useNavigate } from "react-router-dom";
import { genderFormat, theadDoctorList } from "../../utils/dataObject";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useGetAllDoctorData } from "../../services/doctor-sevices";
import { Column } from "../Patient/components/Column";

export const DoctorPage = () => {
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

  console.log("data", data);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

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
                ifEmpty={"Tidak ada data dokter!"}
                isError={isError}
                isFetch={isFetchingNextPage}
                reffer={ref}
                refetch={refetch}
                isPending={isPending}
                data={data?.pages}
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
                          <img
                            src={data?.profile_picture}
                            alt="avatar doctor"
                            className="object-fit-cover rounded-circle "
                            style={{ width: "1.5rem", height: "1.5rem" }}
                          />
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
