// packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Service/ hooks / utils
import client from "../../utils/auth";
import useForm from "../../hooks/useForm";
import { getOTP, verifyOTP } from "../../services/auth-service";
import { handleResetPasswordError } from "../../utils/response-handler";
import { forgotPasswordEmailValidation, passwordValidation } from "../../utils/validation";

// Components
import Input from "../../components/ui/Form/Input";
import { Button } from "../../components/ui/Button";
import { ErrorMsg } from "../../components/Errors/ErrorMsg";

// Assets
import Arrow from "../../assets/icon/arrow-left.svg";
import visibility from "../../assets/icon/visibility.svg";
import "./ForgotPassword.css";

const initState = {
  email: "",
  password: "",
  confirmPassword: "",
  otp: ['', '', '', ''],
  showPassword: false,
  showPasswordConfirm: false,
  loadingStep1: false,
  loadingStep2: false,
  loadingStep3: false,
};
export const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const initError = {
    email: "",
    password: "",
    confirmPassword: "",
    otpError: "",
    default: "",
  };

  const { form, handleInput, handleChange, setErrors, errors } = useForm(initState, initError);
  const [isOTPEmpty, setIsOTPEmpty] = useState(true);

  // Step 1: get otp by email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (forgotPasswordEmailValidation(form, setErrors)) {
      getOTP(form, setStep, handleChange)
    }
  };

  // Step 2: record otp input & verify OTP validation
  const handleOtpChange = (index, value) => {
    const updatedOtp = [...form.otp];
    updatedOtp[index] = value;

    handleChange('otp', updatedOtp);

    const isAllFilled = updatedOtp.every((digit) => digit !== '');
    if (isAllFilled) {
      setIsOTPEmpty(false);
    } else {
      setIsOTPEmpty(true);
    }
  };
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    verifyOTP(form, handleChange, setStep, setErrors)
  };

  // Step 3: regiester new password
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (passwordValidation(form, setErrors)) {
      createNewPassword(form)
    }
  }
  const createNewPassword = async () => {
    handleChange('loadingStep3', true)
    try {
      const body = {
        email: form.email,
        otp: form.otp.join(''),
        password: form.password,
      };

      const res = await client.post('/admins/change-password', body);
      if (res?.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      handleResetPasswordError(error)
    } finally {
      handleChange('loadingStep3', false)
    }
  };


  const togglePasswordVisibility = () => {
    handleChange('showPassword', !form.showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    handleChange('showPasswordConfirm', !form.showPasswordConfirm);
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
          <section className="container-fluid w-100 bg-light">
            <HeaderForgotPassword goBack={goToLoginPage} />
            <div className="justify-content-center mx-auto content-password ">
              <div className="d-flex justify-content-center align-items-center mt-4 ">
                <ContentForgotPassword
                  title="Masukkan Email disini"
                  paragraf="Masukkan alamat email yang terkait dengan akun Anda"
                />
              </div>
              <div>
                <label className="text-secondary fs-3 fw-medium col-11 m-0 p-0 py-2">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  onChange={handleInput}
                  placeholder="Masukkan email disini"
                  className="rounded col-12 justify-content-center align-items-center p-2 border border-1  "
                />
                {errors.email &&
                  <ErrorMsg msg={errors.email} />
                }
              </div>
              <div className="d-flex mt-3 w-100">
                <Button
                  disabled={!form.email || form.loadingStep1}
                  type="submit"
                  className="btn-primary text-white w-100"
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
          <section className="container-fluid bg-light">
            <HeaderForgotPassword goBack={goToPreviousStep} />
            <div className="justify-content-center mx-md-auto content-password ">
              <ContentForgotPassword
                title="Dapatkan Kode"
                paragraf="Silakan masukkan 4 digit kode yang dikirimkan ke email Anda"
              />
              <div className="d-flex flex-row">
                {form.otp.map((digit, index) => (
                  <input
                    key={index}
                    className="form-control-lg bg-white shadow-sm border-0 form-color w-25 m-2 text-center"
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
              {errors.otpError &&
                <ErrorMsg msg={errors.otpError} />
              }
              <p className="fs-3 text-center ">
                jika Anda belum menerima kode{" "}
                <span
                  onClick={handleEmailSubmit}
                  style={{ cursor: "pointer" }}
                  className="text-primary fw-semibold "
                >
                  Resend
                </span>
              </p>
              <div className="row mt-3 ">
                <Button
                  disabled={isOTPEmpty || form.loadingStep2}
                  type="submit"
                  className="bg-primary  text-white p-2 rounded-3 justify-content-center align-items-center"
                  onClick={handleOtpSubmit}
                >
                  Verifikasi dan Lanjutkan
                </Button>
              </div>
            </div>
          </section>
        );
      case 3:
        return (
          <section className="container-fluid w-100 ">
            <HeaderForgotPassword goBack={goToPreviousStep} />
            <div className="justify-content-center mx-auto content-password ">
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
                  onChange={handleInput}
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
                {errors.password &&
                  <ErrorMsg msg={errors.password} />
                }
              </div>
              <label className="form-label fw-medium">Konfirmasi Password</label>
              <div className="input-group">
                <Input
                  type={form.showPasswordConfirm ? "text" : "password"}
                  className="form-control form-control-lg"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  placeholder="Masukkan password"
                  onChange={handleInput}
                />
                <span
                  className="input-group-text"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <img
                    src={visibility}
                    alt={form.showPasswordConfirm ? "hide" : "show"}
                  />
                </span>
                {errors.confirmPassword &&
                  <ErrorMsg msg={errors.confirmPassword} />
                }
              </div>
              <div className="mt-3 w-100">
                <Button
                  disabled={form.loadingStep3}
                  type="button"
                  className="btn-primary w-100 text-white"
                  onClick={handleResetPassword}
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
