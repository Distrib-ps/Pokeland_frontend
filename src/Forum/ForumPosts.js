import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import AddForumPost from "../Form/Forum/AddForumPost";
import ForumPost from "./ForumPost";
import { ForumPostsContext } from "../Contexts/ForumPostsContext";

function ForumPosts({ topicId }) {
  const [form, setForm] = useState(false);
  const [error, setError] = useState(false);

  const { forumPosts, getForumPosts } = useContext(ForumPostsContext);

  useEffect(() => {
    getForumPosts(setError, topicId);
  }, [topicId, getForumPosts]);

  return (
    <div className={`forum_topics`}>
      <h3>Réponses</h3>
      {forumPosts &&
        forumPosts.length !== 0 &&
        forumPosts.map((forumPost) => {
          return <ForumPost forumPost={forumPost} key={forumPost._id} />;
        })}
      {!form && (
        <div className={`forum_topic_admin_header`}>
          <h3>Ajouter une réponse</h3>
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
      {form && <AddForumPost topicId={topicId} />}
      {error && <p>Le chargement de la liste des Réponses a échoué.</p>}
    </div>
  );
}

export default ForumPosts;
