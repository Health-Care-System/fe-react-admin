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
    link: '/drugs'
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
    route: '',
    title: 'Dashboard',
  },
  {
    route: 'drugs',
    title: 'Manage Obat - obatan',
  },
  {
    route: 'patients',
    title: 'Kelola Pasien',
  },
  {
    route: 'doctors',
    title: 'Kelola Dokter',
  },
  {
    route: 'settings',
    title: 'Pengaturan',
  },
]

export const patientTransaction = [
  {
    id: '123',
    idPatient: '403',
    payment: 'BCA Virtual Account',
    total: 209000,
    date: '17 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
];
export const doctorTransaction = [
  {
    id: '123',
    idDoctor: '403',
    idPatient: '403',
    payment: 'BCA Virtual Account',
    total: 209000,
    date: '17 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '123',
    idDoctor: '403',
    idPatient: '403',
    payment: 'BCA Virtual Account',
    total: 209000,
    date: '17 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '123',
    idDoctor: '403',
    idPatient: '403',
    payment: 'BCA Virtual Account',
    total: 209000,
    date: '17 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '123',
    idDoctor: '403',
    idPatient: '403',
    payment: 'BCA Virtual Account',
    total: 209000,
    date: '17 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '123',
    idDoctor: '403',
    idPatient: '403',
    payment: 'BCA Virtual Account',
    total: 209000,
    date: '17 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '123',
    idDoctor: '403',
    idPatient: '403',
    payment: 'BCA Virtual Account',
    total: 209000,
    date: '17 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '123',
    idDoctor: '403',
    idPatient: '403',
    payment: 'BCA Virtual Account',
    total: 209000,
    date: '17 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '123',
    idDoctor: '403',
    idPatient: '403',
    payment: 'BCA Virtual Account',
    total: 209000,
    date: '17 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '123',
    idDoctor: '403',
    idPatient: '403',
    payment: 'BCA Virtual Account',
    total: 209000,
    date: '17 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '123',
    idDoctor: '403',
    idPatient: '403',
    payment: 'BCA Virtual Account',
    total: 209000,
    date: '17 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
];
export const theadDoctor = ["ID", "ID Dokter", "ID Pasien", "Metode Pembayaran", "Total Harga", "Tgl Transaksi", "Gambar", "Status"];
export const theadPatient = ["ID", "ID Pasien", "Metode Pembayaran", "Total Harga", "Tgl Lahir", "Gambar", "Status Pembayaran"];