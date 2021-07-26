import { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const ForumTopicsContext = createContext();

const ForumTopicsProvider = ({ children }) => {
  const [forumTopics, setForumTopics] = useState([]);

  const { token, user } = useContext(UserContext);

  const getForumTopics = useCallback(
    async (errorCallback, forumCategoryId) => {
      try {
        const responseServer = await axios.get(
          `http://localhost:8000/forum-topics/topic/${forumCategoryId}`,
          {
            headers: { token: token },
          }
        );
        setForumTopics(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const getAllForumTopics = useCallback(
    async (errorCallback) => {
      try {
        const responseServer = await axios.get(
          "http://localhost:8000/forum-topics/all",
          {
            headers: { token: token },
          }
        );
        setForumTopics(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const addForumTopic = useCallback(
    async (body, errorCallback, successCallback) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/forum-topics/add",
          body,
          {
            headers: { token: token },
          }
        );
        setForumTopics((prevForumTopics) => {
          return [response.data, ...prevForumTopics];
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Topic a bien été enregistré.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message: "L'enregistrement du Topic a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const updateForumTopic = useCallback(
    async (body, id, errorCallback, successCallback) => {
      try {
        const response = await axios.put(
          `http://localhost:8000/forum-topics/update/${id}`,
          body,
          {
            headers: { token: token },
          }
        );
        setForumTopics((prevForumTopics) => {
          const existingForumTopics = [...prevForumTopics];
          const existingForumTopic = existingForumTopics.find(
            (forumTopic) => forumTopic._id === response.data._id
          );
          existingForumTopic.title = response.data.title;
          existingForumTopic.categoryName = response.data.categoryName;
          existingForumTopic.categoryId = response.data.categoryId;
          existingForumTopic.description = response.data.description;
          existingForumTopic.userId = user._id;
          return existingForumTopics;
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Topic a bien été modifié.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message: "Le Topic n'a pas pu être modifié.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token, user]
  );

  const deleteForumTopic = useCallback(
    async (id, errorCallback, successCallback) => {
      try {
        await axios.delete(`http://localhost:8000/forum-topics/delete/${id}`, {
          headers: { token: token },
        });
        setForumTopics((prevForumTopics) => {
          return prevForumTopics.filter(
            (forumTopics) => forumTopics._id !== id
          );
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Topic a bien été supprimé.",
          success: true,
        });
      } catch (error) {
        errorCallback({
          message: "La suppression du Topic a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  return (
    <ForumTopicsContext.Provider
      value={{
        forumTopics,
        setForumTopics,
        addForumTopic,
        getForumTopics,
        updateForumTopic,
        deleteForumTopic,
        getAllForumTopics,
      }}
    >
      {children}
    </ForumTopicsContext.Provider>
  );
};

export { ForumTopicsContext, ForumTopicsProvider };
