export const Input = ({
  placeHolder,
  name,
  value,
  handleChange,
  type,
  className
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeHolder}
      className={`form-control ${className}`}
    />
  )
}
