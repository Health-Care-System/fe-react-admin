export const handleLoginError = (error, setErrors) => {
  if (error.response) {
    const field = error?.response?.data?.meta?.message;
    switch (error.response.status) {
      case 401:
        setErrors({
          email: field.split(' ')[0] === 'Email'
            ? 'Email tidak terdaftar!'
            : 'Email atau password tidak valid!',
        });
        break;
      case 400:
        setErrors({
          default: 'Form data tidak valid, harap masukkan data yang sesuai!',
        });
        break;
      default:
        setErrors({
          default: 'Maaf, permintaan anda tidak dapat kami proses saat ini. Harap coba lagi',
        });
    }
  }
};

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
    newErrors.password = 'Password harus mengandung angka!';
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};
