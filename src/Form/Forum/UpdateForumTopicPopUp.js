import { useState, useContext, useEffect } from "react";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ForumTopicsContext } from "../../Contexts/ForumTopicsContext";
import { ForumCategoriesContext } from "../../Contexts/ForumCategoriesContext";
import Title from "../../Input/Title";
import TextEditor from "../../Input/TextEditor";
import ForumSelect from "../../Input/ForumSelect";

function UpdateForumTopicPopUp({ forumTopic, closePopUp }) {
  const [title, setTitle] = useState({ value: forumTopic.title, error: false });
  const [description, setDescription] = useState({
    value: forumTopic.description,
    error: false,
  });
  const [category, setCategory] = useState({
    name: forumTopic.categoryName,
    id: forumTopic.categoryId,
  });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { updateForumTopic } = useContext(ForumTopicsContext);
  const { getForumCategories, forumCategories } = useContext(
    ForumCategoriesContext
  );

  useEffect(() => {
    getForumCategories(setError);
  }, [getForumCategories]);

  const handleSubmit = (e) => {
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
        userId: forumTopic.userId,
      };

      updateForumTopic(body, forumTopic._id, setError, setSuccess);
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
            <Title
              onBlur={setTitle}
              value={title.value}
              disabled={false}
              label={true}
            />
            <ForumSelect optionsList={forumCategories} onChange={setCategory} />
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

export default UpdateForumTopicPopUp;
