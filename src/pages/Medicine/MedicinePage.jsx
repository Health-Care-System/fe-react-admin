import { useRef, useState, useEffect } from "react";
import search from "../../assets/icon/search-grey.svg";
import plus from "../../assets/icon/count_plus.svg";
import AddPhoto from "../../assets/icon/AddPhoto.svg";

import "./drug-page.css";
import client from "../../utils/auth";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theadAllMedicine } from "../../utils/dataObject";
import Input from "../../components/ui/Form/Input";
import { Button } from "../../components/ui/Button";
import useForm from "../../hooks/useForm";
import { convertMedicineFormData, useGetAllMedicine } from "../../services/medicine-service";
import { useInView } from "react-intersection-observer";
import { RowTable } from "../../components/Table/RowTable";
import { ImageModal } from "../Patient/components/ImageModal";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const initState = {
  modalImg: null,
  imageSrc: null,
}

export const MedicinePage = () => {
  const {
    form,
    setForm,
  } = useForm(initState)
  const [editedData, setEditedData] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);

  const { ref, inView } = useInView();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isPending,
    refetch,
    isFetchingNextPage,
  } = useGetAllMedicine();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleDelete = async (med_id) => {
    try {
      const res = await client.delete(`/admins/medicines/${med_id}`);
      if (res.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["allMedicines"] });
        toast.success("Anda berhasil menghapus produk", { delay: 800 });
      }
    } catch (error) {
      toast.error("Anda gagal menghapus produk", { delay: 800 });

    } finally {
      setEditModal(false);
    }
  };

  const handleModal = (table) => {
    setEditModal(true);
    setEditedData(table);
  };
  const handleModalLink = (src) => {
    setForm((prev) => ({
      ...prev,
      modalImg: true,
      imageSrc: src
    }))
  }

  const closeModal = () => {
    setForm((prev) => ({
      ...prev,
      modalImg: false
    }))
  }

  const queryClient = useQueryClient();
  const handlePostMedicine = async (data) => {
    const formData = convertMedicineFormData(data);
    try {
      const res = await client.post('/admins/medicines', formData);
      if (res.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["allMedicines"] });
        toast.success("Anda berhasil menambahkan produk", { delay: 800 });
      }
    } catch (error) {
      toast.error("Anda gagal menambahkan produk", { delay: 800 });
      console.error(error)
    } finally {
      setAddModal(false)
    }
  }
  const handleEditMedicine = async (data) => {
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

  return (
    <>
      <MedicineTableContainer thead={theadAllMedicine} setAddModal={setAddModal}>
        <RowTable
          ifEmpty={"Tidak ada data dokter!"}
          isError={isError}
          isFetch={isFetchingNextPage}
          reffer={ref}
          refetch={refetch}
          isPending={isPending}
          data={data?.pages}
          totalRow={7}
          totalCol={10}
          renderItem={(data, index, offset) => {
            return (
              <tr
                onClick={() => handleModal(data, offset)}
                data-bs-toggle="modal" data-bs-target="#medicineModal"
                className="text-nowrap cursor-pointer"
                key={data?.id}
              >
                <td>{data?.code}</td>
                <td>{data?.name}</td>
                <td>{data?.merk}</td>
                <td>{data?.category}</td>
                <td>{data?.type}</td>
                <td>{data?.price}</td>
                <td>{data?.stock}</td>
                <td>
                  {!data?.image
                    ? '-'
                    : <Button
                      className={'p-0 text-primary fw-semibold'}
                      onClick={() => handleModalLink(data?.image)}>Link</Button>
                  }
                </td>
              </tr>
            );
          }}
        />
      </MedicineTableContainer>
      {editModal &&
        <MedicineModal
          title={'Informasi Produk'}
          data={editedData}
          handleDelete={handleDelete}
          handleAction={handleEditMedicine}
          setEditModal={setEditModal} />
      }
      {addModal &&
        <MedicineModal
          title={'Tambah Produk'}
          data={form}
          forModal={'post'}
          handleAction={handlePostMedicine}
          setEditModal={setAddModal} />
      }

      {form.modalImg &&
        <ImageModal
          closeModal={closeModal}
          source={form.imageSrc} />
      }
    </>
  );
};

const MedicineModal = ({ title, data, setEditModal, forModal, handleAction, handleDelete }) => {
  const [imagePreview, setImagePreview] = useState(data?.image);
  let initState = {
    id: data?.id ?? '',
    code: data?.code ?? '',
    name: data?.name ?? '',
    merk: data?.merk ?? '',
    category: data?.category ?? '',
    type: data?.type ?? '',
    stock: data?.stock ?? 0,
    price: data?.price ?? 0,
    details: data?.details ?? '',
    image: data?.image ?? null,
  }

  const {
    form,
    setForm,
    handleInput
  } = useForm(initState);
  const imageUploadRef = useRef(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({
      ...form,
      image: file
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handlePlaceholderClick = () => {
    imageUploadRef.current.click();
  };

  return (
    <>
      <div
        className="modal-backdrop"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          zIndex: '1030'
        }}>
      </div>
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        style={{ display: "block", zIndex: '1040' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 border-0">
            <div className="modal-header">
              <h1 className="modal-title fs-2">
                {title}
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={() => setEditModal(false)}
              />
            </div>
            <div className="modal-body px-5">
              <div className="mb-3 row">
                <div className="col-sm-9 text-center">
                  <input
                    type="file"
                    className="form-control"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={imageUploadRef}
                    style={{ display: "none" }}
                  />
                  <div
                    className="d-flex align-items-center justify-content-center mb-5 mt-3"
                    onClick={handlePlaceholderClick}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-2 img-fluid border-primary rounded p-1"
                        style={{
                          maxWidth: "125px",
                          marginLeft: "6rem",
                          border: "1px dashed",
                        }}
                      />
                    ) : (
                      <img
                        src={AddPhoto}
                        alt="Placeholder"
                        className="mt-2 img-fluid p-4 rounded border-primary"
                        style={{
                          maxWidth: "125px",
                          marginLeft: "6rem",
                          border: "1px dashed",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <form>
                <div className="mb-3 row">
                  <label htmlFor="code" className="col-sm-3 col-form-label ">
                    Kode
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="code"
                      name="code"
                      value={form.code}
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="name" className="col-sm-3 col-form-label">
                    Nama
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="merk" className="col-sm-3 col-form-label ">
                    Merk
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="merk"
                      name="merk"
                      value={form.merk}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label
                    htmlFor="Katgori"
                    className="col-sm-3 col-form-label"
                  >
                    Kategori
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      name="category"
                      value={form.category}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="type" className="col-sm-3 col-form-label ">
                    Jenis
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      name="type"
                      value={form.type}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="stock" className="col-sm-3 col-form-label">
                    Stock
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control "
                      id="stock"
                      name="stock"
                      value={form.stock}
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="price" className="col-sm-3 col-form-label">
                    Harga
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={form.price}
                      onChange={handleInput}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    htmlFor="details"
                    className="col-sm-3 col-form-label"
                  >
                    Detail
                  </label>
                  <div className="col-sm-9">
                    <textarea
                      type="text"
                      className="form-control"
                      id="details"
                      name="details"
                      value={form.details}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <div className="d-flex flex-row gap-3 justify-content-start w-100 align-items-center">
                <Button
                  onClick={() => handleAction(form)}
                  style={{ width: '7.125rem' }}
                  className={'btn-primary text-white fw-semibold'}
                >
                  Simpan
                </Button>
                <Button
                  disabled={forModal === 'post'}
                  type="button"
                  onClick={() => handleDelete(data?.id)}
                  className="btn-outline-primary fw-semibold border-2 text-nowrap"
                >
                  Hapus Produk
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const MedicineTableContainer = ({
  children,
  handleInput,
  inputValue,
  setAddModal,
  thead,
  pageFor,
  className
}) => {
  return (
    <div className={`table-responsive rounded-4 p-4 ${className}`}>
      {pageFor === 'homepage'
        ?
        <div className="d-flex flex-row justify-content-between align-items-center mb-4">
          <h3 className="card-title text-nowrap fs-2 fw-semibold">Daftar Obat</h3>
          <Link to={'/medicines'} className=" text-decoration-none text-nowrap fw-semibold">Lihat Semua</Link>
        </div>
        : <div className="d-flex flex-column flex-md-row gap-3 gap-md-0 justify-content-md-between align-items-md-center mb-4">

          <div className="position-relative mt-3 mt-md-0">
            <Input
              name={name}
              onChange={(e) => handleInput(e)}
              value={inputValue}
              type={'text'}
              placeholder={'Nama, Merk, Kode'}
              className={'rounded-5 ps-5 border-0 bg-white py-2'}
            />
            <img
              src={search}
              className="position-absolute searchIcon"
              alt="Search"
            />
          </div>

          <button
            type="button"
            onClick={() => setAddModal(true)}
            className="btn btn-primary rounded-3 btn-md text-white"
            style={{
              height: "2.8125rem",
              display: "flex",
              width: "13.25rem",
              padding: "0.25rem 0.625rem",
              alignItems: "center",
            }}
          >
            <img src={plus} alt="" className="me-2" />
            Tambah Produk Baru
          </button>
        </div>
      }

      <div
        className="table-responsive table-wrapper"
        style={{
          height: 'fit-content',
          minHeight: '13rem',
          maxHeight: `calc(100vh - 45rem)`
        }}>
        <table className="table table-borderless table-striped align-middle" >
          <thead className='sticky-top z-0 '>
            <tr>
              {thead?.map((item, index) => (
                <th
                  key={index}
                  scope="col">
                  {item}
                </th>
              ))
              }
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
    </div>
  )
}