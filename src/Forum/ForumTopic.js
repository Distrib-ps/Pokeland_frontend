import { useState, useContext, useEffect } from "react";
import Button from "../Button/Button";
import parse from "html-react-parser";
import { UserContext } from "../Contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import UpdateForumTopicPopUp from "../Form/Forum/UpdateForumTopicPopUp";
import ForumPosts from "./ForumPosts";
import ForumTopicDeletePopUp from "../Form/Forum/ForumTopicDeletePopUp";

function ForumTopic({ forumTopic }) {
  const [error, setError] = useState(false);
  const [description, setDescription] = useState(false);
  const [author, setAuthor] = useState(null);

  const [popupDelete, setPopupDelete] = useState(null);
  const [popup, setPopUp] = useState(false);

  const { getUserById, user } = useContext(UserContext);

  useEffect(() => {
    getUserById(setError, forumTopic.userId, setAuthor);
  }, [getUserById, forumTopic]);

  const handleDescription = () => {
    setDescription(!description);
  };

  const handleClosePopUpDelete = () => {
    setPopupDelete(null);
  };

  const closePopUp = () => {
    setPopUp(false);
  };

  return (
    <div className={`forum_topic forum_topic-light`}>
      <div className={`forum_topic_content`}>
        {author &&
          author.profilePicture &&
          author.profilePicture.includes("http") && (
            <span
              className={`forum_header_img`}
              style={{ backgroundImage: `url(${author.profilePicture})` }}
            ></span>
          )}
        {author && !author.profilePicture && (
          <div className={`forum_header_icon forum_header_icon-light`}>
            <FontAwesomeIcon icon={faUser} />
          </div>
        )}
        {author &&
          author.profilePicture &&
          !author.profilePicture.includes("http") && (
            <span
              className={`forum_header_img`}
              style={{
                backgroundImage: `url(https://pokelandbackend-server.herokuapp.com/static/${author.profilePicture})`,
              }}
            ></span>
          )}
        {author && <p>{author.pseudo}</p>}
        <h3 className={``}>{forumTopic.title}</h3>
        <p className={``}>{forumTopic.date}</p>
        <Button onClick={handleDescription}>Description</Button>
        {user &&
          (user.role === "Owner" ||
            user.role === "Driver" ||
            user.role === "Moderateur" ||
            user._id === forumTopic.userId) && (
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
      {description && (
        <>
          <div className={`topic_description`}>
            {parse(forumTopic.description)}
          </div>
          <ForumPosts topicId={forumTopic._id} />
        </>
      )}
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {popup && (
        <UpdateForumTopicPopUp
          forumTopic={forumTopic}
          closePopUp={closePopUp}
        />
      )}
      {popupDelete && (
        <ForumTopicDeletePopUp
          closePopUp={handleClosePopUpDelete}
          forumTopicId={forumTopic._id}
        />
      )}
    </div>
  );
}

export default ForumTopic;
