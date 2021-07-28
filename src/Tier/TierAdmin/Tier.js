import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import TierUpdatePopUp from "../../Form/Tier/TierUpdatePopUp";
import TierDeletePopUp from "../../Form/Tier/TierDeletePopUp";

function Tier({ tier }) {
  const [popup, setPopup] = useState(null);
  const [popupDelete, setPopupDelete] = useState(null);

  const handleClosePopUp = () => {
    setPopup(null);
  };

  const handleClosePopUpDelete = () => {
    setPopupDelete(null);
  };

  return (
    <div className={`tier`}>
      <p>
        {tier.date}/{tier.name}
      </p>
      <div className={`tier_navigation`}>
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
      {popup && <TierUpdatePopUp closePopUp={handleClosePopUp} tier={tier} />}
      {popupDelete && (
        <TierDeletePopUp
          closePopUp={handleClosePopUpDelete}
          tierId={tier._id}
        />
      )}
    </div>
  );
}

export default Tier;
