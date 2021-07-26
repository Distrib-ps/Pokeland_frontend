import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import AddForumTopic from "../Form/Forum/AddForumTopic";
import ForumTopic from "./ForumTopic";
import { ForumTopicsContext } from "../Contexts/ForumTopicsContext";

function ForumTopics({ categoryID }) {
  const [form, setForm] = useState(false);
  const [error, setError] = useState(false);

  const { getAllForumTopics, forumTopics, getForumTopics } =
    useContext(ForumTopicsContext);

  useEffect(() => {
    if (categoryID === "") getAllForumTopics(setError);
    if (categoryID !== "") getForumTopics(setError, categoryID);
  }, [getAllForumTopics, categoryID, getForumTopics]);

  return (
    <div className={`forum_topics`}>
      <h3>Topics</h3>
      {!form && (
        <div className={`forum_topic_admin_header`}>
          <h3>Ajouter un Topic</h3>
          <Button
            onClick={() => {
              setForm(!form);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      )}
      {form && (
        <div className={`forum_topic_admin_header`}>
          <h3>Retour</h3>
          <Button
            onClick={() => {
              setForm(!form);
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
        </div>
      )}
      {form && <AddForumTopic />}
      {forumTopics &&
        forumTopics.length !== 0 &&
        forumTopics.map((forumTopic) => {
          return <ForumTopic forumTopic={forumTopic} key={forumTopic._id} />;
        })}
      {error && <p>Le chargement de la liste des Topics a échoué.</p>}
    </div>
  );
}

export default ForumTopics;
