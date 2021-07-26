import Input from "./Input";

function Pseudo({ onBlur, value, disabled, label }) {
  const test = (value) => {
    const check = /[a-zA-z0-9]+/g.test(value);
    return check;
  };

  return (
    <div>
      <Input
        type="text"
        name="pseudo"
        label="Entrez un peudo :"
        placeholder="ex : Nicolas"
        test={test}
        errorMessage="Le pseudo doit contenir au moins une lettre ou un chiffre. Ex : Nicolas48"
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        labelInput={label}
      />
    </div>
  );
}

export default Pseudo;
