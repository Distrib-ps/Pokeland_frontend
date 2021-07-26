import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import TeamsCategoryUpdatePopUp from "../../Form/Team/TeamsCategoryUpdatePopUp";
import { TeamsCategoriesContext } from "../../Contexts/TeamsCategoriesContext";
import TeamAdmin from "./TeamAdmin";

function TeamsCategory({
  teamsCategory,
  setTeamsCategoryDescription,
  teamsCategoryDescription,
}) {
  const [popup, setPopup] = useState(null);
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { deleteTeamsCategory } = useContext(TeamsCategoriesContext);

  const handleClosePopUp = () => {
    setPopup(null);
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
              deleteTeamsCategory(teamsCategory._id, setError, setSuccess);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
        {error.error && <p className={`form_error`}>{error.message}</p>}
        {success.success && <p>{success.message}</p>}
        {popup && (
          <TeamsCategoryUpdatePopUp
            closePopUp={handleClosePopUp}
            teamsCategory={teamsCategory}
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
