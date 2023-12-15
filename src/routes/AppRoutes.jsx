import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/Home/HomePage';
import { Layout } from '../layout';
import { PatientPage } from '../pages/Patient/PatientPage';
import { DoctorPage } from '../pages/Doctor/DoctorPage';
import { LoginPage } from '../pages/Login/LoginPage';
import { CreateDoctor } from '../pages/Doctor/CreateDoctor';
import { DetailDoctor } from '../pages/Doctor/DetailDoctor';
import { EditDoctor } from '../pages/Doctor/EditDoctor';
import { PatientData } from '../pages/Patient/Patient/PatientData';
import { PatientTransaction } from '../pages/Patient/Transaction/PatientTransaction';
import { PrivateRoute } from './PrivateRoute';
import { PatientDetails } from '../pages/Patient/Patient/PatientDetails';
import React from 'react';
import { MedicinePage } from '../pages/Medicine/MedicinePage';

const MemoizedPatientData = React.memo(PatientData)
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<PrivateRoute />}>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/medicines" element={<MedicinePage />} />
        <Route path='/patients' element={<PatientPage />}>
          <Route path="/patients/data" element={<MemoizedPatientData />} />
          <Route path="/patients/transactions" element={<PatientTransaction />} />
        </Route>
        <Route path="/patients/data/:userId" element={<PatientDetails />} />
        <Route path="/doctors" element={<DoctorPage />} />
        <Route path="/doctors/create-doctor" element={<CreateDoctor />} />
        <Route path="/doctors/detail-doctor/:id" element={<DetailDoctor />} />
        <Route path="/doctors/edit-doctor/:id" element={<EditDoctor />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
