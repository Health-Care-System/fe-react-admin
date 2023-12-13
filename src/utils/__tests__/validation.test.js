import { describe, expect, it, vi } from 'vitest'
import { validateAddDoctorForm, validateFormLogin, validateMedicineForm } from '../validation';
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
      password: 'Password harus mengandung setidaknya satu angka!',
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


describe('validateMedicineForm', () => {
  it('should return true for a valid form', () => {
    const form = {
      code: '123',
      name: 'Medicine',
      merk: 'Brand',
      category: 'Category',
      type: 'Type',
      stock: '10',
      price: '100',
      details: 'Details',
      image: 'image.jpg',
    };

    const setErrors = vi.fn();
    const isValid = validateMedicineForm(form, setErrors);

    expect(isValid).toBe(true);
    expect(setErrors).toHaveBeenCalledWith({
      code: '',
      name: '',
      merk: '',
      category: '',
      type: '',
      stock: '',
      price: '',
      details: '',
      image: null,
    });
  });

  it('should return false and set errors for an invalid form', () => {
    const form = {
      code: '',
      name: '123', 
      merk: '123', 
      category: '123', 
      type: '123', 
      stock: 'abc', 
      price: 'abc', 
      details: '',
      image: null,
    };

    const setErrors = vi.fn();
    const isValid = validateMedicineForm(form, setErrors);

    expect(isValid).toBe(false);

    expect(setErrors).toHaveBeenCalledWith({
      code: 'Kode Obat wajib diisi!',
      name: 'Nama obat harus mengandung huruf!',
      merk: 'Merk obat harus mengandung huruf!',
      category: 'Kategori obat harus mengandung huruf!',
      type: 'Jenis obat harus mengandung huruf!',
      stock: 'Stock obat harus berupa angka!',
      price: 'Harga obat harus berupa angka!',
      details: 'Details obat wajib diisi!',
      image: 'Gambar obat wajib diisi!',
    });
  });

  it('should return false and set errors for an empty form', () => {
    const form = {
      code: '',
      name: '',
      merk: '',
      category: '',
      type: '',
      stock: '',
      price: '',
      details: '',
      image: null,
    };

    const setErrors = vi.fn();
    const isValid = validateMedicineForm(form, setErrors);

    expect(isValid).toBe(false);

    expect(setErrors).toHaveBeenCalledWith({
      code: 'Kode Obat wajib diisi!',
      name: 'Nama obat wajib diisi!',
      merk: 'Merk obat wajib diisi!',
      category: 'Kategori obat wajib diisi!',
      type: 'Jenis obat wajib diisi!',
      stock: 'Stock obat wajib diisi!',
      price: 'Harga obat wajib diisi!',
      details: 'Details obat wajib diisi!',
      image: 'Gambar obat wajib diisi!',
    });
  });
});