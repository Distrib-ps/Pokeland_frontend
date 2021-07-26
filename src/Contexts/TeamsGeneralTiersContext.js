import { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const TeamsGeneralTiersContext = createContext();

const TeamsGeneralTiersProvider = ({ children }) => {
  const [teamsGeneralTiers, setTeamsGeneralTiers] = useState([]);

  const { token } = useContext(UserContext);

  const getTeamsGeneralTiers = useCallback(
    async (errorCallback) => {
      try {
        const responseServer = await axios.get(
          "https://pokelandbackend.herokuapp.com/teams-general-tiers/tiers",
          {
            headers: { token: token },
          }
        );
        setTeamsGeneralTiers(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const addTeamsGeneralTier = useCallback(
    async (body, errorCallback, successCallback) => {
      try {
        const response = await axios.post(
          "https://pokelandbackend.herokuapp.com/teams-general-tiers/add",
          body,
          {
            headers: { token: token },
          }
        );
        setTeamsGeneralTiers((prevTeamsGeneralTiers) => {
          return [response.data, ...prevTeamsGeneralTiers];
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Tier Général a bien été enregistré.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message:
            "L'enregistrement du Tier Général a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const updateTeamsGeneralTier = useCallback(
    async (body, id, errorCallback, successCallback) => {
      try {
        const response = await axios.put(
          `https://pokelandbackend.herokuapp.com/teams-general-tiers/update/${id}`,
          body,
          {
            headers: { token: token },
          }
        );
        setTeamsGeneralTiers((prevTeamsGeneralTiers) => {
          const existingTeamsGeneralTiers = [...prevTeamsGeneralTiers];
          const existingTeamsGeneralTier = existingTeamsGeneralTiers.find(
            (teamsGeneralTier) => teamsGeneralTier._id === response.data._id
          );
          existingTeamsGeneralTier.name = response.data.name;
          return existingTeamsGeneralTiers;
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Tier Général a bien été modifié.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message: "Le Tier Général n'a pas pu être modifié.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const deleteTeamsGeneralTier = useCallback(
    async (id, errorCallback, successCallback) => {
      try {
        await axios.delete(
          `https://pokelandbackend.herokuapp.com/teams-general-tiers/delete/${id}`,
          {
            headers: { token: token },
          }
        );
        setTeamsGeneralTiers((prevTeamsGeneralTiers) => {
          return prevTeamsGeneralTiers.filter(
            (teamsGeneralTier) => teamsGeneralTier._id !== id
          );
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Tier Général a bien été supprimé.",
          success: true,
        });
      } catch (error) {
        errorCallback({
          message:
            "La suppression du Tier Général a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  return (
    <TeamsGeneralTiersContext.Provider
      value={{
        teamsGeneralTiers,
        setTeamsGeneralTiers,
        addTeamsGeneralTier,
        getTeamsGeneralTiers,
        updateTeamsGeneralTier,
        deleteTeamsGeneralTier,
      }}
    >
      {children}
    </TeamsGeneralTiersContext.Provider>
  );
};

export { TeamsGeneralTiersContext, TeamsGeneralTiersProvider };
