// Packages
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import { Column } from "../components/Column";
import { StatusBtn } from "../components/StatusBtn";
import { ImageModal } from "../components/ImageModal";
import { Button } from "../../../components/ui/Button";
import { formattedDate } from "../../../utils/helpers";
import { Transparent } from "../../../components/ui/Container";
import { CustomModal } from "../../../components/ui/Modal/Modal";

// Utility & services
import client from "../../../utils/auth";
import {
  theadDoctorDetails,
  theadDrugDetails
} from "../../../utils/dataObject";
import {
  useGetAllDoctorTransaction,
  useGetAllDrugTransaction,
  useGetPatientsDetails
} from "../../../services/patient-services";

export const PatientDetails = () => {
  const [modalDelete, setModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  let { userId } = useParams();
  const {
    dataUser,
    isPending,
  } = useGetPatientsDetails(userId);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await client.delete(`/admins/user/${userId}`);
      if (res?.status === 200) {
        navigate('/patients/data')
        toast.success('Anda berhasil menghapus pasien!', {
          delay: 800
        });
      } else {
        throw new Error('Gagal menghapus data pasien!');
      }
    } catch (error) {
      toast.error(error.message, {
        delay: 800
      });
    } finally {
      setLoading(false);
      setModalDelete(false);
    }
  }


  return (
    <>
      <section className="mx-4">
        <table className="row">
          <tbody className="col-12 col-lg-6">
            {dataUser?.slice(0, 4)?.map((item, index) => (
              <tr key={index} className="d-flex">
                <td className="fw-semibold fs-2 title-width">{item.label}</td>
                <td className="w-auto">
                  {isPending
                    ? <Skeleton height={20} width={200} />
                    : item.value
                  }
                </td>
              </tr>
            ))}
          </tbody>
          <tbody className="col-12 col-lg-6">
            {dataUser?.slice(4)?.map((item, index) => (
              <tr key={index} className=" d-flex">
                <td className=" fw-semibold fs-2 title-width">{item.label}</td>
                {isPending
                  ? <Skeleton height={20} width={200} />
                  : item.value
                }
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mx-4 mt-5 d-flex flex-column gap-5">
        <TableDoctorDetails />
        <TableDrugDetails />
      </section>

      <section className="d-flex justify-content-center gap-3 my-5 sticky-bottom z-0 bg-base py-5">
        <Link to={'/patients/data'} className="btn btn-primary text-white w-8 fw-semibold">
          Kembali
        </Link>
        <Button
          onClick={() => setModalDelete(true)}
          className={'btn-outline-primary w-8 fw-semibold border-2'}>Hapus</Button>
      </section>

      {modalDelete &&
        <Transparent
          disabled={true}
          className='min-vw-100 start-0 position-fixed end-0'
        >
          <CustomModal
            disabled={loading}
            title={'Hapus Pasien?'}
            content={'Apabila anda menghapus Pasien, maka data Pasien akan hilang'}
            confirmAction={handleDelete}
            cancelAction={() => setModalDelete(false)}
          />
        </Transparent>
      }
    </>
  )
}

const TableDoctorDetails = () => {
  const {
    data,
    refetch,
    isPending,
    isError
  } = useGetAllDoctorTransaction();

  return (
    <>
      <TableDetailsContainer
        thead={theadDoctorDetails}
        title={'Transaksi Konsultasi Dokter'}
      >
        <Column
          isError={isError}
          isPending={isPending}
          refetch={refetch}
          data={data}
          search={''}
          renderItem={(data, index) => {
            const date = formattedDate(data?.date);
            const subTotal = data?.total?.toLocaleString('ID-id');
            return (
              <tr className="text-nowrap" key={index}>
                <td>{data?.id}</td>
                <td>{data?.idDoctor}</td>
                <td>{data?.payment}</td>
                <td>{`Rp ${subTotal}`}</td>
                <td>{date}</td>
                <td>
                  <ImageModal />
                </td>
                <td className="d-flex justify-content-center">
                  <StatusBtn status={data?.status} />
                </td>
              </tr>
            )
          }
          }
        />
      </TableDetailsContainer>
    </>
  )
}
const TableDrugDetails = () => {
  const {
    data,
    refetch,
    isPending,
    isError
  } = useGetAllDrugTransaction();

  return (
    <>
      <TableDetailsContainer
        thead={theadDrugDetails}
        title={'Transaksi Pembelian Obat'}
      >
        <Column
          isError={isError}
          isPending={isPending}
          refetch={refetch}
          data={data}
          search={''}
          renderItem={(data, index) => {
            const date = formattedDate(data?.date);
            const subTotal = data?.total?.toLocaleString('ID-id');
            return (
              <tr className="text-nowrap" key={index}>
                <td>{data?.id}</td>
                <td>{data?.payment}</td>
                <td>{`Rp ${subTotal}`}</td>
                <td>{date}</td>
                <td>
                  <ImageModal />
                </td>
                <td className="d-flex justify-content-center">
                  <StatusBtn status={data?.status} />
                </td>
              </tr>
            )
          }
          }
        />
      </TableDetailsContainer>
    </>
  )
}

const TableDetailsContainer = ({ thead, title, children }) => {
  return (
    <>
      <div>
        <h6 className="fw-semibold fs-2 m-0 mb-2">{title}</h6>
        <div className=" table-responsive table-wrapper" style={{ maxHeight: '15rem' }}>
          <table className="table table-borderless table-striped" >
            <thead className=' sticky-top z-0'>
              <tr>
                {thead?.map((item, index) => (
                  <th
                    key={index}
                    className={`fw-semibold text-nowrap ${item === 'Status' && 'text-center'}`}
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
    </>
  )
}