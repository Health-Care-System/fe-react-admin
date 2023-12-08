import Photo from "../../assets/icon/Upload-Image.svg";
import { Button } from "../../components/ui/Button";
import Input from "../../components/ui/Form/Input";
import { Select } from "../../components/ui/Form/Select";
import "./doctor.css";
import useForm from "../../hooks/useForm";
import { validateExtImage } from "../../utils/validation";
import { ErrorMsg } from "../../components/Errors/ErrorMsg";
import { CustomModal } from "../../components/ui/Modal/Modal";
import { Transparent } from "../../components/ui/Container";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { handlePutDoctor } from "../../services/doctor-sevices";

export const EditDoctor = () => {
  // Distract const dari data useLocation
  const { state } = useLocation();
  const idDoctor = state.id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  console.log(state);
  console.log(idDoctor);

  const [modalDelete, setModalDelete] = useState(false);

  const handleDeletePhoto = () => {
    if (!form.tempImage) {
      toast.error("Belum ada foto yang diinputkan", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
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

  const initialState = {
    profile_picture: state.profile_picture,
    fullname: state.fullname,
    email: state.email,
    gender: state.gender,
    specialist: state.specialist,
    price: state.price,
    experience: state.experience,
    alumnus: state.alumnus,
    no_str: state.no_str,
  };

  const initialError = {
    profile_picture: null,
    fullname: "",
    email: "",
    gender: "",
    specialist: "",
    price: "",
    experience: "",
    alumnus: "",
    no_str: "",
  };

  const { form, setForm, errors, setErrors, handleInput, setLoading, loading } =
    useForm(initialState, initialError);

    const options = [
      { value: "Umum", label: "Dokter Umum" },
      { value: "Anak", label: "Spesialis Anak" },
      { value: "Kulit", label: "Dokter Kulit" },
      { value: "Psikolog", label: "Psikolog Klinis" },
      { value: "Jantung", label: "Dokter Jantung" },
      { value: "Gigi", label: "Dokter Gigi" },
      { value: "Mata", label: "Dokter Mata" },
      { value: "Bedah", label: "Spesialis Bedah" },
    ];

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

  const handlePut = async () => {
    const res = await handlePutDoctor(form, idDoctor, setErrors, setLoading);
    console.log(res);
    if (res) {
      navigate("/doctors");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success("Dokter berhasil diedit!", {
        delay: 800,
      });
    } else {
      toast.error("Dokter gagal diedit!", {
        delay: 800,
      });
    }
  };

  return (
    <section className="container-fluid ">
      <div className="my-3 d-flex flex-column flex-lg-row align-items-center align-items-lg-start justify-content-lg-center gap-3  ">
        <div className="d-flex flex-column align-items-start gap-3 mb-3 ">
          <div>
            {form.photo_profile ? (
              <div className="rounded mb-3 ">
                <img
                  src={form.tempImage || form.photo_profile}
                  alt="photo"
                  className="rounded-4 "
                  style={{ maxHeight: "13.75rem", maxWidth: "16.125rem" }}
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
              <Button onClick={handleDeletePhoto} className="btn-light">
                Hapus Foto
              </Button>
            </div>
          </div>
        </div>
        <div className="d-grid list-input pt-1">
          <form className="d-grid gap-2">
            {/* Fullname */}
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-md-end ">
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
            {/* Gender */}
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-md-end ">
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
                    defaultChecked={form.gender === "male"}
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
                    defaultChecked={form.gender === "female"}
                  />
                  <label htmlFor="female">Wanita</label>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 offset-lg-3 ">
              <ErrorMsg msg={errors.gender} />
            </div>
            {/* Email */}
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-md-end ">
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
            {/* Biaya */}
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-md-end ">
                Biaya
              </label>
              <Input
                type="number"
                className="form-control p-3 col-12 col-lg input-styles "
                onChange={(e) => handleInput(e)}
                placeholder="Biaya"
                name="price"
                value={form.price}
              />
            </div>
            <div className="col-12 col-lg-8 offset-lg-3 ">
              <ErrorMsg msg={errors.price} />
            </div>
            {/* Specialist */}
            <div className="row align-items-md-center gap-2 ">
              <label
                htmlFor="specialist"
                className="fw-bold col-12 col-lg-3 px-0 text-md-end  "
              >
                Spesialis
              </label>
              <Select
                options={options}
                className="p-3 col-12 col-lg input-styles"
                handleChange={(e) => handleInput(e)}
                name="specialist"
                value={form.specialist}
              />
            </div>
            <div className="col-12 col-lg-8 offset-lg-3 ">
              <ErrorMsg msg={errors.specialist} />
            </div>
            {/* Experience */}
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-md-end ">
                Pengalaman
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
            {/* Alumuns */}
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-md-end ">
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
            {/* STR Number */}
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 px-0 col-lg-3 text-md-end ">
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
      <div className="d-flex justify-content-center align-items-center gap-5 my-3 ">
        <Button
          className="bg-transparent border-3 border-primary text-primary fw-semibold "
          disabled={loading}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
          ) : (
            "Batal"
          )}
        </Button>
        <Button
          className="bg-primary border-3 text-white "
          type="submit"
          onClick={handlePut}
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
