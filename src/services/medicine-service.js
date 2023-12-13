import { useInfiniteQuery } from "@tanstack/react-query";
import client from "../utils/auth";
import { toast } from "react-toastify";

export const useGetAllMedicine = () => {
  return useInfiniteQuery({
    queryKey: ['allMedicines'],
    queryFn: getAllMedicines,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage?.results?.length ? allPages.length : undefined;
      return nextPage;
    },
  })
}

export const handleDeleteMedicine = async (newData) => {
  try {
    const res = await client.delete(`/admins/medicines/${newData.id}`);
    if (res?.status === 200) {
      return newData;
    }
  } catch (error) {
    throw new Error(error);
  }
}

const getAllMedicines = async ({ pageParam = 0 }) => {
  try {
    const offset = pageParam * 10;
    const res = await client.get(`/admins/medicines?offset=${offset}&limit=10`);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 404) return null;
    throw error;
  }
};

export const getMedicineByName = async (setLoadingSearch, setFilterData, query) => {
  
  try {
    setLoadingSearch(true);
    const data = await client.get(`/users/medicines?offset=0&limit=10&keyword=${query}`);
    setFilterData(data && data?.data?.results ? data.data.results : []);
  } catch (error) {
    if (error.response.status === 404) {
      setFilterData([]);
    }
    console.error("Error fetching user data:", error);
  } finally {
    setLoadingSearch(false);
  }
}

export const convertMedicineFormData = (form) => {
  const data = new FormData();
  data.append("image", form.image);
  data.append("code", form.code);
  data.append("name", form.name);
  data.append("merk", form.merk);
  data.append("category", form.category);
  data.append("type", form.type);
  data.append("stock", form.stock);
  data.append("price", form.price);
  data.append("details", form.details);
  return data;
};

export const handleEditMedicineService = async (data, queryClient, setEditModal) => {
  const formData = convertMedicineFormData(data);
  try {
    const res = await client.put(`/admins/medicines/${data?.id}`, formData);
    if (res.status === 200) {
      queryClient.invalidateQueries({ queryKey: ["allMedicines"] });
      toast.success("Anda berhasil mengubah produk", { delay: 800 });
    }
  } catch (error) {
    toast.error("Anda gagal mengubah produk", { delay: 800 });
  } finally {
    setEditModal(false)
  }
}