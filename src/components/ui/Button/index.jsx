// Note:
// 1. Cukup panggil komponen ini dengan dengan cara <Button className="" id="" type="" onClick={() => {}} > Children </Button>

export const Button = ({
  children,
  className,
  onClick,
  type,
  id,
}) => {
  return (
    <button
      type={type || "button"}
      className={`btn ${className}`}
      id={id}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
