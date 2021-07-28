import { useState, useContext } from "react";
import Button from "../../Button/Button";
import { SubTeamsGeneralTiersContext } from "../../Contexts/SubTeamsGeneralTiersContext";

function SubTeamGeneralTierDeletePopUp({ closePopUp, subTeamsGeneralTierId }) {
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { deleteSubTeamsGeneralTier } = useContext(SubTeamsGeneralTiersContext);

  return (
    <div className={`form_popup`}>
      <div className={`form_popup_content form_popup-light`}>
        <p>
          Vous êtes sur le point de supprimer le sous Tier General, voulez vous
          continuer ?
        </p>
        <div className={`form_popup_navigation`}>
          <Button
            onClick={() => {
              deleteSubTeamsGeneralTier(
                subTeamsGeneralTierId,
                setError,
                setSuccess
              );
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

export default SubTeamGeneralTierDeletePopUp;
