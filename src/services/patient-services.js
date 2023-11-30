import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import client from "../utils/auth";
import { useGetQuery } from "../hooks/useGetQuery";
import { genderFormat, titleUserDetail } from "../utils/dataObject";
import { formatDate } from "../utils/helpers";

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
      const res = await client.get('/admins/users');
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

export const useGetPatientsDetails = (userId) => {
  const {
    data,
    isPending,
    isError,
    refetch
  } = useGetQuery('userDetails', `/admins/user/${userId}`);

  const { 
    id, 
    fullname,
    email,
    gender,
    birtdate,
    blood_type,
    weight,
    height
  } = data?.results ?? {};
  const date = formatDate[birtdate]
  const values = [ id, fullname, email, genderFormat[gender], date, blood_type, weight,height];

  const dataUser = titleUserDetail.map((label, index) => ({
    label,
    value: values[index],
  }));
  
  return {
    dataUser,
    isError,
    isPending,
    refetch
  }
  
}

export const getUserById = async (userId) => {
  const res = await client.get(`/admins/user/${userId}`);
  return res?.data;
}


export const getDataUserById = async (setLoadingSearch, setFilterData, userId) => {
  try {
    setLoadingSearch(true);
    const data = await getUserById(userId);
    setFilterData(data && data.results ? [data.results] : []);
  } catch (error) {
    console.error("Error fetching user data:", error);
  } finally {
    setLoadingSearch(false);
  }
};