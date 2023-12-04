import client from "../utils/auth";

export const updateStatusOrder = async (newData) => {
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

