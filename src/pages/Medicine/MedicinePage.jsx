// Packages
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

// Utils/service/hooks
import client from "../../utils/auth";
import useForm from "../../hooks/useForm";
import { theadAllMedicine } from "../../utils/dataObject";
import {
  convertMedicineFormData,
  getMedicineByName,
  handleDeleteMedicine,
  handleEditMedicineService,
  useGetAllMedicine
} from "../../services/medicine-service";
import {
  validateExtImage,
  validateFormIsChanges,
  validateMedicineForm
} from "../../utils/validation";
import useDebounce from "../../hooks/useDebounce";

// Components
import { EditImage } from "./components/EditImage";
import { Button } from "../../components/ui/Button";
import { RowTable } from "../../components/Table/RowTable";
import { ErrorMsg } from "../../components/Errors/ErrorMsg";
import { Transparent } from "../../components/ui/Container";
import { ImageModal } from "../Patient/components/ImageModal";
import { CustomModal } from "../../components/ui/Modal/Modal";
import "./drug-page.css";
import { PostImage } from "./components/PostImage";
import { MedicineTableContainer } from "./components/MedicineTableContainer";
import { Spinner, SpinnerSM } from "../../components/Loader/Spinner";

const initState = {
  modalImg: null,
  imageSrc: null,
  searchMedicine: '',
  offset: null,
}

export const MedicinePage = () => {
  const {
    form,
    setForm,
    handleInput,
    loading,
    setLoading
  } = useForm(initState)
  const [editedData, setEditedData] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [offset, setOffset] = useState(null);

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



  const handleModal = (table, offset) => {
    setEditModal(true);
    setEditedData(table);
    setOffset(offset)
  };
  const handleModalLink = (e, src) => {
    e.stopPropagation();
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
    setLoading(true);
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
      setLoading(false);
    }
  }

  // fungsi hapus delete produk
  const mutateDelete = useMutation({
    mutationFn: handleDeleteMedicine,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (newData) => {
      const pageIndex = data?.pages?.findIndex(item => item?.pagination?.offset === offset);
      queryClient.setQueryData(['allMedicines'], oldData => {
        if (oldData) {
          const updatedResults = [...oldData.pages];
          updatedResults[pageIndex].results = updatedResults[pageIndex].results.filter((result) => result?.id !== newData.id);
          return {
            ...oldData,
            pages: updatedResults
          };
        }

        return oldData;
      });

      toast.success('Anda berhasil menghapus produk')
    },
    onSettled: () => {
      setEditModal(false);
    }
  });

  const handleDelete = async (med_id, offset) => {
    mutateDelete.mutate({
      id: med_id,
      offset: offset
    })
  };

  // Search feature
  const [filterData, setFilterData] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const debouncedValue = useDebounce(form?.searchMedicine, 500);
  useEffect(() => {
    if (debouncedValue !== '') {
      getMedicineByName(
        setLoadingSearch,
        setFilterData,
        debouncedValue
      )
    }
  }, [debouncedValue]);

  const handleEditMedicine = (data) => {
    handleEditMedicineService(data, queryClient, setEditModal)
  }

  return (
    <>
      <MedicineTableContainer
        name={'searchMedicine'}
        handleInput={handleInput}
        inputValue={form.searchMedicine}
        thead={theadAllMedicine}
        setAddModal={setAddModal}>
        <RowTable
          ifEmpty={"Tidak ada data obat!"}
          isError={isError}
          isFetch={isFetchingNextPage}
          isDebounce={debouncedValue !== ''}
          data={debouncedValue !== '' ? filterData : data?.pages}
          totalRow={8}
          reffer={ref}
          refetch={refetch}
          isPending={isPending || loadingSearch}
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
                <td>{data?.stock}</td>
                <td>{`Rp. ${data?.price.toLocaleString('id-ID')}`}</td>
                <td>
                  {!data?.image
                    ? '-'
                    : <Button
                      className={'p-0 text-primary fw-semibold'}
                      onClick={(e) => handleModalLink(e, data?.image)}>Link</Button>
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
          offset={form.offset}
          loading={loading || mutateDelete.isPending}
          handleDelete={handleDelete}
          handleAction={handleEditMedicine}
          setEditModal={setEditModal} />
      }
      {addModal &&
        <MedicineModal
          offset={form.offset}
          title={'Tambah Produk'}
          loading={loading || mutateDelete.isPending}
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

const MedicineModal = ({
  title,
  data,
  setEditModal,
  forModal,
  loading,
  handleAction,
  handleDelete,
  offset
}) => {
  const [clickImg, setClickImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(data?.image);
  let initState = {
    id: data?.id ?? '',
    code: data?.code ?? '',
    name: data?.name ?? '',
    merk: data?.merk ?? '',
    category: data?.category ?? '',
    type: data?.type ?? '',
    stock: data?.stock ?? '',
    price: data?.price ?? '',
    details: data?.details ?? '',
    image: data?.image ?? null,
  }
  let errorState = {
    code: '',
    name: '',
    merk: '',
    category: '',
    type: '',
    stock: '',
    price: '',
    details: '',
    image: null,
  }
  const {
    form,
    setForm,
    handleInput,
    errors,
    setErrors
  } = useForm(initState, errorState);
  const imageUploadRef = useRef(null);
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  const queryClient = useQueryClient();
  const handleImageChange = (e, status) => {
    const file = e.target.files[0];
    if (file) {
      if (!validateExtImage(file)) {
        setErrors({
          ...errors,
          image: 'Hanya file dengan ekstensi .jpg, .jpeg, dan .png yang diperbolehkan.'
        });
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prevForm) => ({
            ...prevForm,
            image: file
          }));
          setErrors((prevErrors) => ({
            ...prevErrors,
            image: ''
          }))
          setImagePreview(reader.result);
          if (status === 'put') {
            handleEditImage(data?.id, file)
            queryClient.invalidateQueries({ queryKey: ['allMedicines']})
          }
        };

        reader.readAsDataURL(file);
      }
    } else {
      setImagePreview(null);
    }
  };
  
  const handleEditImage = async (id, file) => {
    const data = new FormData();
    data.append("image", file)
    try {
      const res = await client.put(`/admins/medicines/${id}/image`, data);
      if (res?.status === 200) {
      toast.success('Anda berhasil merubah gambar produk')
      }
    } catch (error) {
      toast.error('Gagal mengganti gambar baru, harap coba lagi!')
    } finally {
      setClickImg(false);
    }
  }

  const handlePlaceholderClick = () => {
    imageUploadRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateMedicineForm(form, setErrors)) {
      handleAction(form)
    }
  }

  useEffect(() => {
    const isChanged = validateFormIsChanges(form, data);
    setIsFormChanged(isChanged);
  }, [form, data]);

  const handleDeleteAction = () => {
    handleDelete(data?.id, offset);
    setDeleteConfirm(false);
  }

  return (
    <>
      {deleteConfirm &&
        <Transparent
          disabled={true}
          style={{ zIndex: 55 }}
        >
          <CustomModal
            title={'Hapus Produk?'}
            content={'Apabila anda menghapus Produk, data keseluruhan produk akan hilang'}
            confirmAction={handleDeleteAction}
            cancelAction={() => setDeleteConfirm(false)}
          />
        </Transparent>
      }
      <div
        className="modal-backdrop"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          zIndex: '50'
        }}>
      </div>
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        style={{ display: "block", zIndex: '51' }}
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
              {forModal === 'post'
                ? <PostImage 
                  handleImageChange={handleImageChange}
                  imageUploadRef={imageUploadRef}
                  handlePlaceholderClick={handlePlaceholderClick}
                  imagePreview={imagePreview}
                  errors={errors} />
                : <EditImage
                  setClickImg={setClickImg}
                  clickImg={clickImg}
                  imagePreview={imagePreview}
                  setForm={setForm}
                  data={data}
                  handleImageChange={handleImageChange}
                  setImagePreview={setImagePreview}
                  errors={errors}
                  />
                
              }
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
                    <ErrorMsg msg={errors.code} />
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
                    <ErrorMsg msg={errors.name} />
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
                    <ErrorMsg msg={errors.merk} />
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
                    <ErrorMsg msg={errors.category} />
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
                    <ErrorMsg msg={errors.type} />
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
                    <ErrorMsg msg={errors.stock} />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="price" className="col-sm-3 col-form-label">
                    Harga
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      value={form.price}
                      onChange={handleInput}
                    />
                    <ErrorMsg msg={errors.price} />
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
                    <ErrorMsg msg={errors.details} />
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <div className="d-flex flex-row gap-3 justify-content-start w-100 align-items-center">
                <Button
                  disabled={!isFormChanged || loading}
                  onClick={handleSubmit}
                  style={{ width: '7.125rem' }}
                  className={'btn-primary text-white fw-semibold'}
                >
                {loading
                  ? <SpinnerSM />
                  : 'Simpan'
                }
                </Button>
                <Button
                  disabled={forModal === 'post' || loading}
                  type="button"
                  onClick={() => setDeleteConfirm(true)}
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


