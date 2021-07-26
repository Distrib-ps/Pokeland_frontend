import { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const TournamentsContext = createContext();

const TournamentsProvider = ({ children }) => {
  const [tournaments, setTournaments] = useState([]);

  const { token } = useContext(UserContext);

  const getTournaments = useCallback(
    async (errorCallback, tournamentsCategoryId) => {
      try {
        const responseServer = await axios.get(
          `http://localhost:8000/tournaments/tournaments/${tournamentsCategoryId}`,
          {
            headers: { token: token },
          }
        );
        setTournaments(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const getTournamentsPage = useCallback(
    async (errorCallback, tournamentsCategoryId, setContent) => {
      try {
        const responseServer = await axios.get(
          `http://localhost:8000/tournaments/tournaments/${tournamentsCategoryId}`,
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

  const getAllTournaments = useCallback(
    async (errorCallback) => {
      try {
        const responseServer = await axios.get(
          "http://localhost:8000/tournaments/all",
          {
            headers: { token: token },
          }
        );
        setTournaments(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const addTournament = useCallback(
    async (body, errorCallback, successCallback) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/tournaments/add",
          body,
          {
            headers: { token: token },
          }
        );
        setTournaments((prevTournaments) => {
          return [response.data, ...prevTournaments];
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Tournois a bien été enregistré.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message:
            "L'enregistrement du Tournois a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const updateTournament = useCallback(
    async (body, id, errorCallback, successCallback) => {
      try {
        const response = await axios.put(
          `http://localhost:8000/tournaments/update/${id}`,
          body,
          {
            headers: { token: token },
          }
        );
        setTournaments((prevTournaments) => {
          const existingTournaments = [...prevTournaments];
          const existingTournament = existingTournaments.find(
            (tournament) => tournament._id === response.data._id
          );
          existingTournament.title = response.data.title;
          existingTournament.categoryName = response.data.categoryName;
          existingTournament.categoryId = response.data.categoryId;
          existingTournament.description = response.data.description;
          existingTournament.picture = response.data.picture;
          return existingTournaments;
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Tournois a bien été modifié.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message: "Le Tournois n'a pas pu être modifié.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const deleteTournament = useCallback(
    async (id, errorCallback, successCallback) => {
      try {
        await axios.delete(`http://localhost:8000/tournaments/delete/${id}`, {
          headers: { token: token },
        });
        setTournaments((prevTournaments) => {
          return prevTournaments.filter(
            (tournaments) => tournaments._id !== id
          );
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Tournois a bien été supprimé.",
          success: true,
        });
      } catch (error) {
        errorCallback({
          message: "La suppression du Tournois a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  return (
    <TournamentsContext.Provider
      value={{
        tournaments,
        setTournaments,
        addTournament,
        getTournaments,
        updateTournament,
        deleteTournament,
        getAllTournaments,
        getTournamentsPage,
      }}
    >
      {children}
    </TournamentsContext.Provider>
  );
};

export { TournamentsContext, TournamentsProvider };
