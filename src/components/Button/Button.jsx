import styles from "./Button.module.css";

export default function Button({ children, onClick, ...props }) {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`${styles["btn"]} ${styles["btn-blue"]}`}
    >
      {children}
    </button>
  );
}
