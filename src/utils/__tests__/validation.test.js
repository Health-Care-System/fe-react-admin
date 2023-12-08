import { describe, expect, it, vi } from 'vitest'
import { validateFormLogin } from '../validation';
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

