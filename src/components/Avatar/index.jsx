import avatar from '../../assets/image/avatar.svg'

export const Avatar = () => {
  return(
    <>
      <figure className="m-0 d-inline-flex gap-2 align-items-center">
        <img src={avatar} alt='Avatar' />
        <div>
          <p className="m-0 fs-2">Bagaskara Setiawan</p>
          <p className="m-0">Admin</p>
        </div>
      </figure>
    </>
  )
}