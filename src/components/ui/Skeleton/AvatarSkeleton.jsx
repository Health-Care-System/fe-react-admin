import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const AvatarSkeleton = () => {
  return (
    <>
      <figure className="m-0 d-inline-flex gap-2 align-items-center">
        <Skeleton circle width={48} height={48} />
        <div>
          <Skeleton width={140} height={20} />
          <Skeleton width={60} height={20} />
        </div>
      </figure>
    </>
  )
}
