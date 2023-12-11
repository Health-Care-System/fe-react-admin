import "./Notif.css";
import { Button } from "../ui/Button";

export const Notification = () => {
  return (
    <div className="w-100 bg-white notif-modal rounded-3">
      <div className="d-flex flex-nowrap gap-3 align-items-center p-2 rounded-top-3 flex-row justify-content-between bg-neutral-300">
        <h5 className="fw-semibold m-0 fs-2 text-royal-blue">Notifikasi</h5>
        <Button className="m-0 text-primary fw-semibold">
          Tandai semua sudah dibaca
        </Button>
      </div>

      <div className="pb-2 bg-white rounded-2">
        <div
          className="bg-white overflow-y-scroll pt-2 d-flex flex-column rounded-3"
          style={{ minHeight: "14rem", maxHeight: "14rem" }}
        >
          <p className="text-center fw-semibold text-secondary my-auto border-bottom pb-1 mx-4">
            Belum ada pemberitahuan baru!
          </p>
        </div>
      </div>
    </div>
  );
};