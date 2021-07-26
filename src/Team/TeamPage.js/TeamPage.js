import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { TeamsGeneralTiersContext } from "../../Contexts/TeamsGeneralTiersContext";
import { SubTeamsGeneralTiersContext } from "../../Contexts/SubTeamsGeneralTiersContext";
import { TeamsCategoriesContext } from "../../Contexts/TeamsCategoriesContext";
import TeamsGeneralTier from "./TeamsGeneralTier";
import SubTeamsGeneralTier from "./SubTeamsGeneralTier";
import "./TeamPage.css";
import TeamsCategory from "./TeamsCategory";

function TeamPage() {
  const [error, setError] = useState(null);
  const [component, setComponent] = useState("");

  const { teamsGeneralTiers, getTeamsGeneralTiers, setTeamsGeneralTiers } =
    useContext(TeamsGeneralTiersContext);
  const {
    subTeamsGeneralTiers,
    getSubTeamsGeneralTiers,
    setSubTeamsGeneralTiers,
  } = useContext(SubTeamsGeneralTiersContext);
  const { teamsCategories, getTeamsCategories, setTeamsCategories } =
    useContext(TeamsCategoriesContext);

  const { id } = useParams();

  useEffect(() => {
    if (id === "all") {
      getTeamsGeneralTiers(setError);
      setComponent("all");
    }

    if (id.includes("tier-")) {
      const idUrl = id.replace("tier-", "");
      getSubTeamsGeneralTiers(setError, idUrl);
      setComponent("tier");
    }

    if (id.includes("subtier-")) {
      const idUrl = id.replace("subtier-", "");
      getTeamsCategories(setError, idUrl);
      setComponent("subtier");
    }
  }, [
    getTeamsGeneralTiers,
    getSubTeamsGeneralTiers,
    id,
    setTeamsGeneralTiers,
    setSubTeamsGeneralTiers,
    getTeamsCategories,
    setTeamsCategories,
  ]);

  return (
    <div className={`team_page`}>
      <h2>Equipes</h2>
      {teamsGeneralTiers &&
        teamsGeneralTiers.length !== 0 &&
        component === "all" &&
        teamsGeneralTiers.map((teamsGeneralTier) => {
          return (
            <TeamsGeneralTier
              teamsGeneralTier={teamsGeneralTier}
              key={teamsGeneralTier._id}
            />
          );
        })}
      {subTeamsGeneralTiers &&
        subTeamsGeneralTiers.lenth !== 0 &&
        component === "tier" &&
        subTeamsGeneralTiers.map((subTeamsGeneralTier) => {
          return (
            <SubTeamsGeneralTier
              subGeneralTier={subTeamsGeneralTier}
              key={subTeamsGeneralTier._id}
            />
          );
        })}
      {teamsCategories &&
        teamsCategories.lenth !== 0 &&
        component === "subtier" &&
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

export default TeamPage;
