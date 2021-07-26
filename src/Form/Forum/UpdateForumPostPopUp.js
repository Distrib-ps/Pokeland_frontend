import { useState, useContext } from "react";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ForumPostsContext } from "../../Contexts/ForumPostsContext";
import TextEditor from "../../Input/TextEditor";

function UpdateForumPostPopUp({ forumPost, closePopUp }) {
  const [description, setDescription] = useState({
    value: forumPost.description,
    error: false,
  });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { updateForumPost } = useContext(ForumPostsContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (description.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = {
        description: description.value,
        topicId: forumPost.topicId,
        userId: forumPost.userId,
      };

      updateForumPost(body, forumPost._id, setError, setSuccess);
    }
  };

  return (
    <div className={`form_popup`}>
      <div className={`form_popup_content form_popup-light`}>
        <form onSubmit={handleSubmit}>
          <div className={`form_header`}>
            <h3>Modifiez la réponse.</h3>
            <Button onClick={closePopUp}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </div>
          <div>
            <TextEditor onBlur={setDescription} value={description.value} />
            <Button>Ajouter</Button>
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

export default UpdateForumPostPopUp;
