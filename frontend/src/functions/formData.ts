import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

export const getUserDataFromStore = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formData = useSelector((state: RootState) => state.form["formData"]);

  return formData;
};
