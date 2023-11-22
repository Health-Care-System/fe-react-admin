import { useState } from "react";

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
      const { name, value } = e.target;
      setForm({
          ...form,
          [name]: value
      })
  }
  
  return {
    form,
    handleInput,
    setForm,
    setLoading,
    loading
  }
}

export default useForm;