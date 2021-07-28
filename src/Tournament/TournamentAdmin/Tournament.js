import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import TournamentUpdatePopUp from "../../Form/Tournament/TournamentUpdatePopUp";
import TournamentDeletePopUp from "../../Form/Tournament/TournamentDeletePopUp";

function Tournaments({ tournament }) {
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
      <div className={`tournaments_general_tier`}>
        <p>{tournament.title}</p>
        <div className={`tournaments_general_tier_navigation`}>
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
          <TournamentUpdatePopUp
            closePopUp={handleClosePopUp}
            tournament={tournament}
          />
        )}
        {popupDelete && (
          <TournamentDeletePopUp
            closePopUp={handleClosePopUpDelete}
            tournamentId={tournament._id}
          />
        )}
      </div>
    </>
  );
}

export default Tournaments;
