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

