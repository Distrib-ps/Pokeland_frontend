import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import TournamentUpdatePopUp from "../../Form/Tournament/TournamentUpdatePopUp";
import { TournamentsContext } from "../../Contexts/TournamentsContext";

function Tournaments({ tournament }) {
  const [popup, setPopup] = useState(null);
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { deleteTournament } = useContext(TournamentsContext);

  const handleClosePopUp = () => {
    setPopup(null);
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
              deleteTournament(tournament._id, setError, setSuccess);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
        {error.error && <p className={`form_error`}>{error.message}</p>}
        {success.success && <p>{success.message}</p>}
        {popup && (
          <TournamentUpdatePopUp
            closePopUp={handleClosePopUp}
            tournament={tournament}
          />
        )}
      </div>
    </>
  );
}

export default Tournaments;
