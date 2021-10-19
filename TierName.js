import Input from "./Input";

function TierName({ onBlur, value, disabled, label }) {
  const test = (value) => {
    const check = /^[a-z][a-z0-9]+-\d+$/g.test(value);
    return check;
  };

  return (
    <div>
      <Input
        type="text"
        name="name"
        label="Entrez le nom récupéré sur smogon : "
        placeholder="ex: gen8ou-1825"
        test={test}
        errorMessage="Le nom doit doit ête au format : nom-id. Ex: gen8ou-1825"
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        labelInput={label}
      />
    </div>
  );
}

export default TierName;
