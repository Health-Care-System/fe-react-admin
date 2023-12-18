import { useInfiniteQuery } from "@tanstack/react-query"
import client from "../utils/auth";
import { useGetQuery } from "../hooks/useGetQuery";
import { genderFormat, month, titleUserDetail } from "../utils/dataObject";
import { formatDate } from "../utils/helpers";

// semua data transaksiki konsultasi dokter
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
// semua data transaksi obat tiap user
export const useGetMedicineTransactionByUserID = (userId) => {
  return useInfiniteQuery({
    queryKey: ['medicineTRansactionByUserID', userId],
    queryFn: ({ pageParam = 0 }) => getMedicineTransactionByUserID({ pageParam, userId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage?.results?.length ? allPages.length : undefined;
      return nextPage;
    },
  })
}
const getMedicineTransactionByUserID = async ({ pageParam = 0, userId }) => {
  try {
    const offset = pageParam * 3;
    const res = await client.get(`/admins/medicines-payments/checkout/?offset=${offset}&limit=3&user_id=${userId}`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) return null;
    throw error;
  }
};

// semua data transaksi dokter tiap user
export const useGetDoctorTransactionByUserID = (userId) => {
  return useInfiniteQuery({
    queryKey: ['doctorTransactionByUserID', userId],
    queryFn: ({ pageParam = 0 }) => getDoctorTransactionByUserID({ pageParam, userId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage?.results?.length ? allPages.length : undefined;
      return nextPage;
    },
  })
}
const getDoctorTransactionByUserID = async ({ pageParam = 0, userId }) => {
  try {
    const offset = pageParam * 3;
    const res = await client.get(`/admins/doctor-payment/${userId}?offset=${offset}&limit=3`);

    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) return null;
    throw error;
  }
};

// semua transaksi obatn-obatan
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

// semua data pasien/user
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

// data tiap masing-masing pasien
export const useGetPatientsDetails = (userId) => {
  const {
    data,
    isPending,
    isError,
    refetch,
  } = useGetQuery('userDetails', `/admins/user/${userId}`);

  const {
    id,
    fullname,
    email,
    gender,
    birthdate,
    blood_type,
    weight,
    height
  } = data?.results ?? {};
  let newDate = new Date(birthdate);
  const date = newDate.getDate() + ' ' +
    month[newDate.getMonth()] + ' ' +
    newDate.getFullYear();
  const values = [id, fullname, email, genderFormat[gender], date, blood_type, weight, height];
  const dataUser = titleUserDetail.map((label, index) => ({
    label,
    value: values[index],
  }));

  return {
    data,
    dataUser,
    isError,
    isPending,
    refetch
  }
}

// Data user berdasarkan pencarian user_id
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
export const getUserById = async (userId) => {
  const res = await client.get(`/admins/user/${userId}`);
  return res?.data;
}
