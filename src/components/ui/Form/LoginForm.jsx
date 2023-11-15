import { Link } from "react-router-dom";
import { Button } from "../Button";
import { Input } from "./Input";

export const LoginForm = () => {
  return (
    <form action='#' className="mt-4">
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
          placeHolder={'Masukkan Email'}
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-medium" htmlFor="password">Password</label>
        <Input 
          type="password" 
          className="form-control" 
          name="password"
          placeHolder={'Masukkan Password'}
        />
      </div>
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="form-check ms-2 p-3 g-col-6">
          <input 
            type="checkbox" 
            className="form-check-input" 
            name="rememberMe" />
          <label htmlFor="rememberMe" className="form-check-label">Ingatkan Saya</label>
        </div>
        <div className="p-2 g-col-6">
          <Link className="form-check-label text-black">Lupa Kata Sandi</Link>
        </div>
      </div>
      
      <div className="mb-3 d-flex flex-column gap-3">
        <Button className="btn btn-primary btn-lg text-light ">Masuk</Button>
        <p className="text-center divider"> or </p>
      </div>
      <div className="mb-3 d-flex flex-column gap-3 ">
        <Button className="btn-outline-primary fw-medium">Masuk dengan Google </Button>
        <Button className="btn-outline-primary fw-medium">Masuk dengan Facebook</Button>
      </div>
    </form>
  );
};
