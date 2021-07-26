import { useState, useContext } from "react";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ForumCategoriesContext } from "../../Contexts/ForumCategoriesContext";
import Name from "../../Input/Name";

function ForumCategoryAddPopUp({ closePopUp }) {
  const [name, setName] = useState({
    value: "",
    error: true,
  });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { addForumCategory } = useContext(ForumCategoriesContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = {
        name: name.value,
      };

      addForumCategory(body, setError, setSuccess);
    }
  };

  return (
    <div className={`form_popup`}>
      <div className={`form_popup_content form_popup-light`}>
        <form onSubmit={handleSubmit}>
          <div className={`form_header`}>
            <h3>Ajoutez une catégorie.</h3>
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
            Ajouter
          </Button>
        </form>
        {error.error && <p className={``}>{error.message}</p>}
        {success.success && <p>{success.message}</p>}
      </div>
    </div>
  );
}

export default ForumCategoryAddPopUp;
