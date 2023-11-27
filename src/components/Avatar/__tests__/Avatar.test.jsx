import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar } from '..';

describe('Avatar', () => {
  it('renders the component with the correct content', () => {
    render(<Avatar name={'Roqman Firnando'} role={'Owner'} />);
    expect(screen.getByAltText('Avatar')).toBeInTheDocument();
    expect(screen.getByText('Roqman Firnando')).toBeInTheDocument();
    expect(screen.getByText('Owner')).toBeInTheDocument();
  });
});
