import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/Home/HomePage'
import { Layout } from './layout'
import { DrugPage } from './pages/Drug/DrugPage'
import { PatientPage } from './pages/Patient/PatientPage'
import { DoctorPage } from './pages/Doctor/DoctorPage'
import { SettingPage } from './pages/Setting/SettingPage'
import { LoginPage } from './pages/Login/LoginPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/drug" element={<DrugPage />} />
          <Route path="/patients" element={<PatientPage />} />
          <Route path="/doctors" element={<DoctorPage />} />
          <Route path="/settings" element={<SettingPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
