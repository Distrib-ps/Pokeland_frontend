import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import TeamsCategoryUpdatePopUp from "../../Form/Team/TeamsCategoryUpdatePopUp";
import TeamAdmin from "./TeamAdmin";
import TeamsCategoryDeletePopUp from "../../Form/Team/TeamsCategoryDeletePopUp";

function TeamsCategory({
  teamsCategory,
  setTeamsCategoryDescription,
  teamsCategoryDescription,
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
    setTeamsCategoryDescription(teamsCategory._id);
  };

  return (
    <>
      <div className={`teams_general_tier`}>
        <p>{teamsCategory.name}</p>
        <div className={`teams_general_tier_navigation`}>
          <Button onClick={handleClick}>Voir les Equipes</Button>
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
          <TeamsCategoryUpdatePopUp
            closePopUp={handleClosePopUp}
            teamsCategory={teamsCategory}
          />
        )}
        {popupDelete && (
          <TeamsCategoryDeletePopUp
            closePopUp={handleClosePopUpDelete}
            teamsCategoryId={teamsCategory._id}
          />
        )}
      </div>
      {teamsCategoryDescription === teamsCategory._id && (
        <TeamAdmin teamsCategory={teamsCategory} />
      )}
    </>
  );
}

export default TeamsCategory;
