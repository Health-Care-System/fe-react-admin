export const validateFormLogin = (formData, setErrors) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;
  const newErrors = { email: '', password: '' };

  if (!formData.email) {
    newErrors.email = 'Email wajib diisi!';
    valid = false;
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = 'Format email tidak valid!';
    valid = false;
  }

  if (!formData.password) {
    newErrors.password = 'Password wajib diisi!';
    valid = false;
  } else if (formData.password.length < 8) {
    newErrors.password = 'Password harus memiliki setidaknya 8 karakter!';
    valid = false;
  } else if (!/(?=.*[a-z])(?=.*\d)/.test(formData.password)) {
    if (/^[a-zA-Z]+$/.test(formData.password)) {
      newErrors.password = 'Password harus mengandung setidaknya satu angka!';
    } else if (/^\d+$/.test(formData.password)) {
      newErrors.password = 'Password harus mengandung setidaknya satu huruf!';
    } else {
      newErrors.password = 'Password harus mengandung setidaknya satu huruf dan satu angka!';
    }
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};

export const validateAddDoctorForm = (formData, setErrors) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;
  const newErrors = { 
    fullname: "",
    email: "",
    password: "",
    gender: "",
    specialist: "",
    price: "",
    experience: "",
    alumnus: "",
    no_str: "",
   };

   if(!formData.fullname) {
    newErrors.fullname = 'Nama Dokter wajib diisi!'
    valid = false;
   }

   if (!formData.email) {
    newErrors.email = 'Email wajib diisi!';
    valid = false;
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = 'Format email tidak valid!';
    valid = false;
  }

  if (!formData.password) {
    newErrors.password = 'Password wajib diisi!';
    valid = false;
  } else if (formData.password.length < 8) {
    newErrors.password = 'Password harus memiliki setidaknya 8 karakter!';
    valid = false;
  } else if (!/(?=.*[a-z])(?=.*\d)/.test(formData.password)) {
    if (/^[a-zA-Z]+$/.test(formData.password)) {
      newErrors.password = 'Password harus mengandung setidaknya satu angka!';
    } else if (/^\d+$/.test(formData.password)) {
      newErrors.password = 'Password harus mengandung setidaknya satu huruf!';
    } else {
      newErrors.password = 'Password harus mengandung setidaknya satu huruf dan satu angka!';
    }
    valid = false;
  }

  if(!formData.gender) {
    newErrors.gender = 'Gender wajib diisi!';
    valid = false;
  }

  if(!formData.specialist) {
    newErrors.specialist = 'Spesialis wajib diisi!';
    valid = false;
  }

  if(!formData.price) {
    newErrors.price = 'Biaya Konsultasi wajib diisi!';
    valid = false;
  }

  if(!formData.experience) {
    newErrors.experience = 'Pengalaman wajib diisi!';
    valid = false;
  }

  if(!formData.alumnus) {
    newErrors.alumnus = 'Alumnus wajib diisi!';
    valid = false;
  }

  if(!formData.no_str) {
    newErrors.no_str = 'Nomor STR wajib diisi!';
    valid = false;
  }


  setErrors(newErrors);
  return valid;
}

export const validateExtImage = (file) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];
  const fileName = file.name.toLowerCase();
  const isValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

  return isValidExtension;
}

export const validateEditDoctorForm = (formData, setErrors) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;
  const newErrors = { 
    fullname: "",
    email: "",
    gender: "",
    specialist: "",
    price: "",
    experience: "",
    alumnus: "",
    no_str: "",
   };

   if(!formData.fullname) {
    newErrors.fullname = 'Nama Dokter wajib diisi!'
    valid = false;
   }

   if (!formData.email) {
    newErrors.email = 'Email wajib diisi!';
    valid = false;
  } else if (!emailRegex.test(formData.email)) {
    newErrors.email = 'Format email tidak valid!';
    valid = false;
  }

  if(!formData.gender) {
    newErrors.gender = 'Gender wajib diisi!';
    valid = false;
  }

  if(!formData.specialist) {
    newErrors.specialist = 'Spesialis wajib diisi!';
    valid = false;
  }

  if(!formData.price) {
    newErrors.price = 'Biaya Konsultasi wajib diisi!';
    valid = false;
  }

  if(!formData.experience) {
    newErrors.experience = 'Pengalaman wajib diisi!';
    valid = false;
  }

  if(!formData.alumnus) {
    newErrors.alumnus = 'Alumnus wajib diisi!';
    valid = false;
  }

  if(!formData.no_str) {
    newErrors.no_str = 'Nomor STR wajib diisi!';
    valid = false;
  }


  setErrors(newErrors);
  return valid;
}