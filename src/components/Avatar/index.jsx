import avatar from '../../assets/icon/avatar.svg'

export const Avatar = () => {
  return(
    <>
      <figure className="m-0 d-inline-flex gap-2 align-items-center">
        <img src={avatar} alt='Avatar' />
        <div>
          <p className="fw-bold m-0">Tony Stark</p>
          <p className="m-0">Admin</p>
        </div>
      </figure>
    </>
  )
}