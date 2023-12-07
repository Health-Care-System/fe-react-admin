import { Link, useLocation } from "react-router-dom";
import backIcon from "../../assets/icon/arrow-right.svg";
import PhotoAvatar from "../../assets/icon/Photo.svg";
import { Button } from "../../components/ui/Button";
import "./doctor.css";

export const DetailDoctor = () => {
  const location = useLocation();
  const { data } = location.state;

  return (
    <section className="container-fluid detail-container">
      <div className="d-flex flex-column mt-3 gap-3 ">
        <div className="d-flex flex-row align-items-center gap-3 ">
          <img src={backIcon} alt="backIcon" />
          <h3 className="fw-bold fs-2 mb-0 ">Detail Dokter</h3>
        </div>
        <div className="d-flex flex-column ">
          <img
            src={data.profile_picture || PhotoAvatar}
            alt="photo avatar"
            className="rounded-2 object-fit-cover "
            style={{ maxWidth: "13.75rem", maxHeight: "16.625rem" }}
          />
          <div className="mt-2">
            <table className="table ">
              <tbody>
                <tr>
                  <th>Nama</th>
                  <td>{data.fullname}</td>
                </tr>
                <tr>
                  <th>Jenis Kelamin</th>
                  <td>{data.gender}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{data.email}</td>
                </tr>
                <tr>
                  <th>Biaya</th>
                  <td>{data.price}</td>
                </tr>
                <tr>
                  <th>Spesialis</th>
                  <td>{data.specialist}</td>
                </tr>
                <tr>
                  <th>Pengalaman</th>
                  <td>{data.experience}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-center align-items-center gap-3 ">
          <Link
            to={`/doctors/edit-doctor/${data.id}`}
            state={data}
          >
            <Button className="btn-primary border-2 border-primary text-white fw-semibold px-4 ">
              Edit
            </Button>
          </Link>
          <Button className="btn-trasparent border-2 border-primary text-primary fw-semibold px-3 ">
            Hapus
          </Button>
        </div>
      </div>
    </section>
  );
};
