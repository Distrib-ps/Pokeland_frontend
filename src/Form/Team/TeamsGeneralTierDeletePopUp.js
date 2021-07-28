import { useState, useContext } from "react";
import Button from "../../Button/Button";
import { TeamsGeneralTiersContext } from "../../Contexts/TeamsGeneralTiersContext";

function TeamGeneralTierDeletePopUp({ closePopUp, teamsGeneralTierId }) {
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { deleteTeamsGeneralTier } = useContext(TeamsGeneralTiersContext);

  return (
    <div className={`form_popup`}>
      <div className={`form_popup_content form_popup-light`}>
        <p>
          Vous êtes sur le point de supprimer la Tier Général, voulez vous
          continuer ?
        </p>
        <div className={`form_popup_navigation`}>
          <Button
            onClick={() => {
              deleteTeamsGeneralTier(teamsGeneralTierId, setError, setSuccess);
            }}
          >
            Confirmer
          </Button>
          <Button onClick={closePopUp}>Annuler</Button>
        </div>
      </div>
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
    </div>
  );
}

export default TeamGeneralTierDeletePopUp;
