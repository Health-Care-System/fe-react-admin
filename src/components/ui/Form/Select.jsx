/* 
Note:
1. Cukup panggil komponen ini dengan dengan cara 
<Select 
  options={ isi dengan array } 
  name="nama" 
  handleChange={(e) => handleChange(e) }
  value={value} 
  />
  
2. Array harus memiliki properti value dan label
*/
export const Select = ({
  options,
  name,
  handleChange,
  value,
  defaultValue,
  className
}) => {
  return (
    <select
      name={name}
      onChange={handleChange}
      value={value}
      defaultValue={defaultValue}
      className={`form-select ${className}`}
      aria-label="Default select example"
    >
      <option selected="">Choose</option>
      {options?.map((item, index) => (
        <option
          key={index}
          value={item.value}
        >
          {item.label}
        </option>
      ))
      }
    </select>

  )

}
