import { describe, expect, it, vi } from 'vitest'
import { validateAddDoctorForm, validateFormLogin } from '../validation';
import { handleLoginError } from '../response-handler';

describe('validateFormLogin', () => {
  it('should return true for valid form data', () => {
    const formData = {
      email: 'valid@example.com',
      password: 'ValidPassword123',
    };

    const setErrors = vi.fn();
    const isValid = validateFormLogin(formData, setErrors);

    expect(isValid).toBe(true);
    expect(setErrors).toHaveBeenCalledWith({ email: '', password: '' });
  });

  it('should set errors for empty email and password', () => {
    const formData = { email: '', password: '' };

    const setErrors = vi.fn();
    const isValid = validateFormLogin(formData, setErrors);

    expect(isValid).toBe(false);
    expect(setErrors).toHaveBeenCalledWith({
      email: 'Email wajib diisi!',
      password: 'Password wajib diisi!',
    });
  });

  it('should set error for invalid email format', () => {
    const formData = { email: 'invalid-email', password: 'ValidPassword123' };

    const setErrors = vi.fn();
    const isValid = validateFormLogin(formData, setErrors);

    expect(isValid).toBe(false);
    expect(setErrors).toHaveBeenCalledWith({
      email: 'Format email tidak valid!',
      password: '',
    });
  });

  it('should set errors for short password', () => {
    const formData = { email: 'valid@example.com', password: 'Short' };

    const setErrors = vi.fn();
    const isValid = validateFormLogin(formData, setErrors);

    expect(isValid).toBe(false);
    expect(setErrors).toHaveBeenCalledWith({
      email: '',
      password: 'Password harus memiliki setidaknya 8 karakter!',
    });
  });

  it('should set error for password without a number', () => {
    const formData = { email: 'valid@example.com', password: 'NoNumberHere' };

    const setErrors = vi.fn();
    const isValid = validateFormLogin(formData, setErrors);

    expect(isValid).toBe(false);
    expect(setErrors).toHaveBeenCalledWith({
      email: '',
      password: 'Password harus mengandung angka!',
    });
  });
});


describe('handleLoginError', () => {
  it('handles 401 error', () => {
    const setErrorsMock = vi.fn();
    const error = {
      response: {
        status: 401,
        data: {
          meta: {
            message: 'Email not found',
          },
        },
      },
    };

    handleLoginError(error, setErrorsMock);

    expect(setErrorsMock).toHaveBeenCalledWith({
      email: 'Email tidak terdaftar!',
    });
  });

  it('handles 400 error', () => {
    const setErrorsMock = vi.fn();
    const error = {
      response: {
        status: 400,
        data: {
          meta: {
            message: 'Invalid form data',
          },
        },
      },
    };

    handleLoginError(error, setErrorsMock);

    expect(setErrorsMock).toHaveBeenCalledWith({
      default: 'Form data tidak valid, harap masukkan data yang sesuai!',
    });
  });

  it('handles other errors', () => {
    const setErrorsMock = vi.fn();
    const error = {
      response: {
        status: 500,
        data: {
          meta: {
            message: 'Server error',
          },
        },
      },
    };

    handleLoginError(error, setErrorsMock);
    expect(setErrorsMock).toHaveBeenCalledWith({
      default: 'Maaf, permintaan anda tidak dapat kami proses saat ini. Harap coba lagi',
    });
  });
});



describe('validateAddDoctorForm', () => {
  it('should validate a valid form', () => {
    const formData = {
      fullname: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
      gender: 'Male',
      specialist: 'Cardiology',
      price: '100',
      experience: '5',
      alumnus: 'Medical University',
      no_str: '12345',
    };
    const setErrors = vi.fn();
    const isValid = validateAddDoctorForm(formData, setErrors);

    expect(isValid).toBe(true);
    expect(setErrors).toHaveBeenCalledWith({
      fullname: "",
      email: "",
      password: "",
      gender: "",
      specialist: "",
      price: "",
      experience: "",
      alumnus: "",
      no_str: "",
    });
  });

  it('should invalidate an empty form', () => {
    const formData = {
      fullname: '',
      email: '',
      password: '',
      gender: '',
      specialist: '',
      price: '',
      experience: '',
      alumnus: '',
      no_str: '',
    };
    const setErrors = vi.fn();
    const isValid = validateAddDoctorForm(formData, setErrors);

    expect(isValid).toBe(false);
    expect(setErrors).toHaveBeenCalledWith({
      fullname: 'Nama Dokter wajib diisi!',
      email: 'Email wajib diisi!',
      password: 'Password wajib diisi!',
      gender: 'Gender wajib diisi!',
      specialist: 'Spesialis wajib diisi!',
      price: 'Biaya Konsultasi wajib diisi!',
      experience: 'Pengalaman wajib diisi!',
      alumnus: 'Alumnus wajib diisi!',
      no_str: 'Nomor STR wajib diisi!',
    });
  });

});
