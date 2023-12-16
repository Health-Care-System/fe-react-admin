export const handleLoginError = (error, setErrors) => {
  if (error.response) {
    const field = error?.response?.data?.meta?.message;
    switch (error.response.status) {
      case 401:
        setErrors({
          email: field.split(' ')[0].toLowerCase() === 'email'
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

export const handleRegisterDoctorError = (error, setErrors) => {
  if (error?.response) {
    switch (error?.response?.data?.meta?.message) {
      case 'invalid input register data':
        setErrors({
          default: 'Form data tidak valid, harap masukan data yang benar!',
        });
        break;
      case 'image file is required':
        setErrors({
          profile_picture: 'Harap pilih profile picture!',
        });
        break;
      case 'error upload image to cloud storage':
        setErrors({
          profile_picture: 'Gagal menyimpan gambar di Database, maksimal ukuran gambar adalah 10MB!',
        });
        break;
      case 'email already exist':
        setErrors({
          email: 'Email sudah terdaftar, harap gunakan email yang lain!',
        });
        break;
      default:
        setErrors({
          default: 'Registrasi gagal, harap coba lagi',
        });
    }
  }
};

export const handleResetPasswordError = (error, setErrors) => {
  if (error.response) {
    const field = error?.response?.data?.meta?.message;
    switch (field) {
      case 'Invalid request':
        setErrors({
          confirmPassword: 'Input form tidak valid'
        });
        break;
      case 'failed to get OTP verification failed':
        setErrors({
          confirmPassword: 'Gagal memverifikasi kode OTP, harap coba lagi!'
        });
        break;
      case 'failed to get update password':
        setErrors({
          confirmPassword: 'Gagal untuk memperbarui pasword baru, harap coba lagi beberapa saat lagi!'
        });
        break;
      default:
        setErrors({
          email: 'Maaf, permintaan anda tidak dapat kami proses saat ini. Harap coba lagi',
        });
    }
  }
};

