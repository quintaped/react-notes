import CardBtn from "../CardBtn/CardBtn";
import JournalItem from "../JournalItem/JournalItem";
import styles from "./JournalList.module.css";

const JournalList = ({ items, setItem }) => {
  return (
    <div className={styles["journal-list"]}>
      {items.map((item) => (
        <CardBtn key={item.id} onClick={() => setItem(item)}>
          <JournalItem {...item}></JournalItem>
        </CardBtn>
      ))}
    </div>
  );
};
export default JournalList;
