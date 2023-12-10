// Packages
import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

// Utils & services
import client from "../../utils/auth";
import useForm from "../../hooks/useForm";
import { optionsDoctorSpesialist } from "../../utils/dataObject";
import { handleRegisterDoctorError } from "../../utils/response-handler";
import {
  validateAddDoctorForm,
  validateExtImage,
} from "../../utils/validation";

// Components
import Input from "../../components/ui/Form/Input";
import { Button } from "../../components/ui/Button";
import { Select } from "../../components/ui/Form/Select";
import { Transparent } from "../../components/ui/Container";
import { ErrorMsg } from "../../components/Errors/ErrorMsg";
import { CustomModal } from "../../components/ui/Modal/Modal";

// Assets
import Photo from "../../assets/icon/Upload-Image.svg";
import visibility from "../../assets/icon/visibility.svg";
import "./doctor.css";
import { prepareDoctorData } from "../../services/doctor-sevices";

export const CreateDoctor = () => {
  const navigate = useNavigate()
  const [modalDelete, setModalDelete] = useState(false);

  const initialState = {
    profile_picture: null,
    fullname: "",
    email: "",
    password: "",
    showPassword: false,
    gender: "",
    specialist: "",
    price: "",
    experience: "",
    alumnus: "",
    no_str: "",
  };

  const initialError = {
    profile_picture: null,
    fullname: "",
    email: "",
    password: "",
    showPassword: false,
    gender: "",
    specialist: "",
    price: "",
    experience: "",
    alumnus: "",
    no_str: "",
    default: ""
  };

  const {
    form,
    setForm,
    errors,
    setErrors,
    handleInput,
    setLoading,
    loading } = useForm(initialState, initialError);



  const togglePasswordVisibility = () => {
    setForm((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!validateExtImage(file)) {
        setErrors({
          ...errors,
          profile_picture:
            "Hanya file dengan ekstensi .jpg, .jpeg, dan .png yang diperbolehkan.",
        });
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataURL = e.target.result;
          setForm({
            ...form,
            profile_picture: file,
            tempImage: dataURL,
          });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm({
        ...form,
        profile_picture: null,
        tempImage: null,
      });
      setErrors({
        ...errors,
        profile_picture: null,
      });
    }
  };


  const handlePostDoctor = async () => {
    const data = prepareDoctorData(form);
    if (validateAddDoctorForm(form, setErrors)) {
      try {
        setLoading(true);
        const res = await client.post("/admins/doctors/register", data);
        if (res?.status === 201 || res?.status === 200) {
          navigate('/doctors')
          toast.success("Data dokter berhasil ditambahkan", {
            delay: 800,
          });
        }

      } catch (error) {
        handleRegisterDoctorError(error, setErrors)
        toast.error("Data dokter gagal ditambahkan", {
          delay: 800,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeletePhoto = () => {
    if (!form.tempImage) {
      toast.error('Belum ada foto yang diinputkan', {
        delay: 800,
      });
      return;
    }
    setModalDelete(true);
  };

  const handleDelete = () => {
    setForm({
      ...form,
      profile_picture: null,
      tempImage: null,
    });
    setErrors({
      ...errors,
      profile_picture: null,
    });

    setModalDelete(false);
  };

  return (
    <section className="container-fluid ">
      <div className="my-3 d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-lg-center gap-3  ">
        <div className="d-flex flex-column align-items-start gap-3 mb-3 ">
          <div>
            {form.tempImage ? (
              <div className="rounded mb-3 ">
                <img
                  src={form.tempImage}
                  alt="photo"
                  className="rounded-4 object-fit-cover "
                  style={{ maxHeight: "13.75rem", maxWidth: "16.125rem", height: "13.75rem", width: "16.125rem" }}
                />
              </div>
            ) : (
              <>
                <div
                  className="rounded bg-secondary-subtle mb-3 mx-auto "
                  style={{
                    padding: "3.1875rem 2rem",
                    maxHeight: "16.125rem",
                    maxWidth: "13.75rem",
                  }}
                >
                  <img
                    src={Photo}
                    alt="photo"
                    style={{ maxHeight: "9.75rem", maxWidth: "9.75rem" }}
                  />
                </div>
              </>
            )}
            <ErrorMsg msg={errors.profile_picture} />
            <div className="btn-group-vertical float-end">
              <label htmlFor="upload-photo" className="btn btn-light">
                Unggah Foto
              </label>
              <input
                type="file"
                id="upload-photo"
                accept="image/*"
                onChange={(e) => handleFileInputChange(e)}
                style={{ display: "none" }}
              />
              <Button
                onClick={handleDeletePhoto}
                className="btn-light"
              >
                Hapus Foto
              </Button>
            </div>
          </div>
        </div>
        <div className="d-grid list-input pt-1">
          <form className="d-grid gap-2">
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-lg-end ">
                Nama
              </label>
              <Input
                className="form-control input-styles p-3 col-12 col-lg"
                placeholder="Masukkan Nama"
                type="text"
                name="fullname"
                value={form.fullname}
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="col-12 col-lg-8 offset-lg-3 ">
              <ErrorMsg msg={errors.fullname} />
            </div>
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-lg-end ">
                Email
              </label>
              <Input
                className="form-control input-styles p-3 col-12 col-lg "
                placeholder="Masukkan Email"
                type="text"
                name="email"
                value={form.email}
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="col-12 col-lg-8 offset-lg-3 ">
              <ErrorMsg msg={errors.email} />
            </div>
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-lg-end ">
                Password
              </label>
              <div className="input-group col-12 col-lg p-0 ">
                <Input
                  className="form-control input-styles p-3 "
                  placeholder="Masukkan Password"
                  onChange={(e) => handleInput(e)}
                  type={form.showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                />
                <span
                  className="input-group-text cursor-pointer border-0 input-styles"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={visibility}
                    alt={form.showPassword ? "hide" : "show"}
                  />
                </span>
              </div>
            </div>
            <div className="col-12 col-lg-8 offset-lg-3 ">
              <ErrorMsg msg={errors.password} />
            </div>
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-lg-end ">
                Jenis Kelamin
              </label>
              <div className="d-flex gap-4 col-12 col-lg px-0 px-lg-3 ">
                <div className="d-flex gap-2 ">
                  <Input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === "male"}
                    onChange={(e) => handleInput(e)}
                  />
                  <label htmlFor="male">Pria</label>
                </div>
                <div className="d-flex gap-2 ">
                  <Input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === "female"}
                    onChange={(e) => handleInput(e)}
                  />
                  <label htmlFor="female">Wanita</label>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 offset-lg-3 ">
              <ErrorMsg msg={errors.gender} />
            </div>
            <div className="row align-items-md-center gap-2 ">
              <label
                htmlFor="specialist"
                className="fw-bold col-12 col-lg-3 text-lg-end px-0  "
              >
                Spesialis
              </label>
              <Select
                options={optionsDoctorSpesialist}
                className="p-3 col-12 col-lg input-styles"
                handleChange={(e) => handleInput(e)}
                name="specialist"
                value={form.specialist}
              />
            </div>
            <div className="col-12 col-lg-8 offset-lg-3 ">
              <ErrorMsg msg={errors.specialist} />
            </div>
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-lg-end ">
                Harga Konsultasi
              </label>
              <Input
                type="number"
                className="form-control p-3 col-12 col-lg input-styles "
                onChange={(e) => handleInput(e)}
                placeholder="Harga Konsultasi Dokter"
                name="price"
                value={form.price}
              />
            </div>
            <div className="col-12 col-lg-8 offset-lg-3 ">
              <ErrorMsg msg={errors.price} />
            </div>
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 text-lg-end col-lg-3 px-0 ">
                Pengalaman Kerja
              </label>
              <Input
                type="text"
                onChange={(e) => handleInput(e)}
                className="form-control p-3 col-12 col-lg input-styles "
                placeholder="Tahun Pengalaman Praktik"
                name="experience"
                value={form.experience}
              />
            </div>
            <div className="col-12 col-lg-8 offset-lg-3 ">
              <ErrorMsg msg={errors.experience} />
            </div>
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 text-lg-end px-0 ">
                Alumnus
              </label>
              <Input
                type="text"
                className="form-control p-3 col-12 col-lg input-styles "
                onChange={(e) => handleInput(e)}
                placeholder="Riwayat Pendidikan"
                name="alumnus"
                value={form.alumnus}
              />
            </div>
            <div className="col-12 col-lg-8 offset-lg-3 ">
              <ErrorMsg msg={errors.alumnus} />
            </div>
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 px-0 text-lg-end col-lg-3 ">
                Nomor STR
              </label>
              <Input
                type="number"
                className="form-control p-3 col-12 col-lg input-styles "
                onChange={(e) => handleInput(e)}
                placeholder="Spesialis"
                name="no_str"
                value={form.no_str}
              />
            </div>
            <div className="col-12 col-lg-8 offset-lg-3 ">
              <ErrorMsg msg={errors.no_str} />
            </div>
          </form>
        </div>
      </div>
      <ErrorMsg msg={errors.default} />
      <div className="d-flex justify-content-center align-items-center gap-3 my-3 ">
        <Link
          to={'/doctors'}
          className="btn btn-outline-primary border-2 fw-semibold "
          disabled={loading}
          style={{ minWidth: '5.375rem'}}
        >
          Batal
        </Link>
        <Button
          className="bg-primary text-white fw-semibold"
          type="submit"
          style={{ minWidth: '5.375rem'}}
          onClick={handlePostDoctor}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
          ) : (
            "Simpan"
          )}
        </Button>
      </div>

      {form.tempImage && modalDelete && (
        <Transparent
          disabled={true}
          className="min-vw-100 position-fixed end-0"
        >
          <CustomModal
            disabled={loading}
            title={"Hapus Foto?"}
            content={"Apabila anda menghapus Foto, maka foto akan terhapus"}
            confirmAction={() => handleDelete()}
            cancelAction={() => setModalDelete(false)}
          />
        </Transparent>
      )}
    </section>
  );
};
