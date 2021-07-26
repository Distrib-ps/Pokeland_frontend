import { useState, useContext } from "react";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TournamentsCategoriesContext } from "../../Contexts/TournamentsCategoriesContext";
import Name from "../../Input/Name";

function TournamentsCategoryUpdatePopUp({ tournamentsCategory, closePopUp }) {
  const [name, setName] = useState({
    value: tournamentsCategory.name,
    error: false,
  });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { updateTournamentsCategory } = useContext(
    TournamentsCategoriesContext
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = {
        name: name.value,
      };

      updateTournamentsCategory(
        body,
        tournamentsCategory._id,
        setError,
        setSuccess
      );
    }
  };

  return (
    <div className={`form_popup`}>
      <div className={`form_popup_content form_popup-light`}>
        <form onSubmit={handleSubmit}>
          <div className={`form_header`}>
            <h3>Modifiez la catégorie.</h3>
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

export default TournamentsCategoryUpdatePopUp;
