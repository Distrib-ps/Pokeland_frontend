import Input from "./Input";

function Email({ onBlur, value, disabled, label }) {
  const test = (value) => {
    const check =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(
        value
      );
    return check;
  };

  return (
    <div>
      <Input
        type="email"
        name="email"
        label="Entrez votre email :"
        placeholder="ex : exemple@gmail.com"
        test={test}
        errorMessage="Vous devez entrer un email valide. Ex : exemple@gmail.com"
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        labelInput={label}
      />
    </div>
  );
}

export default Email;
