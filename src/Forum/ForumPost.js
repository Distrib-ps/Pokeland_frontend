import { useState, useContext, useEffect } from "react";
import Button from "../Button/Button";
import parse from "html-react-parser";
import { UserContext } from "../Contexts/UserContext";
import { ForumPostsContext } from "../Contexts/ForumPostsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import UpdateForumPostPopUp from "../Form/Forum/UpdateForumPostPopUp";

function ForumPost({ forumPost }) {
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const [popup, setPopUp] = useState(false);

  const { getUserById, user } = useContext(UserContext);
  const { deleteForumPost } = useContext(ForumPostsContext);

  useEffect(() => {
    getUserById(setError, forumPost.userId, setAuthor);
  }, [getUserById, forumPost]);

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
                backgroundImage: `url(http://localhost:8000/static/${author.profilePicture})`,
              }}
            ></span>
          )}
        <p className={``}>{forumPost.date}</p>
        {user &&
          (user.role === "Owner" ||
            user.role === "Rédacteur" ||
            user.role === "Moderateur" ||
            user._id === forumPost.userId) && (
            <>
              <Button onClick={() => setPopUp(true)}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button
                onClick={() => {
                  deleteForumPost(forumPost._id, setError, setSuccess);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </>
          )}
      </div>
      <div className={`post_description`}>{parse(forumPost.description)}</div>
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
      {popup && (
        <UpdateForumPostPopUp forumPost={forumPost} closePopUp={closePopUp} />
      )}
    </div>
  );
}

export default ForumPost;
