import React, { useState, useEffect } from "react";
import deleteIcon from "../../assets/icon/delete-icon.svg";
import search from "../../assets/icon/round-search.svg";
import plus from "../../assets/icon/count_plus.svg";

import "./drug-page.css";
import client from "../../utils/auth";
// import axios from "axios";

export const DrugPage = () => {
  const [formData, setFormData] = useState({
    image: null,
    code: "",
    name: "",
    merk: "",
    category: "",
    type: "",
    stock: "",
    price: 0,
  });

  const [dataArray, setDataArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get("/admins/medicines");
        console.log("API Response:", response.data);
        setDataArray(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  // const handleSave = () => {
  //   alert("handleSave called");
  //   setDataArray([...dataArray, { ...formData }]);
  //   setFormData({
  //     image: null,
  //     code: "",
  //     name: "",
  //     merk: "",
  //     category: "",
  //     type: "",
  //     stock: "",
  //     price: 0,
  //   });
  // };

  const handleSave = () => {
    client
      .post("/admins/medicines", setFormData)
      .then((res) => {
        setFormData((prevData) => [...prevData, res.data]);
        alert("Anda berhasil menambahkan produk");
        setFormData({
          image: null,
          code: "",
          name: "",
          merk: "",
          category: "",
          type: "",
          stock: "",
          price: 0,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (index) => {
    const newDataArray = [...dataArray];
    newDataArray.splice(index, 1);
    setDataArray(newDataArray);
  };

  const filteredData = dataArray.filter((data) => {
    const searchString = searchQuery.toLowerCase();
    return (
      data.code.toLowerCase().includes(searchString) ||
      data.name.toLowerCase().includes(searchString) ||
      data.merk.toLowerCase().includes(searchString) ||
      data.category.toLowerCase().includes(searchString) ||
      data.type.toLowerCase().includes(searchString) ||
      data.stock.toString().includes(searchString) ||
      data.price.toString().includes(searchString)
    );
  });

  return (
    <>
      <div className="pe-2">
        <div className="d-flex justify-content-between pb-2 mx-3">
          <input
            type="text"
            className="search rounded-5"
            style={{
              backgroundColor: "##F5F5F5",
              backgroundImage: `url(${search})`,
              backgroundSize: "24px 24px",
              backgroundPosition: "left 10px center",
              backgroundRepeat: "no-repeat",
              paddingRight: "1.875rem",
              paddingLeft: "2.62rem",
              marginBottom: "0",
              height: "2.5rem",
              border: "1px solid #ced4da",
              transition: "border-color 0.2s",
              outline: "none",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="nama, kode, merk"
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
          />
          <button
            type="button"
            className="btn btn-primary rounded-3 btn-md text-white"
            style={{
              height: "2.8125rem",
              display: "flex",
              width: "13.25rem",
              padding: "0.25rem 0.625rem",
              alignItems: "center",
            }}
            data-bs-toggle="modal"
            data-bs-target="#ModalTambahProduct"
          >
            <img src={plus} alt="" className="me-2" />
            Tambah Produk Baru
          </button>
        </div>
        <div
          className="modal fade"
          id="ModalTambahProduct"
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
                    <label htmlFor="code" className="col-sm-3 col-form-label ">
                      code
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="code"
                        name="code"
                        value={formData.code}
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
                    <label htmlFor="merk" className="col-sm-3 col-form-label ">
                      merk
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="merk"
                        name="merk"
                        value={formData.merk}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="Katgori"
                      className="col-sm-3 col-form-label"
                    >
                      category
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="type" className="col-sm-3 col-form-label ">
                      type
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="stock" className="col-sm-3 col-form-label">
                      stock
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control "
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label htmlFor="price" className="col-sm-3 col-form-label">
                      price
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
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
                    className="btn btn-primary text-white"
                    data-bs-dismiss="modal"
                    onClick={handleSave}
                    style={{
                      width: "7.125rem",
                      height: "2.25rem",
                      padding: "0.5rem 0.75rem",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                    }}
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="btn btn-light text-primary ms-4 border-primary border-2"
                    style={{
                      width: "8.125rem",
                      height: "2.25rem",
                      padding: "0.5rem 0.75rem",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                    }}
                  >
                    Hapus Produk
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <table className="table table-borderless table-striped">
            <thead>
              <tr className="fw-bolder">
                <td>Kode</td>
                <td>Nama</td>
                <td>Merek</td>
                <td>Kategory</td>
                <td>Jenis</td>
                <td>Stok</td>
                <td>Harga</td>
                <td>Gambar</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={index}>
                  <td>{data.code}</td>
                  <td>{data.name}</td>
                  <td>{data.merk}</td>
                  <td>{data.category}</td>
                  <td>{data.type}</td>
                  <td>{data.stock}</td>
                  <td>{data.price}</td>
                  <td className="text-primary">
                    <button className="btn">Link</button>
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
