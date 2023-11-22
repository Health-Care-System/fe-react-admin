import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/Home/HomePage';
import { Layout } from '../layout';
import { DrugPage } from '../pages/Drug/DrugPage';
import { PatientPage } from '../pages/Patient/PatientPage';
import { DoctorPage } from '../pages/Doctor/DoctorPage';
import { SettingPage } from '../pages/Setting/SettingPage';
import { LoginPage } from '../pages/Login/LoginPage';
import { CreateDoctor } from '../pages/Doctor/CreateDoctor';
import { DetailDoctor } from '../pages/Doctor/DetailDoctor';
import { EditDoctor } from '../pages/Doctor/EditDoctor';
import { PatientData } from '../pages/Patient/Patient/PatientData';
import { PatientTransaction } from '../pages/Patient/Transaction/PatientTransaction';
import { PrivateRoute } from './PrivateRoute';
import { PatientDetails } from '../pages/Patient/Patient/PatientDetails';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<PrivateRoute />}>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/drugs" element={<DrugPage />} />
        <Route path='/patients' element={<PatientPage />}>
          <Route path="/patients/data" element={<PatientData />} />
          <Route path="/patients/transactions" element={<PatientTransaction />} />
        </Route>
        <Route path="/patients/data/:userId" element={<PatientDetails />} />
        <Route path="/doctors" element={<DoctorPage />} />
        <Route path="/doctors/create-doctor" element={<CreateDoctor />} />
        <Route path="/doctors/detail-doctor" element={<DetailDoctor />} />
        <Route path="/doctors/edit-doctor" element={<EditDoctor />} />
        <Route path="/settings" element={<SettingPage />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;