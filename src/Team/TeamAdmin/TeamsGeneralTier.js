import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import TeamGenenralTierUpdatePopUp from "../../Form/Team/TeamsGeneralTierUpdatePopUp";
import { TeamsGeneralTiersContext } from "../../Contexts/TeamsGeneralTiersContext";
import SubTeamsGeneralTiersAdmin from "./SubTeamsGeneralAdmin";

function TeamsGeneralTier({
  teamsGeneralTier,
  setTeamsGeneralTierDescription,
  teamsGeneralTierDescription,
}) {
  const [popup, setPopup] = useState(null);
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { deleteTeamsGeneralTier } = useContext(TeamsGeneralTiersContext);

  const handleClosePopUp = () => {
    setPopup(null);
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
              deleteTeamsGeneralTier(
                teamsGeneralTier._id,
                setError,
                setSuccess
              );
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
        {error.error && <p className={`form_error`}>{error.message}</p>}
        {success.success && <p>{success.message}</p>}
        {popup && (
          <TeamGenenralTierUpdatePopUp
            closePopUp={handleClosePopUp}
            teamsGeneralTier={teamsGeneralTier}
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
