import { useState } from "react";
import "./Input.css";

function TextArea({
  name,
  label,
  placeholder,
  test,
  errorMessage,
  onBlur,
  value,
  disabled,
  labelInput,
}) {
  const [valueInput, setValue] = useState(value);
  const [error, setError] = useState({ message: "", error: false });

  const handleChange = (e) => {
    const targetValue = e.target.value;
    const check = /^[A-Z].+/g.test(targetValue);

    if (check) {
      setValue(targetValue);
      setError({ message: "", error: false });
      onBlur({ value: targetValue, error: false });
    }

    if (!check) {
      setValue(targetValue);
      setError({ message: errorMessage, error: true });
      onBlur({ value: targetValue, error: true });
    }
  };

  const handleBlur = (e) => {
    const targetValue = e.target.value;
    const check = /^[A-Z].+/g.test(targetValue);

    if (check) {
      setValue(targetValue);
      setError({ message: "", error: false });
      onBlur({ value: targetValue, error: false });
    }

    if (!check) {
      setValue("");
      setError({ message: errorMessage, error: true });
      onBlur({ value: "", error: true });
    }
  };

  return (
    <div className={`input_container`}>
      {labelInput && (
        <label htmlFor={name} className={`label`}>
          {label}
        </label>
      )}
      <br />
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={valueInput}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`input input-light textarea`}
        disabled={disabled}
      ></textarea>
      {error.error && <p className={`input_error`}>{error.message}</p>}
    </div>
  );
}

export default TextArea;
