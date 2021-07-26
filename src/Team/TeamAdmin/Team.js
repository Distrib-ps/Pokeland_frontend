import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import TeamUpdatePopUp from "../../Form/Team/TeamUpdatePopUp";
import { TeamsContext } from "../../Contexts/TeamsContext";

function Teams({ team }) {
  const [popup, setPopup] = useState(null);
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { deleteTeam } = useContext(TeamsContext);

  const handleClosePopUp = () => {
    setPopup(null);
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
              deleteTeam(team._id, setError, setSuccess);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
        {error.error && <p className={`form_error`}>{error.message}</p>}
        {success.success && <p>{success.message}</p>}
        {popup && <TeamUpdatePopUp closePopUp={handleClosePopUp} team={team} />}
      </div>
    </>
  );
}

export default Teams;
