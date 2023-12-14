import { useState } from "react";
import client from "../../../utils/auth";
import { toast } from "react-toastify";
import { Transparent } from "../Container";
import { CustomModal } from "./Modal";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import '../../../pages/Medicine/drug-page.css'
import { useQueryClient } from "@tanstack/react-query";

export const EditImageOptions = ({ 
  setForm, 
  handleImageChange, 
  imagePreview, 
  setImagePreview,
  id,
  setClickImg
}) => {
  const queryClient = useQueryClient()
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteImage = async () => {
    try {
      setLoading(true);
      const res = await client.delete(`/admins/medicines/${id}/image`);
      if (res.status === 200) {
        setForm((prev) => ({
          ...prev,
          image: null,
          clickImg: false,
        }))
        setImagePreview(null)
      }
      queryClient.invalidateQueries({queryKey: ['allMedicines']})
      toast.success('Gambar produk berhasil dihapus')
    } catch (error) {
      toast.error('Gagal menghapus gambar produk')
    } finally {
      setDeleteModal(false)
      setClickImg(false)
      setLoading(false)
    }
  }
    
  return (
    <>
      <div 
        className="d-flex flex-column shadow rounded-2 p-2 edit-btn-wrapper" 
        style={{ width: 'fit-content' }}>
        <Link
          target="_blank"
          to={`${imagePreview}`}
          className={'btn fw-semibold'}>
          {'Lihat Foto'}
        </Link>
        <div className="text-center">
          <input
            onChange={(e) => handleImageChange(e, 'put')}
            type="file"
            id="fileWhite"
            className={`inputFileWhite form-control`}
            name="fileWhite"
          />
          <label htmlFor="fileWhite" className="text-black bg-light text-nowrap">Unggah Foto</label>
        </div>
        <Button
          onClick={() => setDeleteModal(true)}
          className={'fw-semibold text-nowrap'}>
          {'Hapus Foto'}
        </Button>
      </div>
      {deleteModal &&
        <Transparent
          disabled={true}
          style={{ zIndex: 55}}
        >
          <CustomModal
            disabled={loading}
            title={'Hapus Foto?'}
            content={'Apabila anda menghapus Foto, maka foto produk akan hilang'}
            confirmAction={deleteImage}
            cancelAction={() => setDeleteModal(false)}
          />
        </Transparent>
      }
    </>
  )
}