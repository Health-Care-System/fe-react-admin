import { useInfiniteQuery } from "@tanstack/react-query"
import client from "../utils/auth";
import { useGetQuery } from "../hooks/useGetQuery";
import { genderFormat, titleUserDetail } from "../utils/dataObject";
import { formatDate } from "../utils/helpers";

export const useGetAllDoctorTransaction = () => {
  return useInfiniteQuery({
    queryKey: ['doctorTransaction'],
    queryFn: getAllDoctorTransaction,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage?.results?.length ? allPages.length : undefined;
      return nextPage;
    },
  })
}

const getAllDoctorTransaction = async ({ pageParam = 0 }) => {
  try {
    const offset = pageParam * 6;
    const res = await client.get(`/admins/doctor-payments?offset=${offset}&limit=6`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) return null;
    throw error;
  }
};

const getAllMedicinesTransaction = async ({ pageParam = 0 }) => {
  try {
    const offset = pageParam * 6;
    const res = await client.get(`/admins/medicines-payments/checkout/?offset=${offset}&limit=6`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) return null;
    throw error;
  }
};

export const useGetAllMedicineTransaction = () => {
  return useInfiniteQuery({
    queryKey: ['medicineTransaction'],
    queryFn: getAllMedicinesTransaction,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage?.results.length ? allPages.length : undefined;
      return nextPage;
    },
  });
};


const getAllPatients = async ({ pageParam = 0 }) => {
  try {
    const offset = pageParam * 10;
    const res = await client.get(`/admins/users?offset=${offset}&limit=10`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) return null;
    throw error;
  }
}
export const useGetAllPatients = () => {
  return useInfiniteQuery({
    queryKey: ['AllPatients'],
    queryFn: getAllPatients,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage?.results.length ? allPages.length : undefined;
      return nextPage;
    },
  })
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
  const values = [id, fullname, email, genderFormat[gender], date, blood_type, weight, height];

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