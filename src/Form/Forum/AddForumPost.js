import { useState, useContext } from "react";
import { ForumPostsContext } from "../../Contexts/ForumPostsContext";
import { UserContext } from "../../Contexts/UserContext";
import Button from "../../Button/Button";
import TextEditor from "../../Input/TextEditor";

function AddForumPost({ topicId }) {
  const [description, setDescription] = useState({ value: "", error: true });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { addForumPost } = useContext(ForumPostsContext);
  const { user } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (description.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = {
        description: description.value,
        topicId: topicId,
        userId: user._id,
      };

      addForumPost(body, setError, setSuccess);
    }
  };

  return (
    <div className={``}>
      <div className={`form_header`}>
        <h3>Ajoutez une Réponse</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <TextEditor onBlur={setDescription} value="" />
        <Button>Ajouter</Button>
      </form>
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
    </div>
  );
}

export default AddForumPost;
