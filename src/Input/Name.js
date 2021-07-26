import Input from "./Input";

function Name({ onBlur, value, disabled, label }) {
  const test = (value) => {
    const check = /[a-zA-z0-9]+/g.test(value);
    return check;
  };

  return (
    <div>
      <Input
        type="text"
        name="name"
        label="Entrez un Nom :"
        placeholder=""
        test={test}
        errorMessage="Le pseudo doit contenir au moins une lettre ou un chiffre."
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        labelInput={label}
      />
    </div>
  );
}

export default Name;
