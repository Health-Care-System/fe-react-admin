import React, { useState } from 'react';
import { Button } from '../Button';
import Input from './Input'; 
import lock from '../../../assets/icon/lock.svg';
import visibility from '../../../assets/icon/visibility.svg';

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data:', formData);
   //login untuk submit form data
  };

  return (
    <form action="#" className="mt-4" onSubmit={handleSubmit}>
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
      </div>
      <div className="d-flex justify-content-between mb-3">
        <div className="form-check p-3 g-col-6">
        </div>
        <div className="p-2 g-col-6">
          <img src={lock} alt="lock" />
          <label className="form-check-label">Lupa Kata Sandi</label>
        </div>
      </div>
      <div className="mb-3 d-flex flex-column gap-3">
        <Button type="submit" className="btn btn-primary btn-lg text-light">
          Masuk
        </Button>
      </div>
    </form>
  );
};
