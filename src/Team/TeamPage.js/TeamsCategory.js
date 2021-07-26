import { useEffect, useContext, useState } from "react";
import { TeamsContext } from "../../Contexts/TeamsContext";
import Team from "./Team";

function TeamsCategory({ teamsCategory }) {
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState(null);

  const { getTeamsPage } = useContext(TeamsContext);

  useEffect(() => {
    getTeamsPage(setError, teamsCategory._id, setTeams);
  }, [getTeamsPage, teamsCategory]);

  return (
    <div>
      <h4>{teamsCategory.name}</h4>
      {teams &&
        teams.length !== 0 &&
        teams.map((team) => {
          return <Team team={team} key={team._id} />;
        })}
      {error && <p>Le chargement des équipes a échoué.</p>}
    </div>
  );
}

export default TeamsCategory;
