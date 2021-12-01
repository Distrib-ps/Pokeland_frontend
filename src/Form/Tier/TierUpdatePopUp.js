import { useState, useContext } from "react";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import TierDate from "../../Input/TierDate";
import TierName from "../../Input/TierName";
import TierSelectName from "../../Input/TierSelectName";
import { TiersContext } from "../../Contexts/TiersContext";

function TierUpdatePopUp({ tier, closePopUp }) {
  const [tierDate, setTierDate] = useState({ value: tier.date, error: false });
  const [tierName, setTierName] = useState({ value: tier.name, error: false });
  const [tierSelectName, setTierSelectName] = useState({
    value: tier.selectName,
    error: false,
  });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { updateTier } = useContext(TiersContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tierDate.error || tierName.error || tierSelectName.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = {
        date: tierDate.value,
        name: tierName.value,
        selectName: tierSelectName.value,
      };

      updateTier(body, tier._id, setError, setSuccess);
    }
  };

  return (
    <div className={`form_popup`}>
      <div className={`form_popup_content form_popup-light`}>
        <form onSubmit={handleSubmit}>
          <div className={`form_header`}>
            <h3>Modifiez le Tier.</h3>
            <Button onClick={closePopUp}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </div>
          <div>
            <TierDate
              onBlur={setTierDate}
              value={tierDate.value}
              disabled={false}
              label={true}
            />
            <TierName
              onBlur={setTierName}
              value={tierName.value}
              disabled={false}
              label={true}
            />
            <TierSelectName
              onBlur={setTierSelectName}
              value={tierSelectName.value}
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

export default TierUpdatePopUp;
