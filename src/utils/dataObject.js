// Icon Default
import dasboardIcon from '../assets/icon/dashboard.svg'
import medicineIcon from '../assets/icon/medicine.svg'
import patientIcon from '../assets/icon/patient.svg'
import doctorIcon from '../assets/icon/doctor.svg'

// Icon White
import dasboardIconWhite from '../assets/icon/dashboardWhite.svg'
import medicineIconWhite from '../assets/icon/medicineWhite.svg'
import patientIconWhite from '../assets/icon/patientWhite.svg'
import doctorIconWhite from '../assets/icon/doctorWhite.svg'

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
    link: '/medicines'
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
]

export const navbarTitle = [
  {
    route: '',
    title: 'Dashboard',
  },
  {
    route: 'medicines',
    title: 'Kelola Obat',
  },
  {
    route: 'patients',
    title: 'Kelola Pasien',
  },
  {
    route: 'doctors',
    title: 'Kelola Dokter',
  },
]

export const drugTransaction = [
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
    id: '124',
    idDoctor: '405',
    idPatient: '408',
    payment: 'Mandiri Virtual Account',
    total: 185000,
    date: '18 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Sukses',
  },
  {
    id: '125',
    idDoctor: '407',
    idPatient: '401',
    payment: 'BRI Virtual Account',
    total: 150000,
    date: '19 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '126',
    idDoctor: '402',
    idPatient: '406',
    payment: 'Virtual Account BNI',
    total: 220000,
    date: '20 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Sukses',
  },
  {
    id: '127',
    idDoctor: '404',
    idPatient: '409',
    payment: 'BCA Virtual Account',
    total: 195000,
    date: '21 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '128',
    idDoctor: '408',
    idPatient: '402',
    payment: 'Mandiri Virtual Account',
    total: 170000,
    date: '22 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Sukses',
  },
  {
    id: '129',
    idDoctor: '401',
    idPatient: '407',
    payment: 'BRI Virtual Account',
    total: 135000,
    date: '23 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '130',
    idDoctor: '406',
    idPatient: '403',
    payment: 'Virtual Account BNI',
    total: 205000,
    date: '24 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Sukses',
  },
  {
    id: '131',
    idDoctor: '409',
    idPatient: '404',
    payment: 'BCA Virtual Account',
    total: 180000,
    date: '25 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '132',
    idDoctor: '402',
    idPatient: '405',
    payment: 'Mandiri Virtual Account',
    total: 145000,
    date: '26 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Sukses',
  },
  {
    id: '133',
    idDoctor: '407',
    idPatient: '410',
    payment: 'BRI Virtual Account',
    total: 215000,
    date: '27 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '134',
    idDoctor: '403',
    idPatient: '406',
    payment: 'Virtual Account BNI',
    total: 190000,
    date: '28 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Sukses',
  },
  {
    id: '135',
    idDoctor: '405',
    idPatient: '401',
    payment: 'BCA Virtual Account',
    total: 165000,
    date: '29 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '136',
    idDoctor: '401',
    idPatient: '407',
    payment: 'Mandiri Virtual Account',
    total: 130000,
    date: '30 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Sukses',
  },
  {
    id: '137',
    idDoctor: '406',
    idPatient: '403',
    payment: 'BRI Virtual Account',
    total: 200000,
    date: '31 Oktober 2002',
    image: 'https://images.google.com/',
    status: 'Pending',
  },
  {
    id: '138',
    idDoctor: '404',
    idPatient: '409',
    payment: 'Virtual Account BNI',
    total: 175000,
    date: '1 November 2002',
    image: 'https://images.google.com/',
    status: 'Sukses',
  },
];
export const thead = ["ID", "Nama Lengkap", "Email", "Gender", "Tgl Lahir", "Gol. Darah", "Berat Badan", "Tinggi Badan"];
export const theadDoctor = ["ID", "ID Dokter", "ID Pasien", "Metode Pembayaran", "Total Harga", "Tgl Transaksi", "Gambar", "Status"];
export const theadDoctorDetails = ["ID Transaksi", "ID Dokter", "Metode Pembayaran", "Total Harga", "Tgl Transaksi", "Gambar", "Status"];
export const theadMedicine = ["ID", "ID Pasien", "Metode Pembayaran", "Total Harga", "Tgl Transaksi", "Status"];
export const theadAllMedicine = ["Kode", "Nama", "Merk", "Kategori", "Jenis", "Stok", "Harga", "Gambar"];
export const theadMedicineHome = ["Nama Obat", "Stok Obat"];
export const theadDrugDetails = ["ID Transaksi", "Metode Pembayaran", "Total Harga", "Tgl Transaksi", "Gambar", "Status"];
export const theadDoctorList = ["ID", "Nama Lengkap", "Jenis Kelamin", "Email", "Spesialis", "Pengalaman", "Nomor STR"];

export const titleUserDetail = [
  'ID',
  'Nama Lengkap',
  'Email',
  'Gender',
  'Tanggal Lahir',
  'Gol. Darah',
  'Berat Badan',
  'Tinggi Badan'
];

export const genderFormat = {
  male: 'Laki-Laki',
  female: 'Perempuan',
}

export const optionsDoctorSpesialist = [
  { value: "Umum", label: "Dokter Umum" },
  { value: "Anak", label: "Spesialis Anak" },
  { value: "Kulit", label: "Dokter Kulit" },
  { value: "Psikolog", label: "Psikolog Klinis" },
  { value: "Jantung", label: "Dokter Jantung" },
  { value: "Gigi", label: "Dokter Gigi" },
  { value: "Mata", label: "Dokter Mata" },
  { value: "Bedah", label: "Spesialis Bedah" },
];
