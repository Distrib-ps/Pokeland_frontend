import { useState, useContext } from "react";
import "../Form.css";
import Email from "../../Input/Email";
import Pseudo from "../../Input/Pseudo";
import Password from "../../Input/Password";
import ConfirmPassword from "../../Input/ConfirmPassword";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../Contexts/UserContext";
import GoogleSignup from "./GoogleSignup";

function SignupForm({ closePopUp }) {
  const [pseudo, setPseudo] = useState({
    value: "",
    error: true,
  });
  const [email, setEmail] = useState({
    value: "",
    error: true,
  });
  const [password, setPassword] = useState({
    value: "",
    error: true,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: true,
  });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { signupUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      pseudo.error ||
      email.error ||
      password.error ||
      confirmPassword.error
    ) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = {
        name: pseudo.value,
        email: email.value,
        password: password.value,
      };

      signupUser(body, setError, setSuccess);
    }
  };

  return (
    <div className={`form form-light`}>
      <div className={`form_header`}>
        <h3>Inscrivez-vous !</h3>
        <Button onClick={closePopUp}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>
      <form onSubmit={handleSubmit}>
        <Pseudo onBlur={setPseudo} value="" disabled={false} label={true} />
        <Email onBlur={setEmail} value="" disabled={false} label={true} />
        <Password onBlur={setPassword} value="" disabled={false} label={true} />
        <ConfirmPassword
          onBlur={setConfirmPassword}
          password={password}
          value=""
          disabled={false}
          label={true}
        />
        <Button>Inscription</Button>
      </form>
      <GoogleSignup onError={setError} onSuccess={setSuccess} />
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
    </div>
  );
}

export default SignupForm;
