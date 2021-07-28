import { useState, useContext } from "react";
import Button from "../../Button/Button";
import { ForumCategoriesContext } from "../../Contexts/ForumCategoriesContext";

function ForumCategoryDeletePopUp({ closePopUp, forumCategoryId }) {
  const [error, setError] = useState({ message: "", error: false });

  const { deleteForumCategory } = useContext(ForumCategoriesContext);

  return (
    <div className={`form_popup`}>
      <div className={`form_popup_content form_popup-light`}>
        <p>
          Vous êtes sur le point de supprimer l'Actualité, voulez vous continuer
          ?
        </p>
        <div className={`form_popup_navigation`}>
          <Button
            onClick={() => {
              deleteForumCategory(forumCategoryId, setError);
            }}
          >
            Confirmer
          </Button>
          <Button onClick={closePopUp}>Annuler</Button>
        </div>
      </div>
      {error.error && <p className={`form_error`}>{error.message}</p>}
    </div>
  );
}

export default ForumCategoryDeletePopUp;
