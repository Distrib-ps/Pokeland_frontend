import { useEffect, useContext, useState } from "react";
import { TeamsCategoriesContext } from "../../Contexts/TeamsCategoriesContext";
import TeamsCategory from "./TeamsCategory";

function SubTeamsGeneralTier({ subGeneralTier }) {
  const [error, setError] = useState(null);
  const [teamsCategories, setTeamsCategories] = useState(null);

  const { getTeamsCategoriesPage } = useContext(TeamsCategoriesContext);

  useEffect(() => {
    getTeamsCategoriesPage(setError, subGeneralTier._id, setTeamsCategories);
  }, [getTeamsCategoriesPage, subGeneralTier]);

  return (
    <div>
      <h4>{subGeneralTier.name}</h4>
      {teamsCategories &&
        teamsCategories.length !== 0 &&
        teamsCategories.map((teamsCategory) => {
          return (
            <TeamsCategory
              teamsCategory={teamsCategory}
              key={teamsCategory._id}
            />
          );
        })}
      {error && <p>Le chargement des équipes a échoué.</p>}
    </div>
  );
}

export default SubTeamsGeneralTier;
