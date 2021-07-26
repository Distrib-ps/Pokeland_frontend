import { useEffect, useContext, useState } from "react";
import { SubTeamsGeneralTiersContext } from "../../Contexts/SubTeamsGeneralTiersContext";
import SubTeamsGeneralTier from "./SubTeamsGeneralTier";

function TeamsGeneralTier({ teamsGeneralTier }) {
  const [error, setError] = useState(null);
  const [subGeneralTiers, setSubGeneralTiers] = useState(null);

  const { getSubGeneralTiers } = useContext(SubTeamsGeneralTiersContext);

  useEffect(() => {
    getSubGeneralTiers(setError, teamsGeneralTier._id, setSubGeneralTiers);
  }, [getSubGeneralTiers, teamsGeneralTier]);

  return (
    <div>
      <h3>{teamsGeneralTier.name}</h3>
      {subGeneralTiers &&
        subGeneralTiers.length !== 0 &&
        subGeneralTiers.map((subGeneralTier) => {
          return (
            <SubTeamsGeneralTier
              subGeneralTier={subGeneralTier}
              key={subGeneralTier._id}
            />
          );
        })}
      {error && <p>Le chargement des équipes a échoué.</p>}
    </div>
  );
}

export default TeamsGeneralTier;
