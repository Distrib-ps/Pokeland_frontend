import { useEffect, useContext, useState } from "react";
import { TournamentsContext } from "../../Contexts/TournamentsContext";
import Tournament from "./Tournament";

function TournamentsCategory({ tournamentsCategory }) {
  const [error, setError] = useState(null);
  const [tournaments, setTournaments] = useState(null);

  const { getTournamentsPage } = useContext(TournamentsContext);

  useEffect(() => {
    getTournamentsPage(setError, tournamentsCategory._id, setTournaments);
  }, [getTournamentsPage, tournamentsCategory]);

  return (
    <div className={`tournament_category`}>
      <h2>{tournamentsCategory.name}</h2>
      {tournaments &&
        tournaments.length !== 0 &&
        tournaments.map((tournament) => {
          return <Tournament tournament={tournament} key={tournament._id} />;
        })}
      {error && <p>Le chargement des Tournois a échoué.</p>}
    </div>
  );
}

export default TournamentsCategory;
