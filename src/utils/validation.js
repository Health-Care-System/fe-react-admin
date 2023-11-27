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
