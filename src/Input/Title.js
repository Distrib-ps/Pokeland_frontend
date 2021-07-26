import Input from "./Input";

function Title({ onBlur, value, disabled, label }) {
  const test = (value) => {
    const check = /^[A-Z][a-z 0-9]+/g.test(value);
    return check;
  };

  return (
    <div>
      <Input
        type="text"
        name="title"
        label="Entrez un Titre :"
        placeholder=""
        test={test}
        errorMessage="Le Titre doit contenir au moins une lettre ou un chiffre et commencer par majuscule."
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        labelInput={label}
      />
    </div>
  );
}

export default Title;
