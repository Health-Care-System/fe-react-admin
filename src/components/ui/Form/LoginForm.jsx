import { useState } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import {
  handleLoginError,
  validateFormLogin
} from '../../../services/login-service';
import lock from '../../../assets/icon/lock.svg';
import visibility from '../../../assets/icon/visibility.svg';
import client from '../../../utils/auth';
import Input from './Input';
import { Button } from '../Button';
import { ErrorMsg } from '../../Errors/ErrorMsg';


export const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    default: '',
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFormLogin(formData, setErrors)) {
      try {
        setLoading(true);
        const res = await client.post('/admins/login', formData);
        if (res.status === 200) {
          const { token } = res.data.results;
          Cookies.set('token', token);
          navigate('/')
        } 
      } catch (error) {
        handleLoginError(error, setErrors);
      } finally {
        setLoading(false);
        setFormData({
          email: '',
          password: '',
        })
      }
    }
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="mb-3">
        <h3 className="fw-bold text-primary">Portal Admin</h3>
        <p>Kelola informasi kesehatan dengan aman, Silahkan masuk untuk melanjutkan!</p>
      </div>
      <div className="mb-3">
        <label className="form-label fw-medium">Email</label>
        <Input
          type="email"
          className="form-control form-control-lg"
          name="email"
          value={formData.email}
          placeholder="Masukkan email"
          onChange={handleInputChange}
        />
        <ErrorMsg msg={errors.email} />
      </div>
      <div className="mb-3">
        <label className="form-label fw-medium">Password</label>
        <div className="input-group">
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control form-control-lg"
            name="password"
            value={formData.password}
            placeholder="Masukkan password"
            onChange={handleInputChange}
          />
          <span className="input-group-text" onClick={togglePasswordVisibility}>
            <img src={visibility} alt={showPassword ? 'hide' : 'show'} />
          </span>
        </div>
        <ErrorMsg msg={errors.password} />
      </div>
      <div className="d-flex justify-content-between mb-3">
        <div className="form-check p-3 g-col-6">
        </div>
        <div className="p-2 g-col-6">
          <img src={lock} alt="lock" />
          <label className="form-check-label">Lupa Kata Sandi</label>
        </div>
      </div>
      <div className="d-flex flex-column gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="btn-primary btn-lg text-light">
          {loading
            ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            : 'Masuk'
          }
        </Button>
        <ErrorMsg msg={errors.default} />
      </div>
    </form>
  );
};
