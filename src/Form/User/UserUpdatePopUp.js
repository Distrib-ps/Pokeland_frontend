import { useState, useContext } from "react";
import Button from "../../Button/Button";
import { UserContext } from "../../Contexts/UserContext";
import File from "../../Input/File";
import Pseudo from "../../Input/Pseudo";
import Email from "../../Input/Email";
import Password from "../../Input/Password";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTimes } from "@fortawesome/free-solid-svg-icons";
import Select from "../../Input/Select";

const optionsList = [
  "User",
  "Voice",
  "Rédacteur",
  "Moderateur",
  "Driver",
  "Owner",
];

function UserUpdatePopUp({ user, closePopUp }) {
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
  const [role, setRole] = useState(user.role);
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { updateUserAdmin, token } = useContext(UserContext);

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
      body.append("role", role);
      body.append("file", file.value);

      updateUserAdmin(token, body, user._id, setError, setSuccess);
    }
  };

  return (
    <div className={`form_popup`}>
      <div className={`form_popup_content form_popup-light`}>
        <form onSubmit={handleSubmit}>
          <div className={`form_header`}>
            <h3>Inscrivez-vous !</h3>
            <Button onClick={closePopUp}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </div>
          <div className={`user_profile_header`}>
            <File name="file" hidden={true} disabled={false} onChange={setFile}>
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
              disabled={false}
              label={false}
            />
          </div>
          <span className={`user_profile_email`}>
            <Email
              onBlur={setEmail}
              value={email.value}
              disabled={false}
              labelInput={false}
            />
          </span>
          {user.password && (
            <span className={`user_profile_password`}>
              <Password
                onBlur={setPassword}
                value={password.value}
                disabled={false}
                labelInput={false}
              />
            </span>
          )}
          <span>
            <Select optionsList={optionsList} onChange={setRole} />
          </span>
          <Button
            onClick={() => {
              return;
            }}
          >
            Modifier
          </Button>
        </form>
        {error.error && <p className={``}>{error.message}</p>}
        {success.success && <p>{success.message}</p>}
      </div>
    </div>
  );
}

export default UserUpdatePopUp;
