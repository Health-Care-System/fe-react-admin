import AddPhoto from '../../../assets/icon/AddPhoto.svg'
import { ErrorMsg } from '../../../components/Errors/ErrorMsg'
import { EditImageOptions } from '../../../components/ui/Modal/EditImageOptions'
export const EditImage = ({
  setClickImg,
  clickImg,
  imagePreview,
  setForm,
  data,
  handleImageChange,
  setImagePreview,
  errors
}) => {
  return (
    <>
      <div className="position-relative">
        {imagePreview
          ? 
          <>
          <div
            onClick={() => setClickImg(!clickImg)}
            className="d-flex mx-auto p-0 mb-3 ">
            <img
              src={imagePreview}
              alt="Preview"
              className={`mt-2 mx-auto img-fluid rounded ${!imagePreview && 'p-3 border-primary'}`}
              style={{
                maxWidth: "125px",
                border: `${imagePreview ? '1px solid black' : '1px dashed'}`,
              }}
            />
          </div>
          <div className=' text-center'>
            <ErrorMsg  msg={errors?.image} />
          </div>
          </>
          :
          <div className="col-sm-12 text-center">
            <label htmlFor="imageUpload" className="image-upload-label">
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={(e) => handleImageChange(e, 'put')}
                style={{ display: "none" }}
              />
              <img
                src={AddPhoto}
                alt="Placeholder"
                className="mt-2 img-fluid p-4 rounded border-primary"
                style={{
                  maxWidth: "125px",
                  border: "1px dashed",
                }}
              />
            </label>
            <ErrorMsg msg={errors.image} />
          </div>

        }

        {clickImg &&
          <EditImageOptions
            setForm={setForm}
            id={data?.id}
            setClickImg={setClickImg}
            handleImageChange={handleImageChange}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
        }
      </div>
    </>
  )
}
