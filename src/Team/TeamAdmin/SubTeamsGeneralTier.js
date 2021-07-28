import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import SubTeamsGenenralTierUpdatePopUp from "../../Form/Team/SubTeamsGeneralTierUpdatePopup";
import TeamsCategoriesAdmin from "./TeamsCategoriesAdmin";
import SubTeamsGeneralTierDeletePopUp from "../../Form/Team/SubTeamsGeneralTierDeletePopUp";

function SubTeamsGeneralTier({
  subTeamsGeneralTier,
  setSubTeamsGeneralTierDescription,
  subTeamsGeneralTierDescription,
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
              setPopupDelete(true);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
        {popup && (
          <SubTeamsGenenralTierUpdatePopUp
            closePopUp={handleClosePopUp}
            subTeamsGeneralTier={subTeamsGeneralTier}
          />
        )}
        {popupDelete && (
          <SubTeamsGeneralTierDeletePopUp
            closePopUp={handleClosePopUpDelete}
            subTeamsGeneralTierId={subTeamsGeneralTier._id}
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
