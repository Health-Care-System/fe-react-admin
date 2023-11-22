import "./CardStokObat.css";

export const StokObat = () => {
  return (
    <div className="card-stok-obat card shadow border-0">
      <div className=""></div>
      <div className="d-flex justify-content-center align-items-center mt-3 gap-5 justify-content-md-between justify-content-lg-center">
        <div className="d-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="105"
            height="129"
            viewBox="0 0 105 129"
            fill="none"
          >
            <mask id="path-1-inside-1_848_11946" fill="white">
              <path d="M21.967 0.466995C9.65139 12.7826 2.006 29.0005 0.342763 46.3378C-1.32048 63.6751 3.10213 81.0508 12.8517 95.4832C22.6012 109.916 37.0698 120.505 53.7747 125.434C70.4795 130.363 88.3791 129.324 104.402 122.497L75 53.5L21.967 0.466995Z" />
            </mask>
            <path
              
            />
          </svg>
        </div>

        <div className="d-flex flex-column align-items-start">
          <div className="d-flex flex-column align-items-start">
            <p className="nilai-riwayat">120</p>
            <p className="text-obat">jenis obat</p>
          </div>
          <div className="gap-3">
            <div className="d-flex align-items-center gap-2">
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  backgroundColor: "#D8243C",
                }}
              ></div>
              <p>Habis</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  backgroundColor: "#FDE155",
                }}
              ></div>
              <p>Menipis</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  backgroundColor: "#6FE188",
                }}
              ></div>
              <p>Tersedia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
