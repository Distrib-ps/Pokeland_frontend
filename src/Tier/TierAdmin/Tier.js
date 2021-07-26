import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import TierUpdatePopUp from "../../Form/Tier/TierUpdatePopUp";
import { TiersContext } from "../../Contexts/TiersContext";

function Tier({ tier }) {
  const [popup, setPopup] = useState(null);
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { deleteTier } = useContext(TiersContext);

  const handleClosePopUp = () => {
    setPopup(null);
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
            deleteTier(tier._id, setError, setSuccess);
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
      {popup && <TierUpdatePopUp closePopUp={handleClosePopUp} tier={tier} />}
    </div>
  );
}

export default Tier;
