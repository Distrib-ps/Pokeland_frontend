import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import TowerUpdatePopUp from "../../Form/Tower/TowerUpdatePopUp";
import TowerDeletePopUp from "../../Form/Tower/TowerDeletePopUp";

function Tower({ tower }) {
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
              setPopupDelete(true);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
        {popup && (
          <TowerUpdatePopUp closePopUp={handleClosePopUp} tower={tower} />
        )}
        {popupDelete && (
          <TowerDeletePopUp
            closePopUp={handleClosePopUpDelete}
            towerId={tower._id}
          />
        )}
      </div>
    </>
  );
}

export default Tower;
