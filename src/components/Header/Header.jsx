import styles from "./Header.module.css";
// import logo from "./logo.svg";
export default function Header() {
  return <img className={styles["img"]} src="./logo.svg"></img>;
}
