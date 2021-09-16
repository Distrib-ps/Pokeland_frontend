import Input from "./Input";

function TierSelectName({ onBlur, value, disabled, label }) {
  const test = (value) => {
    const check = /[a-zA-z0-9]+/g.test(value);
    return check;
  };

  return (
    <div>
      <Input
        type="text"
        name="name"
        label="Entrez un nom :"
        placeholder="ex: gen8ou"
        test={test}
        errorMessage="Le nom doit doit ête au format : "
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        labelInput={label}
      />
    </div>
  );
}

export default TierSelectName;
