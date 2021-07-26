import { useEffect, useContext, useState } from "react";
import Button from "../../Button/Button";
import { TeamsGeneralTiersContext } from "../../Contexts/TeamsGeneralTiersContext";
import AddTeamsGeneralTier from "../../Form/Team/AddTeamsGeneralTier";
import TeamsGeneralTier from "./TeamsGeneralTier";
import "./TeamAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function TeamsAdmin() {
  const [error, setError] = useState(null);
  const [form, setForm] = useState(false);
  const [teamsGeneralTierDescription, setTeamsGeneralTierDescription] =
    useState("");

  const { teamsGeneralTiers, getTeamsGeneralTiers } = useContext(
    TeamsGeneralTiersContext
  );

  useEffect(() => {
    getTeamsGeneralTiers(setError);
  }, [getTeamsGeneralTiers]);

  return (
    <div className={`team_admin`}>
      {!form && (
        <div className={`team_admin_header`}>
          <h3>Ajouter un Tier Général</h3>
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
      {form && <AddTeamsGeneralTier />}
      {error && <p>Le chargement de la liste des Tiers Généraux a échoué.</p>}
      {teamsGeneralTiers &&
        teamsGeneralTiers.length !== 0 &&
        teamsGeneralTiers.map((teamsGeneralTier) => {
          return (
            <TeamsGeneralTier
              teamsGeneralTier={teamsGeneralTier}
              key={teamsGeneralTier._id}
              setTeamsGeneralTierDescription={setTeamsGeneralTierDescription}
              teamsGeneralTierDescription={teamsGeneralTierDescription}
            />
          );
        })}
    </div>
  );
}

export default TeamsAdmin;
