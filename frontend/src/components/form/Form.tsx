import Button from "../button/Button";
import FormInput from "../form-input/FormInput";
import "./Form.scoped.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitForm, resetForm } from "../../redux/formActions";
import { RootState } from "../../redux/rootReducer";
import postUserData from "../../apiHandlers/formApiHandler";
import { getUserDataFromStore } from "../../functions/formData";

function Form() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);
  const data = getUserDataFromStore();
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckboxInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsChecked(!isChecked);
    setError(null);
    const { checked } = event.target;
    dispatch(submitForm({ ...formData, isChecked: checked }));
  };

  const validate = () => {
    if (!isChecked) {
      setError("Confirm before saving.");
    } else {
      setError(null);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    dispatch(submitForm({ ...formData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = Object.entries(formData).every(([key, value]) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      } else if (typeof value === "boolean") {
        return true;
      }
      return false;
    });

    if (isChecked && isFormValid) {
      dispatch(submitForm(formData));
      postUserData("http://localhost:5432/api/users", data);
      console.log(data);
      dispatch(resetForm());
      setIsChecked(false);
    } else {
      setError("Please fill with valid data.");
    }
  };

  return (
    <div className="formWrapper">
      <form onSubmit={handleSubmit}>
        <FormInput
          name="firstName"
          id="firstName"
          type="text"
          placeholder="First Name"
          label="First Name"
          value={formData.firstName}
          onChange={(value) => handleInputChange("firstName", value)}
        />
        <FormInput
          name="lastName"
          id="lastName"
          type="text"
          placeholder="Last Name"
          label="Last Name"
          value={formData.lastName}
          onChange={(value) => handleInputChange("lastName", value)}
        />
        <FormInput
          name="address"
          id="address"
          type="text"
          placeholder="Address"
          label="Address"
          value={formData.address}
          onChange={(value) => handleInputChange("address", value)}
        />
        <FormInput
          name="phone"
          id="phone"
          type="tel"
          placeholder="Phone"
          label="Phone"
          value={formData.phone}
          onChange={(value) => handleInputChange("phone", value)}
        />
        <FormInput
          name="email"
          id="email"
          type="email"
          placeholder="Email"
          label="Email"
          value={formData.email}
          onChange={(value) => handleInputChange("email", value)}
        />
        <div className="formInputDivCheckbox">
          <label htmlFor="checkbox">Confirm:</label>
          <input
            className="checkbox"
            name="checkbox"
            id="checkbox"
            type="checkbox"
            onChange={handleCheckboxInputChange}
            onBlur={validate}
            required
            checked={isChecked}
          ></input>
        </div>

        <div className={`error ${error ? "active" : ""}`}>{error}</div>

        <div className="buttonDiv">
          <Button type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Form;
