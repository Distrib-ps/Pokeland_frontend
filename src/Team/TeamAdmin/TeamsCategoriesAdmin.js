import { useEffect, useContext, useState } from "react";
import Button from "../../Button/Button";
import { TeamsCategoriesContext } from "../../Contexts/TeamsCategoriesContext";
import AddTeamsCategory from "../../Form/Team/AddTeamsCategory";
import TeamsCategory from "./TeamsCategory";
import "./TeamAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function TeamsCategoriesAdmin({ subTeamsGeneralTier }) {
  const [error, setError] = useState(null);
  const [form, setForm] = useState(false);
  const [teamsCategoryDescription, setTeamsCategoryDescription] = useState("");

  const { teamsCategories, getTeamsCategories } = useContext(
    TeamsCategoriesContext
  );

  useEffect(() => {
    getTeamsCategories(setError, subTeamsGeneralTier._id);
  }, [getTeamsCategories, subTeamsGeneralTier]);

  return (
    <div className={`team_admin team_category`}>
      {!form && (
        <div className={`team_admin_header`}>
          <h3>Ajouter une Catégorie</h3>
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
      {form && <AddTeamsCategory subTeamsGeneralTier={subTeamsGeneralTier} />}
      {error && <p>Le chargement de la liste des catégories a échoué.</p>}
      {teamsCategories &&
        teamsCategories.length !== 0 &&
        teamsCategories.map((teamsCategory) => {
          return (
            <TeamsCategory
              teamsCategory={teamsCategory}
              key={teamsCategory._id}
              setTeamsCategoryDescription={setTeamsCategoryDescription}
              teamsCategoryDescription={teamsCategoryDescription}
            />
          );
        })}
    </div>
  );
}

export default TeamsCategoriesAdmin;
