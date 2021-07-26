import { useEffect, useContext, useState } from "react";
import Button from "../../Button/Button";
import { TournamentsContext } from "../../Contexts/TournamentsContext";
import AddTournament from "../../Form/Tournament/AddTournament";
import Tournament from "./Tournament";
import "./TournamentAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function TournamentAdmin({ tournamentsCategory }) {
  const [error, setError] = useState(null);
  const [form, setForm] = useState(false);

  const { tournaments, getTournaments } = useContext(TournamentsContext);

  useEffect(() => {
    getTournaments(setError, tournamentsCategory._id);
  }, [getTournaments, tournamentsCategory]);

  return (
    <div className={`tournament_admin tournament`}>
      {!form && (
        <div className={`tournament_admin_header`}>
          <h3>Ajouter un Tournois</h3>
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
        <div className={`team_admin_header`}>
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
      {form && <AddTournament tournamentsCategory={tournamentsCategory} />}
      {error && <p>Le chargement de la liste des Tournois a échoué.</p>}
      {tournaments &&
        tournaments.length !== 0 &&
        tournaments.map((tournament) => {
          return <Tournament tournament={tournament} key={tournament._id} />;
        })}
    </div>
  );
}

export default TournamentAdmin;
