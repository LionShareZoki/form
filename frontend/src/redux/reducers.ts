import { SUBMIT_FORM, RESET_FORM, MyFormData, FormAction } from "./formTypes";

const initialState: { formData: MyFormData } = {
  formData: {
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    isChecked: false,
  },
};

const formReducer = (state = initialState, action: FormAction) => {
  switch (action.type) {
    case SUBMIT_FORM:
      return {
        ...state,
        formData: action.payload,
      };
    case RESET_FORM:
      return {
        ...state,
        formData: initialState.formData,
      };
    default:
      return state;
  }
};

export default formReducer;
