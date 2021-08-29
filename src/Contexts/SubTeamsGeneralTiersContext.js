import { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const SubTeamsGeneralTiersContext = createContext();

const SubTeamsGeneralTiersProvider = ({ children }) => {
  const [subTeamsGeneralTiers, setSubTeamsGeneralTiers] = useState([]);

  const { token } = useContext(UserContext);

  const getSubTeamsGeneralTiers = useCallback(
    async (errorCallback, teamsGeneralTierId) => {
      try {
        const responseServer = await axios.get(
          `https://pokelandbackend-server.herokuapp.com/sub-teams-general-tiers/tiers/${teamsGeneralTierId}`,
          {
            headers: { token: token },
          }
        );
        setSubTeamsGeneralTiers(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const getSubGeneralTiers = useCallback(
    async (errorCallback, teamsGeneralTierId, setContent) => {
      try {
        const responseServer = await axios.get(
          `https://pokelandbackend-server.herokuapp.com/sub-teams-general-tiers/tiers/${teamsGeneralTierId}`,
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

  const addSubTeamsGeneralTier = useCallback(
    async (body, errorCallback, successCallback) => {
      try {
        const response = await axios.post(
          "https://pokelandbackend-server.herokuapp.com/sub-teams-general-tiers/add",
          body,
          {
            headers: { token: token },
          }
        );
        setSubTeamsGeneralTiers((prevSubTeamsGeneralTiers) => {
          return [response.data, ...prevSubTeamsGeneralTiers];
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Sous Tier Général a bien été enregistré.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message:
            "L'enregistrement du Sous Tier Général a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const updateSubTeamsGeneralTier = useCallback(
    async (body, id, errorCallback, successCallback) => {
      try {
        const response = await axios.put(
          `https://pokelandbackend-server.herokuapp.com/sub-teams-general-tiers/update/${id}`,
          body,
          {
            headers: { token: token },
          }
        );
        setSubTeamsGeneralTiers((prevSubTeamsGeneralTiers) => {
          const existingSubTeamsGeneralTiers = [...prevSubTeamsGeneralTiers];
          const existingSubTeamsGeneralTier = existingSubTeamsGeneralTiers.find(
            (subTeamsGeneralTier) =>
              subTeamsGeneralTier._id === response.data._id
          );
          existingSubTeamsGeneralTier.name = response.data.name;
          return existingSubTeamsGeneralTiers;
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Sous Tier Général a bien été modifié.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message: "Le Sous Tier Général n'a pas pu être modifié.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const deleteSubTeamsGeneralTier = useCallback(
    async (id, errorCallback, successCallback) => {
      try {
        await axios.delete(
          `https://pokelandbackend-server.herokuapp.com/sub-teams-general-tiers/delete/${id}`,
          {
            headers: { token: token },
          }
        );
        setSubTeamsGeneralTiers((prevSubTeamsGeneralTiers) => {
          return prevSubTeamsGeneralTiers.filter(
            (subTeamsGeneralTier) => subTeamsGeneralTier._id !== id
          );
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Sous Tier Général a bien été supprimé.",
          success: true,
        });
      } catch (error) {
        errorCallback({
          message:
            "La suppression du Sous Tier Général a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  return (
    <SubTeamsGeneralTiersContext.Provider
      value={{
        subTeamsGeneralTiers,
        setSubTeamsGeneralTiers,
        addSubTeamsGeneralTier,
        getSubTeamsGeneralTiers,
        updateSubTeamsGeneralTier,
        deleteSubTeamsGeneralTier,
        getSubGeneralTiers,
      }}
    >
      {children}
    </SubTeamsGeneralTiersContext.Provider>
  );
};

export { SubTeamsGeneralTiersContext, SubTeamsGeneralTiersProvider };
