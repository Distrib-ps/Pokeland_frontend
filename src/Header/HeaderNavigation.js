import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { TeamsGeneralTiersContext } from "../Contexts/TeamsGeneralTiersContext";
import { TournamentsCategoriesContext } from "../Contexts/TournamentsCategoriesContext";
import HeaderSubTiers from "./HeaderSubTiers";

function HeaderNavigation() {
  const { teamsGeneralTiers, getTeamsGeneralTiers } = useContext(
    TeamsGeneralTiersContext
  );
  const { tournamentsCategories, getTournamentsCategories } = useContext(
    TournamentsCategoriesContext
  );
  const [error, setError] = useState(null);
  const [subNavigation, setSubNavigation] = useState(false);
  const [subNavigationTournament, setSubNavigationTournament] = useState(false);

  useEffect(() => {
    getTeamsGeneralTiers(setError);
    getTournamentsCategories(setError);
  }, [getTeamsGeneralTiers, getTournamentsCategories]);

  const handleOver = () => {
    setSubNavigation(true);
  };

  const handleLeave = () => {
    setSubNavigation(false);
  };

  const handleOverTournament = () => {
    setSubNavigationTournament(true);
  };

  const handleLeaveTournament = () => {
    setSubNavigationTournament(false);
  };

  return (
    <nav className={`header_navigation`}>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li onMouseOver={handleOver} onMouseLeave={handleLeave}>
          <div>
            <span>
              <Link to="/teams/all">Equipes</Link>
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </div>
          {subNavigation && (
            <div
              className={`header_navigation_sub_nav header_navigation_sub_nav-light`}
            >
              {error && <p>erreur</p>}
              {teamsGeneralTiers && teamsGeneralTiers.length !== 0 && (
                <ul className={`header_navigation_links`}>
                  {teamsGeneralTiers.map((teamsGeneralTier) => {
                    return (
                      <li key={teamsGeneralTier._id}>
                        <Link to={`/teams/tier-${teamsGeneralTier._id}`}>
                          {teamsGeneralTier.name}
                        </Link>
                        <HeaderSubTiers teamsGeneralId={teamsGeneralTier._id} />
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </li>
        <li
          onMouseOver={handleOverTournament}
          onMouseLeave={handleLeaveTournament}
        >
          <div>
            <span>
              <Link to="/tournaments/all">Tournois</Link>
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </div>
          {subNavigationTournament && (
            <div
              className={`header_navigation_sub_nav header_navigation_sub_nav-light`}
            >
              {error && <p>erreur</p>}
              {tournamentsCategories && tournamentsCategories.length !== 0 && (
                <ul className={`header_navigation_links`}>
                  {tournamentsCategories.map((tournamentCategory) => {
                    return (
                      <li key={tournamentCategory._id}>
                        <Link to={`/tournaments/${tournamentCategory._id}`}>
                          {tournamentCategory.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </li>
        <li>
          <Link to="/forum">Forum</Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderNavigation;
