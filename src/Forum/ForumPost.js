import { useState, useContext, useEffect } from "react";
import Button from "../Button/Button";
import parse from "html-react-parser";
import { UserContext } from "../Contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import UpdateForumPostPopUp from "../Form/Forum/UpdateForumPostPopUp";
import ForumPostDeletePopUp from "../Form/Forum/ForumPostDeletePopUp";

function ForumPost({ forumPost }) {
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState({ message: "", error: false });

  const [popupDelete, setPopupDelete] = useState(null);
  const [popup, setPopUp] = useState(false);

  const { getUserById, user } = useContext(UserContext);

  useEffect(() => {
    getUserById(setError, forumPost.userId, setAuthor);
  }, [getUserById, forumPost]);

  const closePopUp = () => {
    setPopUp(false);
  };

  const handleClosePopUpDelete = () => {
    setPopupDelete(null);
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
        <p className={``}>{forumPost.date}</p>
        {user &&
          (user.role === "Owner" ||
            user.role === "Driver" ||
            user.role === "Moderateur" ||
            user._id === forumPost.userId) && (
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
      <div className={`post_description`}>{parse(forumPost.description)}</div>
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {popup && (
        <UpdateForumPostPopUp forumPost={forumPost} closePopUp={closePopUp} />
      )}
      {popupDelete && (
        <ForumPostDeletePopUp
          closePopUp={handleClosePopUpDelete}
          forumPostId={forumPost._id}
        />
      )}
    </div>
  );
}

export default ForumPost;
