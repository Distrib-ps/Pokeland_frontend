import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { TournamentsCategoriesContext } from "../../Contexts/TournamentsCategoriesContext";
import { TournamentsContext } from "../../Contexts/TournamentsContext";
import "./TournamentPage.css";
import Tournament from "./Tournament";
import TournamentsCategory from "./TournamentsCategory";

function TournamentPage() {
  const [error, setError] = useState(null);
  const [component, setComponent] = useState("");

  const { tournamentsCategories, getTournamentsCategories } = useContext(
    TournamentsCategoriesContext
  );
  const { tournaments, getTournaments } = useContext(TournamentsContext);

  const { id } = useParams();

  useEffect(() => {
    if (id === "all") {
      getTournamentsCategories(setError);
      setComponent("all");
    }

    if (id !== "all") {
      getTournaments(setError, id);
      setComponent("tournaments");
    }
  }, [getTournamentsCategories, getTournaments, id]);

  return (
    <div className={`tournament_page`}>
      {tournamentsCategories &&
        tournamentsCategories.length !== 0 &&
        component === "all" &&
        tournamentsCategories.map((tournamentsCategory) => {
          return (
            <TournamentsCategory
              tournamentsCategory={tournamentsCategory}
              key={tournamentsCategory._id}
            />
          );
        })}
      {tournaments &&
        tournaments.lenth !== 0 &&
        component === "tournaments" &&
        tournaments.map((tournament) => {
          return <Tournament tournament={tournament} key={tournament._id} />;
        })}
      {error && <p>Le chargement des Tournois a échoué.</p>}
    </div>
  );
}

export default TournamentPage;
