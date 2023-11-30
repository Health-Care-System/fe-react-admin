import styles from './Container.module.css';

// Komponen ini bisa dipakai jika ingin membuat background transparan untuk popup modal
export const Transparent = ({ children, onClick, disabled }) => {
  return (
    <>
      <input 
        onClick={onClick}
        type='button'
        disabled={disabled}
        className={`${styles.backdropBlur} bg-black h-100 w-100 border-0`}>
      </input>
      {children}
    </>
  )
}