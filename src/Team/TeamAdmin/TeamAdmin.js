import { useEffect, useContext, useState } from "react";
import Button from "../../Button/Button";
import { TeamsContext } from "../../Contexts/TeamsContext";
import AddTeam from "../../Form/Team/AddTeam";
import Team from "./Team";
import "./TeamAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function TeamAdmin({ teamsCategory }) {
  const [error, setError] = useState(null);
  const [form, setForm] = useState(false);

  const { teams, getTeams } = useContext(TeamsContext);

  useEffect(() => {
    getTeams(setError, teamsCategory._id);
  }, [getTeams, teamsCategory]);

  return (
    <div className={`team_admin team`}>
      {!form && (
        <div className={`team_admin_header`}>
          <h3>Ajouter une Equipe</h3>
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
      {form && <AddTeam teamsCategory={teamsCategory} />}
      {error && <p>Le chargement de la liste des Equipes a échoué.</p>}
      {teams &&
        teams.length !== 0 &&
        teams.map((team) => {
          return <Team team={team} key={team._id} />;
        })}
    </div>
  );
}

export default TeamAdmin;
