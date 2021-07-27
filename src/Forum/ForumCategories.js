import { useState, useContext, useEffect } from "react";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ForumCategoryAddPopUp from "../Form/Forum/ForumCategoryAddPopUp";
import { UserContext } from "../Contexts/UserContext";
import { ForumCategoriesContext } from "../Contexts/ForumCategoriesContext";
import ForumCategory from "./ForumCategory";

function ForumCategories({ onClick, resetCategories }) {
  const [popup, setPopUp] = useState(false);
  const { user } = useContext(UserContext);
  const [error, setError] = useState(null);
  const { getForumCategories, forumCategories } = useContext(
    ForumCategoriesContext
  );

  useEffect(() => {
    getForumCategories(setError);
  }, [getForumCategories]);

  const handleClosePopUp = () => {
    setPopUp(false);
  };

  return (
    <div className={`forum_categories`}>
      <div className={`forum_categories_header`}>
        <h3
          onClick={() => resetCategories("")}
          className={`forum_categories_reset`}
        >
          Catégories
        </h3>
        {user &&
          (user.role === "Owner" ||
            user.role === "Driver" ||
            user.role === "Moderateur") && (
            <Button
              onClick={() => {
                setPopUp(true);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          )}
      </div>
      <div className={`forum_categories_content`}>
        {forumCategories &&
          forumCategories.length &&
          forumCategories.map((forumCategory) => {
            return (
              <ForumCategory
                forumCategory={forumCategory}
                key={forumCategory._id}
                onClick={onClick}
              />
            );
          })}
      </div>
      {error && <p>Le chargement des Catégories a échoué.</p>}
      {popup && <ForumCategoryAddPopUp closePopUp={handleClosePopUp} />}
    </div>
  );
}

export default ForumCategories;
