import Input from "./Input";

function ConfirmPassword({ onBlur, password, value, disabled, label }) {
  const test = (value) => {
    let check = password.value === value;
    return check;
  };

  return (
    <div>
      <Input
        type="password"
        name="confirm-password"
        label="Confirmez le mot de passe :"
        test={test}
        errorMessage="Veuillez entrer le même mot de passe que précédement"
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        labelInput={label}
      />
    </div>
  );
}

export default ConfirmPassword;
