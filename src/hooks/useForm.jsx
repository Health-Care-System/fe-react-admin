import { useState } from "react";

const useForm = (initialState, initialError) => {
  const [form, setForm] = useState(initialState);
<<<<<<< HEAD
  const [error, setError] = useState(initialError)
=======
  const [errors, setErrors] = useState(initialError);
>>>>>>> 350d5f91f016ea1535df58f512eb6ec06b288b2a
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
<<<<<<< HEAD
    error,
    setError,
=======
    errors,
    setErrors,
>>>>>>> 350d5f91f016ea1535df58f512eb6ec06b288b2a
    handleInput,
    setLoading,
    loading
  }
}

export default useForm;