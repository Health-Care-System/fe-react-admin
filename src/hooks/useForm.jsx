import { useState } from "react";

const useForm = (initialState, initialError) => {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(initialError)
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
    setForm,
    error,
    setError,
    handleInput,
    setLoading,
    loading
  }
}

export default useForm;