import { useContext, useEffect, useState } from "react";
import { SubTeamsGeneralTiersContext } from "../Contexts/SubTeamsGeneralTiersContext";
import { Link } from "react-router-dom";

function HeaderSubTiers({ teamsGeneralId }) {
  const [subTiers, setSubTiers] = useState([]);
  const [error, setError] = useState(null);
  const { getSubGeneralTiers } = useContext(SubTeamsGeneralTiersContext);

  useEffect(() => {
    getSubGeneralTiers(setError, teamsGeneralId, setSubTiers);
  }, [getSubGeneralTiers, teamsGeneralId]);

  return (
    <ul className={`header_sub_navigation_links`}>
      {subTiers &&
        subTiers.length !== 0 &&
        subTiers.map((subTier) => {
          return (
            <li key={subTier._id}>
              <Link to={`/teams/subtier-${subTier._id}`}>{subTier.name}</Link>
            </li>
          );
        })}
      {error && (
        <li>
          <p>Erreur</p>
        </li>
      )}
    </ul>
  );
}

export default HeaderSubTiers;
