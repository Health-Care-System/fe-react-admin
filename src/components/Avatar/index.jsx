import avatar from '../../assets/icon/user.png'

export const Avatar = ({ name, role }) => {
  return(
    <>
      <figure className="m-0 d-inline-flex gap-2 align-items-center">
        <img width={48} height={48} src={avatar} alt='Avatar' />
        <div>
          <p className="m-0 fs-2">{name}</p>
          <p className="m-0">{role}</p>
        </div>
      </figure>
    </>
  )
}