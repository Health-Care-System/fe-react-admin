import React from 'react';
import { LoginForm } from '../../components/ui/Form/LoginForm';
import Banner from '../../assets/image/banner.png'; 
import Logo from '../../assets/image/logo.png';// Update the path to your image

export const LoginPage = () => {
  return (
    <div className="container-fluid" style={{ backgroundColor: '#F8F8F8' }}>
      <div className="row">
        <div className="col-md-5 col-lg-7 ">
          <img src={Banner} alt="Banner" className="img-fluid" />
        </div>
        <div className="col-md-5 col-lg-5">
          <div className=" mt-3 d-flex justify-content-center">
          <img src={Logo} alt="Logo" className="img-fluid"></img>
          </div>
          <div>
          <LoginForm />
          </div>
       
        </div>
      </div>
    </div>
  );
};
