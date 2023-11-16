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

