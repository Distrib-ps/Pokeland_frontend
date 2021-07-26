import { useState, useContext } from "react";
import { SubTeamsGeneralTiersContext } from "../../Contexts/SubTeamsGeneralTiersContext";
import Button from "../../Button/Button";
import Name from "../../Input/Name";

function AddSubTeamsGeneralTier({ teamsGeneralTier }) {
  const [name, setName] = useState({ value: "", error: true });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { addSubTeamsGeneralTier } = useContext(SubTeamsGeneralTiersContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = {
        name: name.value,
        teamsGeneralTierId: teamsGeneralTier._id,
      };

      addSubTeamsGeneralTier(body, setError, setSuccess);
    }
  };

  return (
    <div className={``}>
      <div className={`form_header`}>
        <h3>Ajoutez un Sous Tier Général</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <Name onBlur={setName} value="" disabled={false} label={true} />
        <Button>Ajouter</Button>
      </form>
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
    </div>
  );
}

export default AddSubTeamsGeneralTier;
