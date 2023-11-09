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
  value
}) => {
  return (
    <select
      name={name}
      onChange={handleChange}
      value={value}
      className="form-select"
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

export const Input = () => {
  return (
    <input>index</input>
  )
}

/* 
Note:
1. Cukup panggil komponen ini dengan dengan cara 
<Textarea 
  name={"name"}
  value={value}
  onChange={(e) => handleChange(e)}
  placeholder={"ini adalah placeholder"}
  />
  
2. Array harus memiliki properti value dan label
*/

export const Textarea = ({
  placeHolder,
  name,
  value,
  handleChange
}) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeHolder}
      className="form-control"
      rows="3"
    />
  )
}

