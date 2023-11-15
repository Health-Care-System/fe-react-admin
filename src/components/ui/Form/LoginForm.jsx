import React from 'react';

export const LoginForm = () => {
  return (
    <form action='#' className="mt-4">
      <div className="mb-3">
        <h3 className="fw-bold text-primary">Portal Admin</h3>
        <p>Kelola informasi kesehatan dengan aman, Silahkan masuk untuk melanjutkan!</p>
      </div>
      <div className="mb-3">
        <label className="form-label fw-medium">Email</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label className="form-label fw-medium">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" />
      </div>
      <div className="d-flex justify-content-between mb-3">
        <div className="form-check p-3 g-col-6">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label"> Ingatkan Saya</label>
        </div>
        <div className="p-2 g-col-6">
          <label className="form-check-label">Lupa Kata Sandi</label>
        </div>
      </div>
      <div className="mb-3 d-flex flex-column gap-3">
        <button className="btn btn-primary btn-lg text-light">Masuk</button>
        <p className="text-center"> or </p>
      </div>
      <div className="mb-3 d-flex flex-column gap-3 ">
        <button className="btn btn-outline-primary fw-medium">Masuk dengan Google </button>
        <button className="btn btn-outline-primary fw-medium">Masuk dengan Facebook</button>
      </div>
    </form>
  );
};
