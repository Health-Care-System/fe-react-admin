/* 
Note:
1. Cara pemanggilan jika ingin bubble berada di sebelah kiri: className="bg-success-subtle rounded-top-3 rounded-start-3 align-self-end"
2. Cara pemanggilan jika ingin bubble berada di sebelah kanan: className="bg-transparent rounded-top-3 rounded-end-3"
*/

export const Bubble = ({ text, author }) => {
  const className =
    author === "user"
      ? "bg-transparent rounded-top-3 rounded-end-3"
      : "bg-success-subtle rounded-top-3 rounded-start-3 align-self-end";

  return (
    <div
      className={`bubble d-flex align-items-baseline px-1 py-1 ${className}`}
    >
      <h5 className="opacity-75 text-black fs-4 m-0 px-3 py-2">{text}</h5>
    </div>
  );
};
