import client from "../utils/auth";

export const updateStatusOrderDoctor = async (newData) => {
  try {
    const res = await client.put(`/admins/doctor-payments/${newData?.id}`, {
      payment_status: newData.newStatus
    });

    if (res?.status === 200) {
      return newData
    } else {
      throw new Error("Gagal memperbarui transaksi!")
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Something went wrong');
  }
}
export const updateStatusOrderMedicine = async (newData) => {
  try {
    const res = await client.put(`/admins/medicines-payments/checkout/${newData?.id}`, {
      payment_status: newData.newStatus
    });

    if (res?.status === 200) {
      return res.data;
    } else {
      throw new Error("Gagal memperbarui transaksi!")
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Something went wrong');
  }
}

export const getMedicineByID = async (id) => {
  const res = await client.get(`/admins/medicines-payments/checkout/${id}`);
  return res?.data;
}

export const getMedicineTransactionByID = async (setLoadingSearch, setFilterData, id) => {
  try {
    setLoadingSearch(true);
    const data = await getMedicineByID(id);
    setFilterData(data && data.results ? [data.results] : []);
  } catch (error) {
    if (error.response.status === 404) {
      setFilterData([]);
    }
    console.error("Error fetching user data:", error);
  } finally {
    setLoadingSearch(false);
  }
};
export const getDoctorByID = async (id) => {
  const res = await client.get(`/admins/medicines-payments/checkout/${id}`);
  return res?.data;
}
export const getDoctorTransactionByID = async (setLoadingSearch, setFilterData, id) => {
  try {
    setLoadingSearch(true);
    const data = await getDoctorByID(id);
    setFilterData(data && data.results ? [data.results] : []);
  } catch (error) {
    if (error.response.status === 404) {
      setFilterData([]);
    }
    console.error("Error fetching user data:", error);
  } finally {
    setLoadingSearch(false);
  }
};

