import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from "vitest";
import { Bubble } from "..";

describe('Bubble Components', () => {

  it('Dapat merender text kedalam komponen',() => {
    render(<Bubble text={'test'} author={"user"} />)
  
    expect(screen.getByText('test')).toBeInTheDocument();

  });
  
  it('Memiliki classname yang berbeda tergantung author',() => {
    
    const { container } = render(<Bubble text={"test"} author={"user"} />)
    expect(container.firstChild.classList.contains('bg-transparent')).toBe(true);
    expect(container.firstChild.classList.contains('bg-success-subtle')).toBe(false);
  })
});