import Input from "./Input";

function Password({ onBlur, value, disabled, label }) {
  const test = (value) => {
    const check =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/g.test(value);
    return check;
  };

  return (
    <div>
      <Input
        type="password"
        name="password"
        label="Entrez un mot de passe :"
        test={test}
        errorMessage="Le mot de passe doit être composé d'au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        labelInput={label}
      />
    </div>
  );
}

export default Password;
