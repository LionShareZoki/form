import "./FormInput.scoped.css";
import React, { useState } from "react";

interface FormInputProps {
  name: string;
  id: string;
  type: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  // validate: (value: T) => boolean; // TODO VALIDATION funkcija koja kaze jel podatak unutar ovog inputa validan ili ne
}

function FormInput(props: FormInputProps) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    props.onChange(inputValue);
    validate(inputValue);
  };

  const validate = (inputValue: string) => {
    switch (props.type) {
      case "tel":
        if (inputValue.trim() === "") {
          setError("Required");
        } else if (!/^\+\d{10}$/.test(inputValue)) {
          setError("Bad format");
        } else {
          setError(null);
        }
        break;
      case "email":
        if (inputValue.trim() === "") {
          setError("Required");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
          setError("Bad format");
        } else {
          setError(null);
        }
        break;
      default:
        if (inputValue.trim() === "") {
          setError("Required");
        } else {
          setError(null);
        }
    }
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
        required
      ></input>
      <div className={`error ${error ? "active" : ""}`}>{error}</div>
    </div>
  );
}

export default FormInput;
