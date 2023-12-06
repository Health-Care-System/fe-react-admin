import { Button } from "../ui/Button"

export const ErrorStatus = ({ title, action}) => {
  return (
    <div className="gap-1 d-flex flex-column justify-content-center">
      <p className="text-center">{title}</p>
      <Button
        onClick={action}
        style={{ width: 'fit-content'}}
        className={'btn-primary text-white mx-auto text-center text-nowrap'}
      >
        Coba Lagi
      </Button>
    </div>
  )
}
