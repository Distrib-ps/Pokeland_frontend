import Input from "./Input";

function IdPokepast({ onBlur, value, disabled, label }) {
  const test = (value) => {
    const check = /[a-zA-Z0-9]/g.test(value);
    return check;
  };

  return (
    <div>
      <Input
        type="text"
        name="idPokepast"
        label="Entrez l'Id Pokepast :"
        placeholder=""
        test={test}
        errorMessage="L'id pokepast ne doit contenir que des lettres ou chiffres."
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        labelInput={label}
      />
    </div>
  );
}

export default IdPokepast;
