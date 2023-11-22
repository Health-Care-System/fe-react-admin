import React, { useState } from "react";
import deleteIcon from "../../assets/icon/delete-icon.svg";
import search from "../../assets/icon/round-search.svg";
import plus from "../../assets/icon/count_plus.svg";

import "./drug-page.css";

export const DrugPage = () => {
  const [formData, setFormData] = useState({
    image: null,
    kode: "",
    name: "",
    merek: "",
    kategori: "",
    jenis: "",
    stok: "",
    harga: 0,
  });

  const [dataArray, setDataArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSave = () => {
    alert("handleSave called");
    setDataArray([...dataArray, { ...formData }]);
    setFormData({
      image: null,
      kode: "",
      name: "",
      merek: "",
      kategori: "",
      jenis: "",
      stok: "",
      harga: 0,
    });
  };

  const handleDelete = (index) => {
    const newDataArray = [...dataArray];
    newDataArray.splice(index, 1);
    setDataArray(newDataArray);
  };

  const filteredData = dataArray.filter((data) => {
    const searchString = searchQuery.toLowerCase();
    return (
      data.kode.toLowerCase().includes(searchString) ||
      data.name.toLowerCase().includes(searchString) ||
      data.merek.toLowerCase().includes(searchString) ||
      data.kategori.toLowerCase().includes(searchString) ||
      data.jenis.toLowerCase().includes(searchString) ||
      data.stok.toString().includes(searchString) ||
      data.harga.toString().includes(searchString)
    );
  });

  return (
    <>
      <div className="pe-2">
        <div className="d-flex justify-content-between pb-2">
          <button
            type="button"
            className="btn btn-dark rounded-3 btn-md"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <img src={plus} alt="" className="me-2" />
            Tambah Produk Baru
          </button>
          <input
            type="text"
            className="search rounded"
            style={{
              backgroundImage: `url(${search})`,
              backgroundSize: "36px 36px",
              backgroundPosition: "right 10px center",
              backgroundRepeat: "no-repeat",
              paddingRight: "1.875rem",
              paddingLeft: "0.62rem",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Name, Kode, Merek"
          />
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Tambah Produk
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body px-5">
                <div className="mb-3 row">
                  <div className="col-sm-9">
                    <input
                      type="file"
                      className="form-control"
                      id="imageUpload"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <form>
                  <div className="mb-3 row">
                    <label htmlFor="Kode" className="col-sm-3 col-form-label ">
                      Kode
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="Kode"
                        name="kode"
                        value={formData.kode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label htmlFor="name" className="col-sm-3 col-form-label">
                      Name
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="merek" className="col-sm-3 col-form-label ">
                      Merek
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="merek"
                        name="merek"
                        value={formData.merek}
                        onChange={handleInputChange}
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
                        id="kategori"
                        name="kategori"
                        value={formData.kategori}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="jenis" className="col-sm-3 col-form-label ">
                      Jenis
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="jenis"
                        name="jenis"
                        value={formData.jenis}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="stok" className="col-sm-3 col-form-label">
                      Stok
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control "
                        id="stok"
                        name="stok"
                        value={formData.stok}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label htmlFor="harga" className="col-sm-3 col-form-label">
                      Harga
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="number"
                        className="form-control"
                        id="harga"
                        name="harga"
                        value={formData.harga}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <div className="me-auto">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button type="button" className="btn btn-secondary ms-4">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <table className="table table-borderless">
            <thead>
              <tr className="fw-bolder">
                <td>Kode</td>
                <td>Nama</td>
                <td>Merek</td>
                <td>Kategori</td>
                <td>Jenis</td>
                <td>Stok</td>
                <td>Harga</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={index}>
                  <td>{data.kode}</td>
                  <td>{data.name}</td>
                  <td>{data.merek}</td>
                  <td>{data.kategori}</td>
                  <td>{data.jenis}</td>
                  <td>{data.stok}</td>
                  <td>{data.harga}</td>
                  <td>
                    <img
                      src={deleteIcon}
                      alt=""
                      onClick={() => handleDelete(index)}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
