import { useEffect, useContext, useState } from "react";
import Button from "../../Button/Button";
import { SubTeamsGeneralTiersContext } from "../../Contexts/SubTeamsGeneralTiersContext";
import AddSubTeamsGeneralTier from "../../Form/Team/AddSubTeamsGeneralTier";
import SubTeamsGeneralTier from "./SubTeamsGeneralTier";
import "./TeamAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function SubTeamsGeneralTiersAdmin({ teamsGeneralTier }) {
  const [error, setError] = useState(null);
  const [form, setForm] = useState(false);
  const [subTeamsGeneralTierDescription, setSubTeamsGeneralTierDescription] =
    useState("");

  const { subTeamsGeneralTiers, getSubTeamsGeneralTiers } = useContext(
    SubTeamsGeneralTiersContext
  );

  useEffect(() => {
    getSubTeamsGeneralTiers(setError, teamsGeneralTier._id);
  }, [getSubTeamsGeneralTiers, teamsGeneralTier]);

  return (
    <div className={`team_admin team_sub_tier`}>
      {!form && (
        <div className={`team_admin_header`}>
          <h3>Ajouter un Sous Tier Général</h3>
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
      {form && <AddSubTeamsGeneralTier teamsGeneralTier={teamsGeneralTier} />}
      {error && (
        <p>Le chargement de la liste des Sous Tiers Généraux a échoué.</p>
      )}
      {subTeamsGeneralTiers &&
        subTeamsGeneralTiers.length !== 0 &&
        subTeamsGeneralTiers.map((subTeamsGeneralTier) => {
          return (
            <SubTeamsGeneralTier
              subTeamsGeneralTier={subTeamsGeneralTier}
              key={subTeamsGeneralTier._id}
              setSubTeamsGeneralTierDescription={
                setSubTeamsGeneralTierDescription
              }
              subTeamsGeneralTierDescription={subTeamsGeneralTierDescription}
            />
          );
        })}
    </div>
  );
}

export default SubTeamsGeneralTiersAdmin;
