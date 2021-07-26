import { useState } from "react";

export default function File({ name, children, hidden, disabled, onChange }) {
  const [error, setError] = useState({ message: "", value: false });

  const handleChange = ({ target: { files } }) => {
    const fileUpload = files[0];

    if (fileUpload) {
      if (
        fileUpload.type === "image/png" ||
        fileUpload.type === "image/jpg" ||
        fileUpload.type === "image/jpeg"
      ) {
        setError({ message: "", value: false });
        onChange({ value: fileUpload, error: false });
      } else {
        setError({
          message:
            "Le format de fichier ne correspond pas, seulement les fichiers jpeg, jpg et png sont acceptés et ne doit pas dépasser XMB.",
          value: true,
        });
        onChange({ value: "", error: false });
      }
    } else {
      setError({
        message:
          "Le format de fichier ne correspond pas, seulement les fichiers jpeg, jpg et png sont acceptés et ne doit pas dépasser XMB.",
        value: true,
      });
      onChange({ value: "", error: false });
    }
  };

  return (
    <div className={``}>
      <label htmlFor={name} className={`label`}>
        {children}
      </label>
      <input
        type="file"
        id={name}
        onChange={handleChange}
        className={``}
        hidden={hidden}
        disabled={disabled}
      />
      {error.value && <p className="input_error">{error.message}</p>}
    </div>
  );
}
