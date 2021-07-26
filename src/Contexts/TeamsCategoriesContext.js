import { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const TeamsCategoriesContext = createContext();

const TeamsCategoriesProvider = ({ children }) => {
  const [teamsCategories, setTeamsCategories] = useState([]);

  const { token } = useContext(UserContext);

  const getTeamsCategories = useCallback(
    async (errorCallback, subTeamsGeneralTierId) => {
      try {
        const responseServer = await axios.get(
          `https://pokelandbackend.herokuapp.com/teams-categories/tiers/${subTeamsGeneralTierId}`,
          {
            headers: { token: token },
          }
        );
        setTeamsCategories(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const getTeamsCategoriesPage = useCallback(
    async (errorCallback, subTeamsGeneralTierId, setContent) => {
      try {
        const responseServer = await axios.get(
          `https://pokelandbackend.herokuapp.com/teams-categories/tiers/${subTeamsGeneralTierId}`,
          {
            headers: { token: token },
          }
        );
        setContent(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const addTeamsCategory = useCallback(
    async (body, errorCallback, successCallback) => {
      try {
        const response = await axios.post(
          "https://pokelandbackend.herokuapp.com/teams-categories/add",
          body,
          {
            headers: { token: token },
          }
        );
        setTeamsCategories((prevTeamsCategories) => {
          return [response.data, ...prevTeamsCategories];
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

  const updateTeamsCategory = useCallback(
    async (body, id, errorCallback, successCallback) => {
      try {
        const response = await axios.put(
          `https://pokelandbackend.herokuapp.com/teams-categories/update/${id}`,
          body,
          {
            headers: { token: token },
          }
        );
        setTeamsCategories((prevTeamsCategories) => {
          const existingTeamsCategories = [...prevTeamsCategories];
          const existingTeamsCategory = existingTeamsCategories.find(
            (teamsCategory) => teamsCategory._id === response.data._id
          );
          existingTeamsCategory.name = response.data.name;
          return existingTeamsCategories;
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

  const deleteTeamsCategory = useCallback(
    async (id, errorCallback, successCallback) => {
      try {
        await axios.delete(
          `https://pokelandbackend.herokuapp.com/teams-categories/delete/${id}`,
          {
            headers: { token: token },
          }
        );
        setTeamsCategories((prevTeamsCategories) => {
          return prevTeamsCategories.filter(
            (teamsCategory) => teamsCategory._id !== id
          );
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "La Catégorie a bien été supprimé.",
          success: true,
        });
      } catch (error) {
        errorCallback({
          message:
            "La suppression de la Catégorie a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  return (
    <TeamsCategoriesContext.Provider
      value={{
        teamsCategories,
        setTeamsCategories,
        addTeamsCategory,
        getTeamsCategories,
        updateTeamsCategory,
        deleteTeamsCategory,
        getTeamsCategoriesPage,
      }}
    >
      {children}
    </TeamsCategoriesContext.Provider>
  );
};

export { TeamsCategoriesContext, TeamsCategoriesProvider };
