import { Link, useLocation, useNavigate } from "react-router-dom";
import backIcon from "../../assets/icon/arrow-right.svg";
import PhotoAvatar from "../../assets/icon/Photo.svg";
import { Button } from "../../components/ui/Button";
import "./doctor.css";
import { toast } from "react-toastify";
import client from "../../utils/auth";
import { useState } from "react";
import { Transparent } from "../../components/ui/Container";
import { CustomModal } from "../../components/ui/Modal/Modal";


export const DetailDoctor = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [modalDelete, setModalDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data } = location.state;

    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await client.delete(`/admins/doctor/${data.id}`);
            if (res?.status === 200) {
                navigate('/doctors')
                toast.success('Anda berhasil menghapus pasien!', {
                    delay: 800
                });
            } else {
                throw new Error('Gagal menghapus data pasien!');
            }
        } catch (error) {
            toast.error(error?.response?.data?.meta?.message, {
                delay: 800
            });
        } finally {
            setModalDelete(false);
            setLoading(false);
        }
    }

    return (
        <section className="container-fluid detail-container">
            <div className="d-flex flex-column mt-3 gap-3 ">
                <div className="d-flex flex-row align-items-center gap-3 ">
                    <Link className='nav-link active p-0 text-body-secondary' to={"/doctors"} >
                        <img src={backIcon} alt="Bootstrap" width={30} height={30} className="img-fluid" />
                    </Link>
                    <h3 className="fs-2 mb-0 fw-semibold" style={{ fontWeight: 700}}>Detail Dokter</h3>
                </div>
                <div className="d-flex flex-row flex-wrap gap-3 align-items-start custom-margin-left">
                    <img
                        src={data.profile_picture || PhotoAvatar}
                        alt="photo avatar"
                        className="rounded-2 object-fit-cover "
                        style={{ maxWidth: "13.75rem", maxHeight: "16.625rem" }}
                    />

                    <div className=" custom-margin-table" >
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th className="header-cell">Nama</th>
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
                                <tr>
                                    <th>Alumnus</th>
                                    <td>{data.alumnus}</td>
                                </tr>
                                <tr>
                                    <th>No STR</th>
                                    <td>{data.no_str}</td>
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
                    <Button className="btn-trasparent border-2 border-primary text-primary fw-semibold px-3 " onClick={() => setModalDelete(true)}>
                        Hapus
                    </Button>
                </div>
            </div>

            {modalDelete &&
                <Transparent
                    disabled={true}
                    className='min-vw-100 start-0 position-fixed end-0'
                >
                    <CustomModal
                        disabled={loading}
                        title={'Hapus Dokter?'}
                        content={'Apabila anda menghapus Dokter, maka data Dokter akan hilang'}
                        confirmAction={handleDelete}
                        cancelAction={() => setModalDelete(false)}
                    />
                </Transparent>
            }
        </section>
    );
};
