import "./FormInput.scoped.css";
import React, { useState } from "react";
import {
  validateEmail,
  validatePhone,
  validateText,
} from "../../services/validationService";

interface FormInputProps {
  name: string;
  id: string;
  type: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function FormInput(props: FormInputProps) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    props.onChange(inputValue);
    validate(inputValue);
  };

  const validate = (inputValue: string) => {
    let error = null;
    switch (props.type) {
      case "tel":
        error = validatePhone(inputValue);
        break;
      case "email":
        error = validateEmail(inputValue);
        break;
      default:
        error = validateText(inputValue);
    }
    setError(error);
  };

  return (
    <div className="formInputDiv">
      <div className="labelDiv">
        <label htmlFor="firstName">{props.label}</label>
      </div>
      <input
        className={error ? "errorFormInput" : "validFormInput"}
        name={props.name}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleChange}
        // I removed 'required' so that my validation can work properly
      ></input>
      <div className={`error ${error ? "active" : ""}`}>{error}</div>
    </div>
  );
}

export default FormInput;
