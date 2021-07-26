import { useState, useContext } from "react";
import "../Form.css";
import TierDate from "../../Input/TierDate";
import Button from "../../Button/Button";
import { TiersContext } from "../../Contexts/TiersContext";
import TierName from "../../Input/TierName";

function AddTier() {
  const [tierDate, setTierDate] = useState({ value: "", error: true });
  const [tierName, setTierName] = useState({ value: "", error: true });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { addTier } = useContext(TiersContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tierDate.error || tierName.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = {
        date: tierDate.value,
        name: tierName.value,
      };

      addTier(body, setError, setSuccess);
    }
  };

  return (
    <div className={``}>
      <div className={`form_header`}>
        <h3>Ajoutez un Tier</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <TierDate onBlur={setTierDate} value="" disabled={false} label={true} />
        <TierName onBlur={setTierName} value="" disabled={false} label={true} />
        <Button>Ajouter</Button>
      </form>
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
    </div>
  );
}

export default AddTier;
