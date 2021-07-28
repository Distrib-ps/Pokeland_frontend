import { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const ForumPostsContext = createContext();

const ForumPostsProvider = ({ children }) => {
  const [forumPosts, setForumPosts] = useState([]);

  const { token, user } = useContext(UserContext);

  const getForumPosts = useCallback(
    async (errorCallback, topicId) => {
      try {
        const responseServer = await axios.get(
          `https://pokelandbackend.herokuapp.com/forum-posts/posts/${topicId}`,
          {
            headers: { token: token },
          }
        );
        setForumPosts(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const addForumPost = useCallback(
    async (body, errorCallback, successCallback) => {
      try {
        const response = await axios.post(
          "https://pokelandbackend.herokuapp.com/forum-posts/add",
          body,
          {
            headers: { token: token },
          }
        );
        setForumPosts((prevForumPosts) => {
          return [response.data, ...prevForumPosts];
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "La réponse a bien été enregistré.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message:
            "L'enregistrement de la réponse a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const updateForumPost = useCallback(
    async (body, id, errorCallback, successCallback) => {
      try {
        const response = await axios.put(
          `https://pokelandbackend.herokuapp.com/forum-posts/update/${id}`,
          body,
          {
            headers: { token: token },
          }
        );
        setForumPosts((prevForumPosts) => {
          const existingForumPosts = [...prevForumPosts];
          const existingForumPost = existingForumPosts.find(
            (forumPost) => forumPost._id === response.data._id
          );
          existingForumPost.title = response.data.title;
          existingForumPost.categoryName = response.data.categoryName;
          existingForumPost.categoryId = response.data.categoryId;
          existingForumPost.description = response.data.description;
          existingForumPost.userId = user._id;
          return existingForumPosts;
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "La réponse a bien été modifié.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message: "La réponse n'a pas pu être modifié.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token, user]
  );

  const deleteForumPost = useCallback(
    async (id, errorCallback, successCallback) => {
      try {
        await axios.delete(
          `https://pokelandbackend.herokuapp.com/forum-posts/delete/${id}`,
          {
            headers: { token: token },
          }
        );
        setForumPosts((prevForumPosts) => {
          return prevForumPosts.filter((forumPosts) => forumPosts._id !== id);
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "La réponse a bien été supprimé.",
          success: true,
        });
      } catch (error) {
        errorCallback({
          message:
            "La suppression de la réponse a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  return (
    <ForumPostsContext.Provider
      value={{
        forumPosts,
        setForumPosts,
        addForumPost,
        getForumPosts,
        updateForumPost,
        deleteForumPost,
      }}
    >
      {children}
    </ForumPostsContext.Provider>
  );
};

export { ForumPostsContext, ForumPostsProvider };
