import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { MyFormData } from "../redux/formTypes";

export const getUserDataFromStore = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formData: MyFormData = useSelector(
    (state: RootState) => state.form.formData
  );

  return formData;
};
