import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import TeamGenenralTierUpdatePopUp from "../../Form/Team/TeamsGeneralTierUpdatePopUp";
import SubTeamsGeneralTiersAdmin from "./SubTeamsGeneralAdmin";
import TeamsGeneralTierDeletePopUp from "../../Form/Team/TeamsGeneralTierDeletePopUp";

function TeamsGeneralTier({
  teamsGeneralTier,
  setTeamsGeneralTierDescription,
  teamsGeneralTierDescription,
}) {
  const [popup, setPopup] = useState(null);
  const [popupDelete, setPopupDelete] = useState(null);

  const handleClosePopUp = () => {
    setPopup(null);
  };

  const handleClosePopUpDelete = () => {
    setPopupDelete(null);
  };

  const handleClick = () => {
    setTeamsGeneralTierDescription(teamsGeneralTier._id);
  };

  return (
    <>
      <div className={`teams_general_tier`}>
        <p>{teamsGeneralTier.name}</p>
        <div className={`teams_general_tier_navigation`}>
          <Button onClick={handleClick}>Voir les sous Tiers</Button>
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
          <TeamGenenralTierUpdatePopUp
            closePopUp={handleClosePopUp}
            teamsGeneralTier={teamsGeneralTier}
          />
        )}
        {popupDelete && (
          <TeamsGeneralTierDeletePopUp
            closePopUp={handleClosePopUpDelete}
            teamsGeneralTierId={teamsGeneralTier._id}
          />
        )}
      </div>
      {teamsGeneralTierDescription === teamsGeneralTier._id && (
        <SubTeamsGeneralTiersAdmin teamsGeneralTier={teamsGeneralTier} />
      )}
    </>
  );
}

export default TeamsGeneralTier;
