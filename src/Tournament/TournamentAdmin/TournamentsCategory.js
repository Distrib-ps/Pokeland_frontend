import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import TournamentsCategoryUpdatePopUp from "../../Form/Tournament/TournamentsCategoryUpdatePopUp";
import { TournamentsCategoriesContext } from "../../Contexts/TournamentsCategoriesContext";
import TournamentAdmin from "./TournamentAdmin";

function TournamentsCategory({
  tournamentsCategory,
  setTournamentsCategoryDescription,
  tournamentsCategoryDescription,
}) {
  const [popup, setPopup] = useState(null);
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { deleteTournamentsCategory } = useContext(
    TournamentsCategoriesContext
  );

  const handleClosePopUp = () => {
    setPopup(null);
  };

  const handleClick = () => {
    setTournamentsCategoryDescription(tournamentsCategory._id);
  };

  return (
    <>
      <div className={`tournaments_general_tier`}>
        <p>{tournamentsCategory.name}</p>
        <div className={`tournaments_general_tier_navigation`}>
          <Button onClick={handleClick}>Voir les Tournois</Button>
          <Button
            onClick={() => {
              setPopup(true);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            onClick={() => {
              deleteTournamentsCategory(
                tournamentsCategory._id,
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
          <TournamentsCategoryUpdatePopUp
            closePopUp={handleClosePopUp}
            tournamentsCategory={tournamentsCategory}
          />
        )}
      </div>
      {tournamentsCategoryDescription === tournamentsCategory._id && (
        <TournamentAdmin tournamentsCategory={tournamentsCategory} />
      )}
    </>
  );
}

export default TournamentsCategory;
