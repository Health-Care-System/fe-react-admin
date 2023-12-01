import Photo from "../../assets/icon/Upload-Image.svg";
import { Button } from "../../components/ui/Button";
import Input from "../../components/ui/Form/Input";
import { Select } from "../../components/ui/Form/Select";
import "./doctor.css";
import useForm from "../../hooks/useForm";
import visibility from "../../assets/icon/visibility.svg";
import {
  validateAddDoctorForm,
  validateExtImage,
} from "../../utils/validation";
import { ErrorMsg } from "../../components/Errors/ErrorMsg";
import client from "../../utils/auth";

export const CreateDoctor = () => {
  const initialState = {
    profile_picture: null,
    fullname: "",
    email: "",
    password: "",
    showPassword: false,
    gender: "",
    specialist: "",
    birthDate: "",
    phoneNumber: "",
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
    birthDate: "",
    phoneNumber: "",
    experience: "",
    alumnus: "",
    no_str: "",
  };

  const { form, setForm, errors, setErrors, handleInput, setLoading, loading } =
    useForm(initialState, initialError);

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

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

  const handleRemovePhoto = () => {
    setForm({
      ...form,
      profile_picture: null,
      tempImage: null,
    });
    setErrors({
      ...errors,
      profile_picture: null,
    });
  };

  const handlePostDoctor = async () => {
    // REQ BODY
    try {
      const data = new FormData();
      data.append("profile_picture", form.profile_picture);
      data.append("price", 700000);
      data.append("fullname", form.fullname);
      data.append("email", form.email);
      data.append("password", form.password);
      data.append("gender", form.gender);
      data.append("specialist", form.specialist);
      // data.append("birthDate", form.birthDate);
      // data.append("phoneNumber", form.phoneNumber);
      data.append("experience", form.experience);
      data.append("alumnus", form.alumnus);
      data.append("no_str", form.no_str);

      if (validateAddDoctorForm(form, setErrors)) {
        try {
          setLoading(true);
          const res = await client.post("/admins/register/doctor", data);
          console.log(res);
        } catch (error) { 
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
              <Button onClick={handleRemovePhoto} className="btn-light">
                Hapus Foto
              </Button>
            </div>
          </div>
        </div>
        <div className="d-grid list-input pt-1">
          <form className="d-grid gap-2">
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-end ">
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
              <ErrorMsg msg={errors.fullname} className={"text-end "} />
            </div>
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-end ">
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
              <ErrorMsg msg={errors.email} className={"text-end "} />
            </div>
            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-end ">
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
              <ErrorMsg msg={errors.password} className={"text-end "} />
            </div>

            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-end ">
                Jenis Kelamin
              </label>
              <div className="d-flex gap-4 col-12 col-lg px-0 px-lg-3 ">
                <div className="d-flex gap-2 ">
                  <Input
                    type="radio"
                    name="gender"
                    value="pria"
                    checked={form.gender === "pria"}
                    onChange={(e) => handleInput(e)}
                  />
                  <label htmlFor="pria">Pria</label>
                </div>
                <div className="d-flex gap-2 ">
                  <Input
                    type="radio"
                    name="gender"
                    value="wanita"
                    checked={form.gender === "wanita"}
                    onChange={(e) => handleInput(e)}
                  />
                  <label htmlFor="wanita">Wanita</label>
                </div>
              </div>

              <ErrorMsg msg={errors.gender} className={"text-end "} />
            </div>

            <div className="row align-items-md-center gap-2 ">
              <label
                htmlFor="specialist"
                className="fw-bold col-12 col-lg-3 text-end px-0  "
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
              <ErrorMsg msg={errors.specialist} className={"text-end "} />
            </div>

            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-end ">
                Tanggal Lahir
              </label>
              <Input
                type="date"
                onChange={(e) => handleInput(e)}
                className="form-control p-3 col-12 col-lg input-styles"
                name="birthDate"
                value={form.birthDate}
              />
              <ErrorMsg msg={errors.birthDate} className={"text-end "} />
            </div>

            {/* <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 px-0 text-end ">
                No Telepon
              </label>
              <Input
                type="text"
                className="form-control p-3 col-12 col-lg input-styles "
                onChange={(e) => handleInput(e)}
                placeholder="Masukkan Nomor Telepon"
                name="phoneNumber"
                value={form.phoneNumber}
              />
              <ErrorMsg msg={error.phoneNumber} className={"text-end "} />
            </div> */}

            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 text-end col-lg-3 px-0 ">
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
              <ErrorMsg msg={errors.experience} className={"text-end "} />
            </div>

            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 col-lg-3 text-end px-0 ">
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
              <ErrorMsg msg={errors.alumnus} className={"text-end "} />
            </div>

            <div className="row align-items-md-center gap-2 ">
              <label className="fw-bold col-12 px-0 text-end col-lg-3 ">
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
              <ErrorMsg msg={errors.no_str} className={"text-end "} />
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
    </section>
  );
};
