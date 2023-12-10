// Note:
// 1. Cukup panggil komponen ini dengan dengan cara <Button className="" id="" type="" onClick={() => {}} > Children </Button>

export const Button = ({
  children,
  className,
  onClick,
  type,
  id,
  disabled,
  style,
}) => {
  return (
    <button
      type={type || "button"}
      className={`btn ${className}`}
      id={id}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};
