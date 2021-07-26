import Input from "./Input";

function Link({ onBlur, value, disabled, label }) {
  const test = (value) => {
    const check = /(https?:\/\/[^\s]+)/g.test(value);
    return check;
  };

  return (
    <div>
      <Input
        type="text"
        name="link"
        label="Entrez un Lien :"
        placeholder="Ex : http://wwww.exemple.com"
        test={test}
        errorMessage="Le lien ne correspond pas à une URL, ex : http://wwww.exemple.com"
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        labelInput={label}
      />
    </div>
  );
}

export default Link;
