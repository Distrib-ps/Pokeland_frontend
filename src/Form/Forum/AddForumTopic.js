import { useState, useContext, useEffect } from "react";
import { ForumTopicsContext } from "../../Contexts/ForumTopicsContext";
import { UserContext } from "../../Contexts/UserContext";
import { ForumCategoriesContext } from "../../Contexts/ForumCategoriesContext";
import Title from "../../Input/Title";
import Button from "../../Button/Button";
import TextEditor from "../../Input/TextEditor";
import ForumSelect from "../../Input/ForumSelect";

function AddForumTopic() {
  const [title, setTitle] = useState({ value: "", error: true });
  const [description, setDescription] = useState({ value: "", error: true });
  const [category, setCategory] = useState({ name: "", id: "" });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { addForumTopic } = useContext(ForumTopicsContext);
  const { getForumCategories, forumCategories } = useContext(
    ForumCategoriesContext
  );
  const { user } = useContext(UserContext);

  useEffect(() => {
    getForumCategories(setError);
  }, [getForumCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.error || description.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = {
        title: title.value,
        description: description.value,
        categoryName: category.name,
        categoryId: category.id,
        userId: user._id,
      };

      addForumTopic(body, setError, setSuccess);
    }
  };

  return (
    <div className={``}>
      <div className={`form_header`}>
        <h3>Ajoutez un Topic</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <Title onBlur={setTitle} value="" disabled={false} label={true} />
        <ForumSelect optionsList={forumCategories} onChange={setCategory} />
        <TextEditor onBlur={setDescription} value="" />
        <Button>Ajouter</Button>
      </form>
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
    </div>
  );
}

export default AddForumTopic;
