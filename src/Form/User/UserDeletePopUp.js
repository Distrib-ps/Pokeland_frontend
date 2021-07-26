import { useState, useContext } from "react";
import Button from "../../Button/Button";
import { UserContext } from "../../Contexts/UserContext";

function UserDeletePopUp({ closePopUp }) {
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { deleteUser, user } = useContext(UserContext);

  return (
    <div className={`form_popup`}>
      <div className={`form_popup_content form_popup-light`}>
        <p>
          Vous êtes sur le point de supprimer votre compte, voulez vous
          continuer ?
        </p>
        <div className={`form_popup_navigation`}>
          <Button
            onClick={() => {
              deleteUser(user._id, setError, setSuccess);
            }}
          >
            Confirmer
          </Button>
          <Button onClick={closePopUp}>Annuler</Button>
        </div>
      </div>
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
    </div>
  );
}

export default UserDeletePopUp;
