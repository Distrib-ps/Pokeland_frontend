import { useState, useContext } from "react";
import { TeamsGeneralTiersContext } from "../../Contexts/TeamsGeneralTiersContext";
import Button from "../../Button/Button";
import Name from "../../Input/Name";

function AddTeamsGeneralTier() {
  const [name, setName] = useState({ value: "", error: true });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { addTeamsGeneralTier } = useContext(TeamsGeneralTiersContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = {
        name: name.value,
      };

      addTeamsGeneralTier(body, setError, setSuccess);
    }
  };

  return (
    <div className={``}>
      <div className={`form_header`}>
        <h3>Ajoutez un Tier Général</h3>
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

export default AddTeamsGeneralTier;
