import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Pseudo from "../../Input/Pseudo";
import Email from "../../Input/Email";
import Password from "../../Input/Password";
import Button from "../../Button/Button";
import File from "../../Input/File";
import { UserContext } from "../../Contexts/UserContext";
import UserDeletePopUp from "./UserDeletePopUp";

function UserUpdate({ user }) {
  const [pseudo, setPseudo] = useState({
    value: user.pseudo,
    error: false,
  });
  const [email, setEmail] = useState({
    value: user.email,
    error: false,
  });
  const [password, setPassword] = useState({
    value: "Unmotdepassecaché",
    error: false,
  });
  const [file, setFile] = useState({ value: "", error: false });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });
  const [popup, setPopup] = useState(null);

  const { updateUser, token } = useContext(UserContext);

  const handleClosePopUp = () => {
    setPopup(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pseudo.error || email.error || password.error || file.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = new FormData();
      body.append("name", pseudo.value);
      body.append("email", email.value);
      body.append("password", password.value);
      body.append("role", user.role);
      body.append("file", file.value);

      updateUser(token, body, user._id, setError, setSuccess);
    }
  };

  const handleClick = () => {
    setDisabled(!disabled);
  };

  return (
    <div className={`user_update`}>
      <form onSubmit={handleSubmit}>
        <div className={`user_profile_header`}>
          <File
            name="file"
            hidden={true}
            disabled={disabled}
            onChange={setFile}
          >
            {user.profilePicture && user.profilePicture.includes("http") && (
              <span
                className={`user_profile_img`}
                style={{ backgroundImage: `url(${user.profilePicture})` }}
              ></span>
            )}
            {!user.profilePicture && (
              <span className={`user_profile_icon user_profile_icon-light`}>
                <FontAwesomeIcon icon={faUser} />
              </span>
            )}
            {user.profilePicture && !user.profilePicture.includes("http") && (
              <span
                className={`user_profile_img`}
                style={{
                  backgroundImage: `url(https://pokelandbackend-server.herokuapp.com/static/${user.profilePicture})`,
                }}
              ></span>
            )}
          </File>
          <Pseudo
            onBlur={setPseudo}
            value={pseudo.value}
            disabled={disabled}
            label={false}
          />
        </div>
        <span className={`user_profile_email`}>
          <Email
            onBlur={setEmail}
            value={email.value}
            disabled={disabled}
            labelInput={false}
          />
        </span>
        {user.password && (
          <span className={`user_profile_password`}>
            <Password
              onBlur={setPassword}
              value={password.value}
              disabled={disabled}
              labelInput={false}
            />
          </span>
        )}
        {!disabled && (
          <Button
            onClick={() => {
              return;
            }}
          >
            Modifier
          </Button>
        )}
      </form>
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
      <div className={`form_update`}>
        <Button onClick={handleClick}>
          {disabled ? "Modifier" : "Retour"}
        </Button>
        <Button
          onClick={() => {
            setPopup(true);
          }}
        >
          Supprimer
        </Button>
      </div>
      {popup && <UserDeletePopUp closePopUp={handleClosePopUp} />}
    </div>
  );
}

export default UserUpdate;
