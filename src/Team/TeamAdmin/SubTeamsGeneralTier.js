import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import SubTeamsGenenralTierUpdatePopUp from "../../Form/Team/SubTeamsGeneralTierUpdatePopup";
import { SubTeamsGeneralTiersContext } from "../../Contexts/SubTeamsGeneralTiersContext";
import TeamsCategoriesAdmin from "./TeamsCategoriesAdmin";

function SubTeamsGeneralTier({
  subTeamsGeneralTier,
  setSubTeamsGeneralTierDescription,
  subTeamsGeneralTierDescription,
}) {
  const [popup, setPopup] = useState(null);
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { deleteSubTeamsGeneralTier } = useContext(SubTeamsGeneralTiersContext);

  const handleClosePopUp = () => {
    setPopup(null);
  };

  const handleClick = () => {
    setSubTeamsGeneralTierDescription(subTeamsGeneralTier._id);
  };

  return (
    <>
      <div className={`teams_general_tier`}>
        <p>{subTeamsGeneralTier.name}</p>
        <div className={`teams_general_tier_navigation`}>
          <Button onClick={handleClick}>Voir les Catégories</Button>
          <Button
            onClick={() => {
              setPopup(true);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            onClick={() => {
              deleteSubTeamsGeneralTier(
                subTeamsGeneralTier._id,
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
          <SubTeamsGenenralTierUpdatePopUp
            closePopUp={handleClosePopUp}
            subTeamsGeneralTier={subTeamsGeneralTier}
          />
        )}
      </div>
      {subTeamsGeneralTierDescription === subTeamsGeneralTier._id && (
        <TeamsCategoriesAdmin subTeamsGeneralTier={subTeamsGeneralTier} />
      )}
    </>
  );
}

export default SubTeamsGeneralTier;
