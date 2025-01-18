import styles from "./CardBtn.module.css";

export default function CardBtn({ children, className, ...props }) {
  return (
    <button
      className={` ${styles["journal-add"]} ${styles["card-button"]}`}
      {...props}
    >
      {children}
    </button>
  );
}
