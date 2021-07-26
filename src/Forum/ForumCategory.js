import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../Contexts/UserContext";
import { ForumCategoriesContext } from "../Contexts/ForumCategoriesContext";
import Button from "../Button/Button";
import UpdateForumCategoryPopUp from "../Form/Forum/UpdateForumCategoryPopUp";

function ForumCategory({ forumCategory, onClick }) {
  const [error, setError] = useState(false);
  const [popup, setPopUp] = useState(false);
  const { user } = useContext(UserContext);
  const { deleteForumCategory } = useContext(ForumCategoriesContext);

  const handleClosePopUp = () => {
    setPopUp(false);
  };

  const handleClick = (e) => {
    onClick(e, forumCategory);
  };

  return (
    <div
      className={`forum_category forum_category-light`}
      onClick={handleClick}
    >
      <div className={`forum_category_content`}>
        <p className={`forum_category_title`}>{forumCategory.name}</p>
        {user &&
          (user.role === "Owner" ||
            user.role === "Rédacteur" ||
            user.role === "Moderateur") && (
            <>
              <Button onClick={() => setPopUp(true)}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button
                onClick={() => {
                  deleteForumCategory(forumCategory._id, setError);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </>
          )}
      </div>
      {error && <p>Erreur</p>}
      {popup && (
        <UpdateForumCategoryPopUp
          forumCategory={forumCategory}
          closePopUp={handleClosePopUp}
        />
      )}
    </div>
  );
}

export default ForumCategory;
