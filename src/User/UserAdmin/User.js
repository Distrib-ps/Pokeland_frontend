import { useContext, useState } from "react";
import "./User.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import { UserContext } from "../../Contexts/UserContext";
import UserUpdatePopUp from "../../Form/User/UserUpdatePopUp";

function User({ userItem }) {
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });
  const [popup, setPopup] = useState(null);

  const { deleteUserList } = useContext(UserContext);

  const handleClosePopUp = () => {
    setPopup(null);
  };

  return (
    <>
      <div className={`user user-light`}>
        {userItem.profilePicture &&
          userItem.profilePicture.includes("http") && (
            <span
              className={`user_img`}
              style={{ backgroundImage: `url(${userItem.profilePicture})` }}
            ></span>
          )}
        {!userItem.profilePicture && (
          <span className={`user_icon user_icon-light`}>
            <FontAwesomeIcon icon={faUser} />
          </span>
        )}
        {userItem.profilePicture && !userItem.profilePicture.includes("http") && (
          <span
            className={`user_img`}
            style={{
              backgroundImage: `url(http://localhost:8000/static/${userItem.profilePicture})`,
            }}
          ></span>
        )}
        <p>{userItem.pseudo}</p>
        <div className={`user_admin`}>
          <Button
            onClick={() => {
              setPopup(true);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            onClick={() => {
              deleteUserList(userItem._id, setError, setSuccess);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      </div>
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
      {popup && (
        <UserUpdatePopUp user={userItem} closePopUp={handleClosePopUp} />
      )}
    </>
  );
}

export default User;
