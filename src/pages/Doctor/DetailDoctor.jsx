import { Link, useLocation, useNavigate } from "react-router-dom";
import backIcon from "../../assets/icon/arrow-right.svg";
import PhotoAvatar from "../../assets/icon/Photo.svg";
import { Button } from "../../components/ui/Button";
import "./doctor.css";
import { handleDeleteDoctor } from "../../services/doctor-sevices";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Transparent } from "../../components/ui/Container";
import { CustomModal } from "../../components/ui/Modal/Modal";

export const DetailDoctor = () => {
  const location = useLocation();
  const { data } = location.state;
  const handlePrevPage = () => {
    window.history.back();
  };
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = async (id) => {
    handleDeleteDoctor(id, setLoading, queryClient, setModalDelete);
    navigate('/doctors')
  };

  return (
    <section className="container-fluid detail-container">
      <div className="d-flex flex-column mt-3 gap-3 ">
        <div className="d-flex flex-row align-items-center gap-3 ">
          <img
            src={backIcon}
            alt="backIcon"
            onClick={handlePrevPage}
            style={{ cursor: "pointer" }}
          />
          <h3 className="fw-bold fs-2 mb-0 ">Detail Dokter</h3>
        </div>
        <div className="d-flex flex-column flex-lg-row gap-lg-3 gap-xl-5 justify-content-xl-center mx-xl-5  ">
          <img
            src={data.profile_picture ? data.profile_picture : PhotoAvatar}
            alt="photo avatar"
            className="rounded-2 object-fit-cover "
            style={{
              maxWidth: "13.75rem",
              maxHeight: "16.625rem",
              width: "13.75rem",
              height: "16.625rem",
            }}
          />
          <div className="mt-2 mt-lg-0 w-100 ">
            <table className="table ">
              <tbody>
                <tr>
                  <th className="pb-xl-4 px-xl-4 ">Nama</th>
                  <td className="pb-xl-4 px-xl-4 ">{data.fullname}</td>
                </tr>
                <tr>
                  <th className="p-xl-4">Jenis Kelamin</th>
                  <td className="p-xl-4">{data.gender}</td>
                </tr>
                <tr>
                  <th className="p-xl-4">Email</th>
                  <td className="p-xl-4">{data.email}</td>
                </tr>
                <tr>
                  <th className="p-xl-4">Biaya</th>
                  <td className="p-xl-4">{data.price}</td>
                </tr>
                <tr>
                  <th className="p-xl-4">Spesialis</th>
                  <td className="p-xl-4">{data.specialist}</td>
                </tr>
                <tr>
                  <th className="p-xl-4">Pengalaman</th>
                  <td className="p-xl-4">{data.experience}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center gap-3  ">
          <Link to={`/doctors/edit-doctor/${data.id}`} state={data}>
            <Button className="btn-primary border-2 border-primary text-white fw-semibold px-4 ">
              Edit
            </Button>
          </Link>
          <Button
            onClick={() => setModalDelete(true)}
            className="btn-trasparent border-2 border-primary text-primary fw-semibold px-3 "
          >
            Hapus
          </Button>
        </div>
      </div>
      {modalDelete && (
      <Transparent
        disabled={true}
        className="min-vw-100 position-fixed end-0"
      >
        <CustomModal
          disabled={loading}
          title={"Hapus Dokter?"}
          content={
            "Apabila anda menghapus dokter, maka dokter akan terhapus dari daftar list dokter."
          }
          confirmAction={() => handleDelete(data.id)}
          cancelAction={() => setModalDelete(false)}
        />
      </Transparent>
    )}
    </section>
    
  );
};
