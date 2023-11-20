// Input.js
import React from 'react';

const Input = (props) => {
  const { type, className, name, placeholder, value, onChange } = props;

  return (
    <input
      type={type}
      className={className}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
