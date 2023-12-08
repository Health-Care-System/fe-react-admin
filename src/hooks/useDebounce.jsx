import { useEffect, useState } from "react"
// Custom Hooks yang berfungsi untuk melakukan debouncing pada input value
// Note: debouncing sering digunakan untuk memastikan bahwa pemanggilan API tidak terjadi setiap kali pengguna mengetik sesuatu, melainkan hanya setelah pengguna berhenti mengetik atau setelah sejumlah waktu tertentu setelah kegiatan input terakhir.
// Anggap aja ini sebagai teknik delay saat mau fetching data berdasarkan input value pda form input
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };

  }, [value, delay])

  return debouncedValue;
}

export default useDebounce;