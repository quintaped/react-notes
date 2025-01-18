import { useEffect, useReducer, useRef } from "react";
import Input from "../Input/Input";
import styles from "./JournalForm.module.css";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";
import Button from "../Button/Button";

function JournalForm({ onSubmit, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { values, isValid, isFormReadyToSubmit } = formState;

  useEffect(() => {
    if (!data) {
      dispatchForm({
        type: "CLEAR_FORM",
      });
    }
    dispatchForm({
      type: "SET_VALUE",
      payload: {
        ...data,
      },
    });
  }, [data]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      console.log(values);
      onSubmit(values);
      dispatchForm({
        type: "SET_VALUE",
      });
      dispatchForm({
        type: "CLEAR_FORM",
      });
    }
  }, [isFormReadyToSubmit, values]);

  const focusEror = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let timerId;
    if (!isValid.title || !isValid.date || !isValid.text) {
      focusEror(isValid);
      timerId = setTimeout(() => {
        dispatchForm({
          type: "RESET_VALIDITY",
        });
      }, 2000);
    }
  }, [isValid]);

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: {
        [e.target.name]: e.target.value,
      },
    });
  };
  const addJournalItem = (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const formProps = Object.fromEntries(formData.entries());
    // let isFormValid=true;
    // if(!formProps.title?.trim().length){
    //   isFormValid=false;
    // }
    dispatchForm({ type: "SUBMIT" });
  };

  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();

  const deleteItem = () => {
    onDelete(data.id);
    dispatchForm({ type: "CLEAR_FORM" });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div className={styles["journal-form-row"]}>
        <Input
          type="text"
          name="title"
          placeholder="input name notes"
          className={styles["input"]}
          apperience="title"
          ref={titleRef}
          value={values.title}
          isValid={!isValid.title}
          onChange={onChange}
        ></Input>
        {data?.id && (
          <button className={styles.delete} type="button" onClick={deleteItem}>
            <img src="/delete.svg" alt="Удалить запись" />
          </button>
        )}
      </div>
      <div className={styles["journal-form-row"]}>
        <Input
          type="date"
          name="date"
          isValid={!isValid.date}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ""
          }
          ref={dateRef}
          apperience="date"
          className={styles["input-cal"]}
          onChange={onChange}
        ></Input>
      </div>
      <div className={styles["journal-form-row"]}>
        <Input
          type="text"
          name="tag"
          value={values.tag}
          placeholder="input tag"
          onChange={onChange}
        ></Input>
      </div>
      <div className={styles["journal-form-row"]}>
        <textarea
          name="text"
          value={values.text}
          onChange={onChange}
          rows="10"
          cols="30"
          ref={textRef}
          placeholder="input text notes"
          className={cn(styles["input"], {
            [styles["invalid"]]: !isValid.text,
          })}
        ></textarea>
      </div>
      <Button>Submit</Button>
    </form>
  );
}
export default JournalForm;
