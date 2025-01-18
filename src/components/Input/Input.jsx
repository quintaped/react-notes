import cn from "classnames";
import { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(function Input(
  { className, isValid = false, apperience, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      {...props}
      className={cn(styles["input"], {
        [styles["invalid"]]: isValid,
        [styles["input-title"]]: apperience === "title",
      })}
    />
  );
});
export default Input;
