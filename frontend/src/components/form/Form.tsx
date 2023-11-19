import Button from "../button/Button";
import FormInput from "../form-input/FormInput";
import "./Form.scoped.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitForm, resetForm } from "../../redux/formActions";
import { RootState } from "../../redux/rootReducer";
import postUserData from "../../services/apiHandlers/formApiHandler";
import { getUserDataFromStore } from "../../services/getFormData";

function Form() {
  const USER_API_ENDPOINT = "http://localhost:1010/api/users";
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form.formData);
  const userDataFromStore = getUserDataFromStore();
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    dispatch(submitForm({ ...formData, [name]: value }));
    setSubmissionSuccess(false);
    setIsEmailTaken(false);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    setError(null);
    const { checked } = event.target;
    dispatch(submitForm({ ...formData, isChecked: checked }));
  };

  const validateCheckbox = () => {
    if (!isChecked) {
      setError("Confirm before saving.");
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isFormValid = Object.entries(formData).every(([value]) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      } else if (typeof value === "boolean") {
        return true;
      }
      return false;
    });

    if (isChecked && isFormValid) {
      try {
        dispatch(submitForm(formData));
        await postUserData(USER_API_ENDPOINT, userDataFromStore);
        dispatch(resetForm());
        setIsChecked(false);
        setSubmissionSuccess(true);
        setError("");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error making post request:", error);
        if (error.response && error.response.status === 400) {
          setError("Error occurred while submitting data.");
        } else {
          setError("Error occurred while submitting data.");
        }
        setSubmissionSuccess(false);
      }
    } else {
      setError("Please fill in with valid data.");
      setSubmissionSuccess(false);
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
            onChange={handleCheckboxChange}
            onBlur={validateCheckbox}
            required
            checked={isChecked}
          ></input>
        </div>
        {isEmailTaken && (
          <div className="emailTakenError">Email is already taken.</div>
        )}
        <div className={`error ${error ? "active" : ""}`}>{error}</div>
        {submissionSuccess && (
          <div className="successMessage">Form submitted successfully!</div>
        )}

        <div className="buttonDiv">
          <Button type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Form;
