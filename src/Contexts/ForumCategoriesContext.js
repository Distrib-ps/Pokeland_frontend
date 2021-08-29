import { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const ForumCategoriesContext = createContext();

const ForumCategoriesProvider = ({ children }) => {
  const [forumCategories, setForumCategories] = useState([]);

  const { token } = useContext(UserContext);

  const getForumCategories = useCallback(
    async (errorCallback) => {
      try {
        const responseServer = await axios.get(
          `https://pokelandbackend-server.herokuapp.com/forum-categories/categories`,
          {
            headers: { token: token },
          }
        );
        setForumCategories(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const addForumCategory = useCallback(
    async (body, errorCallback, successCallback) => {
      try {
        const response = await axios.post(
          "https://pokelandbackend-server.herokuapp.com/forum-categories/add",
          body,
          {
            headers: { token: token },
          }
        );
        setForumCategories((prevForumCategories) => {
          return [response.data, ...prevForumCategories];
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "La catégorie a bien été enregistré.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message:
            "L'enregistrement de la catégorie a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const updateForumCategory = useCallback(
    async (body, id, errorCallback, successCallback) => {
      try {
        const response = await axios.put(
          `https://pokelandbackend-server.herokuapp.com/forum-categories/update/${id}`,
          body,
          {
            headers: { token: token },
          }
        );
        setForumCategories((prevForumCategories) => {
          const existingForumCategories = [...prevForumCategories];
          const existingForumCategory = existingForumCategories.find(
            (forumCategory) => forumCategory._id === response.data._id
          );
          existingForumCategory.name = response.data.name;
          return existingForumCategories;
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "La Catégorie  a bien été modifié.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message: "La Catégorie n'a pas pu être modifié.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const deleteForumCategory = useCallback(
    async (id, errorCallback) => {
      try {
        await axios.delete(
          `https://pokelandbackend-server.herokuapp.com/forum-categories/delete/${id}`,
          {
            headers: { token: token },
          }
        );
        setForumCategories((prevForumCategories) => {
          return prevForumCategories.filter(
            (forumCategory) => forumCategory._id !== id
          );
        });
        errorCallback({ message: "", error: false });
      } catch (error) {
        errorCallback({
          message:
            "La suppression de la Catégorie a échoué, veuillez recommencer.",
          error: true,
        });
      }
    },
    [token]
  );

  return (
    <ForumCategoriesContext.Provider
      value={{
        forumCategories,
        setForumCategories,
        addForumCategory,
        getForumCategories,
        updateForumCategory,
        deleteForumCategory,
      }}
    >
      {children}
    </ForumCategoriesContext.Provider>
  );
};

export { ForumCategoriesContext, ForumCategoriesProvider };
