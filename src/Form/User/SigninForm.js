import { useState, useContext } from "react";
import "../Form.css";
import Email from "../../Input/Email";
import Password from "../../Input/Password";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../Contexts/UserContext";
import GoogleSignin from "./GoogleSignin";

function SigninForm({ closePopUp }) {
  const [email, setEmail] = useState({
    value: "",
    error: true,
  });
  const [password, setPassword] = useState({
    value: "",
    error: true,
  });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { signinUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.error || password.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = {
        email: email.value,
        password: password.value,
      };

      signinUser(body, setError, setSuccess);
    }
  };

  return (
    <div className={`form form-light`}>
      <div className={`form_header`}>
        <h3>Connectez-vous !</h3>
        <Button onClick={closePopUp}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        <Email onBlur={setEmail} value="" disabled={false} label={true} />
        <Password onBlur={setPassword} value="" disabled={false} label={true} />
        <Button>Connexion</Button>
      </form>
      <GoogleSignin onError={setError} onSuccess={setSuccess} />
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
    </div>
  );
}

export default SigninForm;
