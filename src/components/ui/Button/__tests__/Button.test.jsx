import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '..';
import { describe, expect, it, vi } from 'vitest';

describe('Button', () => {
  it('Komponen button berfungsi', () => {
    render(
      <Button className={'btn-primary'}>
        Login
      </Button>
    );    
    const loginButton = screen.getByText('Login');
    expect(loginButton).toHaveClass('btn-primary');
    expect(loginButton).toHaveTextContent('Login');
  })
  
  it('Klik berfungsi', async () => {
    const clickMock = vi.fn();
    render(
      <Button onClick={clickMock} className={'btn-primary'}>
        Login
      </Button>
    );    
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    expect(clickMock).toHaveBeenCalled();
  })
})
