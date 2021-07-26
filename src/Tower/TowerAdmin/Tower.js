import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import TowerUpdatePopUp from "../../Form/Tower/TowerUpdatePopUp";
import { TowersContext } from "../../Contexts/TowersContext";

function Tower({ tower }) {
  const [popup, setPopup] = useState(null);
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { deleteTower } = useContext(TowersContext);

  const handleClosePopUp = () => {
    setPopup(null);
  };

  return (
    <>
      <div className={`towers_general_tier`}>
        <p>{tower.title}</p>
        <div className={`towers_general_tier_navigation`}>
          <Button
            onClick={() => {
              setPopup(true);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            onClick={() => {
              deleteTower(tower._id, setError, setSuccess);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
        {error.error && <p className={`form_error`}>{error.message}</p>}
        {success.success && <p>{success.message}</p>}
        {popup && (
          <TowerUpdatePopUp closePopUp={handleClosePopUp} tower={tower} />
        )}
      </div>
    </>
  );
}

export default Tower;
