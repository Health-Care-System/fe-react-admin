import { useQuery } from "@tanstack/react-query";
import client from "../utils/auth";
import { validateAddDoctorForm } from "../utils/validation";
// import { toast } from "react-toastify";

const prepareDoctorData = (form) => {
  const data = new FormData();
  data.append("profile_picture", form.profile_picture);
  data.append("price", 700000);
  data.append("fullname", form.fullname);
  data.append("email", form.email);
  data.append("password", form.password);
  data.append("gender", form.gender);
  data.append("specialist", form.specialist);
  data.append("price", form.price);
  data.append("experience", form.experience);
  data.append("alumnus", form.alumnus);
  data.append("no_str", form.no_str);
  return data;
};

export const handlePostDoctor = async (form, setError) => {
  const data = prepareDoctorData(form);
  if (validateAddDoctorForm(form, setError)) {
    try {
      const res = await client.post(`/admins/doctors/register`, data);
      console.log(res);
      if (res.status === 201 || res.status === 200) {
        return true;
      }
    } catch (error) {
      console.log(error?.response?.data?.meta?.message);
      return false;
    }
  }
};

export const useGetAllDoctors = () => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await client.get("/admins/doctors?offset=0&limit=5");
        return res.data.results;
      } catch (error) {
        console.error("Error fetching doctors:", error);
        throw new Error("Failed to fetch doctors");
      }
    },
  });
  return {
    data,
    isError,
    isPending,
    refetch,
  };
};

// export const handleEditDoctor = async (
//   form,
//   idDoctor,
//   setError,
//   setLoading
// ) => {
//   const data = prepareDoctorData(form);
//   if (validateAddDoctorForm(form, setError)) {
//     try {
//       setLoading(true);
//       const res = await client.put(`/doctors/doctor/${idDoctor}`, data);
//       if (res.status === 201 || res.status === 200) {
//         return true;
//       }
//     } catch (error) {
//       console.log(error?.response?.data?.meta?.message);
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   }
// };

// export const handleDeleteArticle = async (
//   id,
//   setLoading,
//   queryClient,
//   setModalDelete
// ) => {
//   try {
//     setLoading(true);
//     const res = await client.delete(`/admins/doctor/${id}`);
//     if (res.status === 200) {
//       queryClient.invalidateQueries({ queryKey: ["doctors"] });
//       toast.success("Dokter berhasil dihapus!", {
//         delay: 800,
//       });
//     }
//   } catch (error) {
//     toast.error("Dokter gagal dihapus!", {
//       delay: 800,
//     });
//     console.log(error?.response?.data?.meta?.message);
//   } finally {
//     setLoading(false);
//     setModalDelete(false);
//   }
// };
