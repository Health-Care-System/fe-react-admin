import { useInfiniteQuery } from "@tanstack/react-query";
import client from "../utils/auth";

export const useGetAllMedicine = (userId) => {
  return useInfiniteQuery({
    queryKey: ['allMedicines', userId],
    queryFn: getAllMedicines,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage?.results?.length ? allPages.length : undefined;
      return nextPage;
    },
  })
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