import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button/Button";
import TournamentsCategoryUpdatePopUp from "../../Form/Tournament/TournamentsCategoryUpdatePopUp";
import TournamentAdmin from "./TournamentAdmin";
import TournamentsCategoryDeletePopUp from "../../Form/Tournament/TournamentCategoryDeletePopUp";

function TournamentsCategory({
  tournamentsCategory,
  setTournamentsCategoryDescription,
  tournamentsCategoryDescription,
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
              setPopupDelete(true);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
        {popup && (
          <TournamentsCategoryUpdatePopUp
            closePopUp={handleClosePopUp}
            tournamentsCategory={tournamentsCategory}
          />
        )}
        {popupDelete && (
          <TournamentsCategoryDeletePopUp
            closePopUp={handleClosePopUpDelete}
            tournamentsCategoryId={tournamentsCategory._id}
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
