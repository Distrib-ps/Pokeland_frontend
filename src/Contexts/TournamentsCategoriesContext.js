import { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const TournamentsCategoriesContext = createContext();

const TournamentsCategoriesProvider = ({ children }) => {
  const [tournamentsCategories, setTournamentsCategories] = useState([]);

  const { token } = useContext(UserContext);

  const getTournamentsCategories = useCallback(
    async (errorCallback) => {
      try {
        const responseServer = await axios.get(
          `https://pokelandbackend-server.herokuapp.com/tournaments-categories/tournaments`,
          {
            headers: { token: token },
          }
        );
        setTournamentsCategories(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const getTournamentsCategoriesPage = useCallback(
    async (errorCallback, setContent) => {
      try {
        const responseServer = await axios.get(
          `https://pokelandbackend-server.herokuapp.com/tournaments-categories/tournaments`,
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

  const addTournamentsCategory = useCallback(
    async (body, errorCallback, successCallback) => {
      try {
        const response = await axios.post(
          "https://pokelandbackend-server.herokuapp.com/tournaments-categories/add",
          body,
          {
            headers: { token: token },
          }
        );
        setTournamentsCategories((prevTournamentsCategories) => {
          return [response.data, ...prevTournamentsCategories];
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

  const updateTournamentsCategory = useCallback(
    async (body, id, errorCallback, successCallback) => {
      try {
        const response = await axios.put(
          `https://pokelandbackend-server.herokuapp.com/tournaments-categories/update/${id}`,
          body,
          {
            headers: { token: token },
          }
        );
        setTournamentsCategories((prevTournamentsCategories) => {
          const existingTournamentsCategories = [...prevTournamentsCategories];
          const existingTournamentsCategory =
            existingTournamentsCategories.find(
              (tournamentsCategory) =>
                tournamentsCategory._id === response.data._id
            );
          existingTournamentsCategory.name = response.data.name;
          return existingTournamentsCategories;
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

  const deleteTournamentsCategory = useCallback(
    async (id, errorCallback, successCallback) => {
      try {
        await axios.delete(
          `https://pokelandbackend-server.herokuapp.com/tournaments-categories/delete/${id}`,
          {
            headers: { token: token },
          }
        );
        setTournamentsCategories((prevTournamentsCategories) => {
          return prevTournamentsCategories.filter(
            (tournamentsCategory) => tournamentsCategory._id !== id
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
    <TournamentsCategoriesContext.Provider
      value={{
        tournamentsCategories,
        setTournamentsCategories,
        addTournamentsCategory,
        getTournamentsCategories,
        updateTournamentsCategory,
        deleteTournamentsCategory,
        getTournamentsCategoriesPage,
      }}
    >
      {children}
    </TournamentsCategoriesContext.Provider>
  );
};

export { TournamentsCategoriesContext, TournamentsCategoriesProvider };
