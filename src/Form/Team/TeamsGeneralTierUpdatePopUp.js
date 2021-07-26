import { useState, useContext } from "react";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TeamsGeneralTiersContext } from "../../Contexts/TeamsGeneralTiersContext";
import Name from "../../Input/Name";

function TeamsGeneralTierUpdatePopUp({ teamsGeneralTier, closePopUp }) {
  const [name, setName] = useState({
    value: teamsGeneralTier.name,
    error: false,
  });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { updateTeamsGeneralTier } = useContext(TeamsGeneralTiersContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = {
        name: name.value,
      };

      updateTeamsGeneralTier(body, teamsGeneralTier._id, setError, setSuccess);
    }
  };

  return (
    <div className={`form_popup`}>
      <div className={`form_popup_content form_popup-light`}>
        <form onSubmit={handleSubmit}>
          <div className={`form_header`}>
            <h3>Modifiez le Tier Général.</h3>
            <Button onClick={closePopUp}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </div>
          <div>
            <Name
              onBlur={setName}
              value={name.value}
              disabled={false}
              label={true}
            />
          </div>
          <Button
            onClick={() => {
              return;
            }}
          >
            Modifier
          </Button>
        </form>
        {error.error && <p className={``}>{error.message}</p>}
        {success.success && <p>{success.message}</p>}
      </div>
    </div>
  );
}

export default TeamsGeneralTierUpdatePopUp;
