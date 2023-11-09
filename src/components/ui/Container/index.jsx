import styles from './Container.module.css';

// Komponen ini bisa dipakai jika ingin membuat background transparan untuk popup modal
export const Transparent = ({ children, onClick }) => {
  return (
    <>
      <input 
        onClick={onClick}
        type='button'
        className={`${styles.backdropBlur} bg-black h-100 w-100 border-0`}>
      </input>
      {children}
    </>
  )
}