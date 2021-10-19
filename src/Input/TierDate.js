import Input from "./Input";

function TierDate({ onBlur, value, disabled, label }) {
  const test = (value) => {
    const check = /^\d+-\d+$/g.test(value);
    return check;
  };

  return (
    <div>
      <Input
        type="text"
        name="date"
        label="Entrez la date récupérée sur smogon : "
        placeholder="ex: 2021-05"
        test={test}
        errorMessage="La date doit doit ête au format : année-mois. Ex : 2021-05"
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        labelInput={label}
      />
    </div>
  );
}

export default TierDate;
