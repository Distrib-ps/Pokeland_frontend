import { useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./UserHeader.css";
import Button from "../../Button/Button";
import { Link } from "react-router-dom";

function UserHearder({ error }) {
  const { user, logout } = useContext(UserContext);
  const [userHeaderNav, setUserHeaderNav] = useState(false);

  return (
    <div className={`user_header user_header-light`}>
      {!error && (
        <>
          <div
            className={`user_header_infos`}
            onClick={() => setUserHeaderNav(!userHeaderNav)}
          >
            <span className={`user_header_pseudo`}>{user.pseudo}</span>
            {user.profilePicture && user.profilePicture.includes("http") && (
              <span
                className={`user_header_img`}
                style={{ backgroundImage: `url(${user.profilePicture})` }}
              ></span>
            )}
            {!user.profilePicture && (
              <div className={`user_header_icon user_header_icon-light`}>
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}
            {user.profilePicture && !user.profilePicture.includes("http") && (
              <span
                className={`user_header_img`}
                style={{
                  backgroundImage: `url(https://pokelandbackend-server.herokuapp.com/static/${user.profilePicture})`,
                }}
              ></span>
            )}
          </div>
          {userHeaderNav && (
            <div>
              <p>
                <Link to="/profile">Voir mon profil</Link>
              </p>
              <div className={`user_header_navigation`}>
                <Button onClick={logout}>Déconnexion</Button>
              </div>
            </div>
          )}
        </>
      )}
      {error && <p>Erreur lors du chargement de votre profil.</p>}
    </div>
  );
}

export default UserHearder;
