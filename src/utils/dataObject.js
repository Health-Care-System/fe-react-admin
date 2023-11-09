// Icon Default
import dasboardIcon from '../assets/icon/dashboard.svg'
import medicineIcon from '../assets/icon/medicine.svg'
import patientIcon from '../assets/icon/patient.svg'
import doctorIcon from '../assets/icon/doctor.svg'
import settingIcon from '../assets/icon/settings.svg'

// Icon White
import dasboardIconWhite from '../assets/icon/dashboardWhite.svg'
import medicineIconWhite from '../assets/icon/medicineWhite.svg'
import patientIconWhite from '../assets/icon/patientWhite.svg'
import doctorIconWhite from '../assets/icon/doctorWhite.svg'
import settingIconWhite from '../assets/icon/settingsWhite.svg'

export const menus = [
  {
    icon: dasboardIcon,
    icon2: dasboardIconWhite,
    label: 'Dashboard',
    link: '/'
  },
  {
    icon: medicineIcon,
    icon2: medicineIconWhite,
    label: 'Obat - obatan',
    link: '/drug'
  },
  {
    icon: patientIcon,
    icon2: patientIconWhite,
    label: 'Pasien',
    link: '/patients'
  },
  {
    icon: doctorIcon,
    icon2: doctorIconWhite,
    label: 'Dokter',
    link: '/doctors'
  },
  {
    icon: settingIcon,
    icon2: settingIconWhite,
    label: 'Pengaturan',
    link: '/settings'
  },
]

export const navbarTitle = [
  {
    route: '/',
    title: 'Dashboard',
    content: 'You Have Following appointments today'
  },
  {
    route: '/patients',
    title: 'Manage Pasien',
    content: 'Simpan perubahan pasien'
  },
  {
    route: '/article',
    title: 'Manage Artikel',
    content: 'Kelola informasi kesehatan'
  },
  {
    route: '/feedback',
    title: 'Feedback',
    content: 'Saran dan Masukan'
  },
  {
    route: '/settings',
    title: 'Pengaturan',
    content: 'Kelola pengaturan'
  },
]