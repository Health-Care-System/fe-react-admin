import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CreateDoctor } from '../CreateDoctor';
import { expect, vi } from 'vitest'

describe('CreateDoctor', () => {
  it('renders the component correctly', () => {
    render(<CreateDoctor />);

    expect(screen.getByText('Nama')).toBeInTheDocument();
    expect(screen.getByText('Jenis Kelamin')).toBeInTheDocument();
  });

  it('handle name input', () => {
    render(<CreateDoctor />);

    const namaInput = screen.getByPlaceholderText('Masukkan Nama Lengkap Pasien');
    fireEvent.change(namaInput, { target: { value: 'John Doe' } });
    expect(namaInput.value).toBe('John Doe');
  });
});
