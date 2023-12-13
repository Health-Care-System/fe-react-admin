import { ErrorMsg } from "../../../components/Errors/ErrorMsg"
import AddPhoto from '../../../assets/icon/AddPhoto.svg'


export const PostImage = ({
  handleImageChange,
  imageUploadRef,
  handlePlaceholderClick,
  imagePreview,
  errors
}) => {
  return (
    <div className="mb-3 row">
      <div className="col-sm-12 text-center">
        <input
          type="file"
          className="form-control"
          id="imageUpload"
          accept="image/*"
          onChange={(e) => handleImageChange(e, 'post')}
          ref={imageUploadRef}
          style={{ display: "none" }}
        />
        <div
          className="d-flex align-items-center justify-content-center w-100"
          onClick={handlePlaceholderClick}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 mx-auto img-fluid border-primary rounded p-1"
              style={{
                maxWidth: "125px",
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
                border: "1px dashed",
              }}
            />
          )}
        </div>
        <ErrorMsg msg={errors.image} />
      </div>
    </div>
  )
}