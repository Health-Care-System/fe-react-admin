import { useState } from "react";
import Arrow from "../../assets/icon/arrow-left.svg";
import { Button } from "../../components/ui/Button";
import Input from "../../components/ui/Form/Input";
import "./ForgotPassword.css";
import visibility from "../../assets/icon/visibility.svg";

import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", ""]);
  const navigate = useNavigate();
  const initState = {
    email: "",
    password: "",
    showPassword: false,
  };

  const initError = {
    email: "",
    password: "",
    default: "",
  };

  const { form, setForm } = useForm(initState, initError);

  const numberOfInputs = 4;

  const inputs = Array.from({ length: numberOfInputs }, (_, index) => (
    <Input
      key={index}
      name="otp"
      type="number"
      onChange={(e) => handleOtpChange(index, e.target.value)}
      className="rounded col justify-content-center align-items-center p-2 border border-1 text-center"
    />
  ));

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setForm((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const togglePasswordVisibility = () => {
    setForm((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    alert("Password berhasil diperbarui!");
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const goToLoginPage = () => {
    navigate("/login");
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <section className="container-fluid w-100 ">
            <HeaderForgotPassword goBack={goToLoginPage}/>
            <div className="justify-content-center mx-md-auto content-password ">
              <div className="row justify-content-center align-items-center mt-4 ">
                <ContentForgotPassword
                  title="Masukkan Email disini"
                  paragraf="Masukkan alamat email yang terkait dengan akun Anda"
                />
              </div>
              <div className=" row">
                <label className="text-secondary fs-3 fw-medium col-11 m-0 p-0 py-2">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  onChange={handleInputChange}
                  placeholder="Masukkan email disini"
                  className="rounded col-12 justify-content-center align-items-center p-2 border border-1  "
                />
              </div>
              <div className="row mt-3 ">
                <Button
                  type="submit"
                  className="bg-secondary text-white p-2  rounded-3 justify-content-center align-items-center"
                  onClick={handleEmailSubmit}
                >
                  Lanjutkan
                </Button>
              </div>
            </div>
          </section>
        );
      case 2:
        return (
          <section className="container-fluid w-100 ">
            <HeaderForgotPassword goBack={goToPreviousStep} />
            <div className="justify-content-center mx-md-auto content-password ">
              <ContentForgotPassword
                title="Dapatkan Kode"
                paragraf="Silakan masukkan 4 digit kode yang dikirimkan ke email Anda"
              />
              <div className="row g-1 gap-3">{inputs}</div>
              <p className="fs-3 text-center ">
                jika Anda belum menerima kode {" "}
                <span
                  style={{ cursor: "pointer" }}
                  className="text-primary fw-semibold "
                >
                  Resend
                </span>
              </p>
            </div>
            <div className="row mt-3 ">
              <Button
                type="submit"
                className="bg-primary  text-white p-2 rounded-3 justify-content-center align-items-center"
                onClick={handleOtpSubmit}
              >
                Verifikasi dan Lanjutkan
              </Button>
            </div>
          </section>
        );
      case 3:
        return (
          <section className="container-fluid w-100 ">
            <HeaderForgotPassword goBack={goToPreviousStep} />
            <div className="justify-content-center mx-md-auto content-password ">
              <ContentForgotPassword
                title="Masukkan Password Baru"
                paragraf="kata sandi baru Anda harus berbeda dengan kata sandi yang digunakan sebelumnya"
              />
              <label className="form-label fw-medium">Password</label>
              <div className="input-group">
                <Input
                  type={form.showPassword ? "text" : "password"}
                  className="form-control form-control-lg"
                  name="password"
                  value={form.password}
                  placeholder="Masukkan password"
                  onChange={handleInputChange}
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                >
                  <img
                    src={visibility}
                    alt={form.showPassword ? "hide" : "show"}
                  />
                </span>
              </div>
              <div className="row mt-3 ">
                <Button
                  type="submit"
                  className="bg-primary  text-white p-2 rounded-3 justify-content-center align-items-center"
                  onClick={handleNewPasswordSubmit}
                >
                  Pulihkan Password
                </Button>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return <>{renderStep()}</>;
};

const HeaderForgotPassword = ({ goBack }) => {
  return (
    <div className="px-3 bg-primary row align-items-center">
      <div className="p-3 col-1 d-flex">
        <div className="position-relative col-7">
          <img
            style={{ cursor: "pointer" }}
            src={Arrow}
            alt="Arrow"
            onClick={goBack}
          />
        </div>
      </div>
      <p className="text-center text-white fs-3 fw-medium col m-0 px-3 py-2">
        Lupa Kata Sandi
      </p>
      <div className="p-1 col-1"></div>
    </div>
  );
};

const ContentForgotPassword = ({ title, paragraf }) => {
  return (
    <div className="row justify-content-center align-items-center mt-4 ">
      <label className="text-center fs-3 fw-bold col-8 m-0 px-3 py-2">
        {title}
      </label>
      <p className="text-center text-secondary fs-3 fw-medium col-12 m-0 px-3 py-2">
        {paragraf}
      </p>
    </div>
  );
};
