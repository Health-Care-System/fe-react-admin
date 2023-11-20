// LoginForm.jsx

import { useState } from 'react';
import { Button } from '../Button';
import { Input } from './Input';

export const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Data yang dikirim:', formData);
    // fetch('url_backend', {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(response => {
    //   // Handle response
    // }).catch(error => {
    //   // Handle error
    // });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form action="#" className="mt-4" onSubmit={handleSubmit}>
      <div className="mb-3">
        <h3 className="fw-bold text-primary">Portal Admin</h3>
        <p>Kelola informasi kesehatan dengan aman, Silahkan masuk untuk melanjutkan!</p>
      </div>

      <div className="mb-3">
        <label className="form-label fw-medium" htmlFor="email">Email</label>
        <Input
          type="email"
          className="form-control"
          name="email"
          placeholder="Masukkan Email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-medium" htmlFor="password">Password</label>
        <Input
          type="password"
          className="form-control"
          name="password"
          placeholder="Masukkan Password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="form-check ms-2 p-3 g-col-6">
          <input
            type="checkbox"
            className="form-check-input"
            name="rememberMe"
          />
          <label htmlFor="rememberMe" className="form-check-label">Ingatkan Saya</label>
        </div>
        <div className="p-2 g-col-6">
          <a href="#" className="form-check-label text-black">Lupa Kata Sandi</a>
        </div>
      </div>

      <div className="mb-3 d-flex flex-column gap-3">
        <Button type="submit" className="btn btn-primary btn-lg text-light">
          Masuk
        </Button>
        <p className="text-center divider"> or </p>
      </div>
      <div className="mb-3 d-flex flex-column gap-3 ">
        <Button className="btn-outline-primary fw-medium">Masuk dengan Google</Button>
        <Button className="btn-outline-primary fw-medium">Masuk dengan Facebook</Button>
      </div>
    </form>
  );
};
