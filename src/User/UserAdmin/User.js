import { useState } from "react";
import "./User.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import UserUpdatePopUp from "../../Form/User/UserUpdatePopUp";
import UserListDeletePopUp from "../../Form/User/UserListDeletePopUp";

function User({ userItem }) {
  const [popup, setPopup] = useState(null);
  const [popupDelete, setPopupDelete] = useState(null);

  const handleClosePopUp = () => {
    setPopup(null);
  };

  const handleClosePopUpDelete = () => {
    setPopupDelete(null);
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
              backgroundImage: `url(https://pokelandbackend-server.herokuapp.com/static/${userItem.profilePicture})`,
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
              setPopupDelete(true);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      </div>
      {popup && (
        <UserUpdatePopUp user={userItem} closePopUp={handleClosePopUp} />
      )}
      {popupDelete && (
        <UserListDeletePopUp
          closePopUp={handleClosePopUpDelete}
          userId={userItem._id}
        />
      )}
    </>
  );
}

export default User;
