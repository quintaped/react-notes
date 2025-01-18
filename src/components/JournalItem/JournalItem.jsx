import styles from "./JournalItem.module.css";
const JournalItem = ({ date, title, text }) => {
  const formatedDate = new Intl.DateTimeFormat("uk-UA").format(date);
  return (
    <>
      <h2 className={styles["journal-item__header"]}>Title: {title}</h2>

      <div className={styles["journal-item__date"]}>Date: {formatedDate}</div>
      <div className={styles["journal-item__text"]}>Text: {text}</div>
    </>
  );
};
export default JournalItem;
