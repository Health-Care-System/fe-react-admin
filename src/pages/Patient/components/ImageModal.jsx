import { Button } from "../../../components/ui/Button";
import { Transparent } from "../../../components/ui/Container";
import ImageWithFallback from "../../../components/Errors/ImageWithFallback";
import brokenImg from '../../../assets/image/noImage.png';
import closeIcon from '../../../assets/icon/close-modal.svg'

export const ImageModal = ({ source, closeModal }) => {
  return (
    <>
      <Transparent disabled={true}>
        <Button
          onClick={closeModal}
          type="button"
          className="close-modal">
          <img src={closeIcon} width={50} height={50} alt="Close Modal" />
        </Button>
        <div className="image-modal mx-auto">
          <ImageWithFallback fallback={brokenImg} width={348} src={source} />
        </div>
      </Transparent>
    </>

  )
}