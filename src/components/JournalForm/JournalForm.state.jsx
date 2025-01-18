export const INITIAL_STATE = {
  isFormReadyToSubmit: false,
  values: {
    title: "",
    date: "",
    tag: "",
    text: "",
  },
  isValid: { title: true, date: true, text: true },
};
export function formReducer(state, action) {
  switch (action.type) {
    case "CLEAR_FORM":
      return {
        ...state,
        isFormReadyToSubmit: false,
        values: INITIAL_STATE.values,
      };
    case "RESET_VALIDITY":
      return {
        ...state,
        isValid: INITIAL_STATE.isValid,
      };
    case "SUBMIT": {
      console.log(state.values);
      const titleValidity = state.values.title?.trim().length;
      const dateValidity = state.values.date;
      const textValidity = state.values.text?.trim().length;
      return {
        ...state,
        isValid: {
          title: titleValidity,
          date: dateValidity,
          text: textValidity,
        },
        isFormReadyToSubmit: titleValidity && dateValidity && textValidity,
      };
    }
    case "SET_VALUE":
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    case "SET_FORM":
      return {};
  }
}
