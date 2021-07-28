import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import TeamUpdatePopUp from "../../Form/Team/TeamUpdatePopUp";
import TeamsDeletePopUp from "../../Form/Team/TeamsDeletePopUp";

function Teams({ team }) {
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
      <div className={`teams_general_tier`}>
        <p>{team.title}</p>
        <div className={`teams_general_tier_navigation`}>
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
        {popup && <TeamUpdatePopUp closePopUp={handleClosePopUp} team={team} />}
        {popupDelete && (
          <TeamsDeletePopUp
            closePopUp={handleClosePopUpDelete}
            teamId={team._id}
          />
        )}
      </div>
    </>
  );
}

export default Teams;
