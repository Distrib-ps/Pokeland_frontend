import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../Contexts/UserContext";
import Button from "../Button/Button";
import UpdateForumCategoryPopUp from "../Form/Forum/UpdateForumCategoryPopUp";
import ForumCategoryDeletePopUp from "../Form/Forum/ForumCategoryDeletePopUp";

function ForumCategory({ forumCategory, onClick }) {
  const [popupDelete, setPopupDelete] = useState(null);
  const [popup, setPopUp] = useState(false);
  const { user } = useContext(UserContext);

  const handleClosePopUp = () => {
    setPopUp(false);
  };

  const handleClosePopUpDelete = () => {
    setPopupDelete(null);
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
            user.role === "Driver" ||
            user.role === "Moderateur") && (
            <>
              <Button onClick={() => setPopUp(true)}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button
                onClick={() => {
                  setPopupDelete(true);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </>
          )}
      </div>
      {popup && (
        <UpdateForumCategoryPopUp
          forumCategory={forumCategory}
          closePopUp={handleClosePopUp}
        />
      )}
      {popupDelete && (
        <ForumCategoryDeletePopUp
          closePopUp={handleClosePopUpDelete}
          forumCategoryId={forumCategory._id}
        />
      )}
    </div>
  );
}

export default ForumCategory;
