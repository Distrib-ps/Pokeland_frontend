import { useEffect, useContext, useState } from "react";
import Button from "../../Button/Button";
import { TiersContext } from "../../Contexts/TiersContext";
import AddTier from "../../Form/Tier/AddTier";
import Tier from "./Tier";
import "./TierAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function TierAdmin() {
  const [error, setError] = useState(null);
  const [form, setForm] = useState(false);

  const { tiers, getTiers } = useContext(TiersContext);

  useEffect(() => {
    getTiers(setError);
  }, [getTiers]);

  return (
    <div className={`tier_admin`}>
      {!form && (
        <div className={`tier_admin_header`}>
          <h3>Ajouter un tier</h3>
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
        <div className={`tier_admin_header`}>
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
      {form && <AddTier />}
      {error && <p>Le chargement de la liste des Tiers a échoué.</p>}
      {tiers &&
        tiers.length !== 0 &&
        tiers.map((tier) => {
          return <Tier tier={tier} key={tier._id} />;
        })}
    </div>
  );
}

export default TierAdmin;
