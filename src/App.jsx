import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/Home/HomePage'
import { Layout } from './layout'
import { DrugPage } from './pages/Drug/DrugPage'
import { PatientPage } from './pages/Patient/PatientPage'
import { DoctorPage } from './pages/Doctor/DoctorPage'
import { SettingPage } from './pages/Setting/SettingPage'
import { LoginPage } from './pages/Login/LoginPage'
import { CreatePatient } from './pages/Patient/CreatePatient'
import { EditPatient } from './pages/Patient/EditPatient'
import { DetailPatient } from './pages/Patient/DetailPatient'
import { CreateDoctor } from './pages/Doctor/CreateDoctor'
import { DetailDoctor } from './pages/Doctor/DetailDoctor'
import { EditDoctor } from './pages/Doctor/EditDoctor'


function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/drugs" element={<DrugPage />} />
          <Route path="/patients" element={<PatientPage />} />
            <Route path="/patients/create-patient" element={<CreatePatient/>} />
            <Route path="/patients/edit-patient" element={<EditPatient/>} />
            <Route path="/patients/detail-patient" element={<DetailPatient/>} />
          <Route path="/doctors" element={<DoctorPage />} />
            <Route path="/doctors/create-doctor" element={<CreateDoctor/>} />
            <Route path="/doctors/detail-doctor" element={<DetailDoctor/>} />
            <Route path="/doctors/edit-doctor" element={<EditDoctor/>} />
          <Route path="/settings" element={<SettingPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
