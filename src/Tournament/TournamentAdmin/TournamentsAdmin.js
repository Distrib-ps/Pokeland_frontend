import { useEffect, useContext, useState } from "react";
import Button from "../../Button/Button";
import { TournamentsCategoriesContext } from "../../Contexts/TournamentsCategoriesContext";
import AddTournamentCategory from "../../Form/Tournament/AddTournamentCategory";
import TournamentsCategory from "./TournamentsCategory";
import "./TournamentAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function TournamentsAdmin() {
  const [error, setError] = useState(null);
  const [form, setForm] = useState(false);
  const [tournamentsCategoryDescription, setTournamentsCategoryDescription] =
    useState("");

  const { tournamentsCategories, getTournamentsCategories } = useContext(
    TournamentsCategoriesContext
  );

  useEffect(() => {
    getTournamentsCategories(setError);
  }, [getTournamentsCategories]);

  return (
    <div className={`tournament_admin`}>
      {!form && (
        <div className={`tournament_admin_header`}>
          <h3>Ajouter une Catégorie</h3>
          <Button
            onClick={() => {
              setForm(!form);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      )}
      {form && (
        <div className={`tournament_admin_header`}>
          <h3>Retour</h3>
          <Button
            onClick={() => {
              setForm(!form);
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
        </div>
      )}
      {form && <AddTournamentCategory />}
      {error && <p>Le chargement de la liste des Catégories a échoué.</p>}
      {tournamentsCategories &&
        tournamentsCategories.length !== 0 &&
        tournamentsCategories.map((tournamentsCategory) => {
          return (
            <TournamentsCategory
              tournamentsCategory={tournamentsCategory}
              key={tournamentsCategory._id}
              setTournamentsCategoryDescription={
                setTournamentsCategoryDescription
              }
              tournamentsCategoryDescription={tournamentsCategoryDescription}
            />
          );
        })}
    </div>
  );
}

export default TournamentsAdmin;
