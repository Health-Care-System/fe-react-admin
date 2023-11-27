import { useQuery } from "@tanstack/react-query"
import axios from "axios";

export const useGetAllDoctorTransaction = () => {
  const doctorTransaction = useQuery({
    queryKey: ['doctorTransaction'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3100/transaction/doctor');
      return res.data;
    }
  })
  return doctorTransaction;
}

export const useGetAllDrugTransaction = () => {
  const doctorTransaction = useQuery({
    queryKey: ['drugTransaction'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/drugTransaction');
      return res.data;
    }
  })
  return doctorTransaction;
}
export const useGetAllPatients = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/patients');
      return res.data;
    }
  })
  return {
    data,
    isError,
    isPending,
    refetch
  };
}