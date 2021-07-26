import { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const TiersContext = createContext();

const TiersProvider = ({ children }) => {
  const [tiers, setTiers] = useState([]);
  const [tier, setTier] = useState(null);

  const { token } = useContext(UserContext);

  const getTier = useCallback(async (errorCallback, usage) => {
    try {
      const response = await axios.get(
        `https://pokelandbackend.herokuapp.com/tiers/tier/${usage}`
      );
      setTier(response.data);
      errorCallback(false);
    } catch (err) {
      errorCallback(true);
    }
  }, []);

  const getTiers = useCallback(
    async (errorCallback) => {
      try {
        const responseServer = await axios.get(
          "https://pokelandbackend.herokuapp.com/tiers/tiers",
          {
            headers: { token: token },
          }
        );
        setTiers(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const addTier = useCallback(
    async (body, errorCallback, successCallback) => {
      try {
        const response = await axios.post(
          "https://pokelandbackend.herokuapp.com/tiers/add",
          body,
          {
            headers: { token: token },
          }
        );
        setTiers((prevTiers) => {
          return [response.data, ...prevTiers];
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Tier a bien été enregistré.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message: "L'enregistrement du Tier a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const updateTier = useCallback(
    async (body, id, errorCallback, successCallback) => {
      try {
        const response = await axios.put(
          `https://pokelandbackend.herokuapp.com/tiers/update/${id}`,
          body,
          {
            headers: { token: token },
          }
        );
        setTiers((prevTiers) => {
          const existingTiers = [...prevTiers];
          const existingTier = existingTiers.find(
            (tier) => tier._id === response.data._id
          );
          existingTier.date = response.data.date;
          existingTier.name = response.data.name;
          return existingTiers;
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Tier a bien été modifié.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message: "Le Tier n'a pas pu être modifié.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const deleteTier = useCallback(
    async (id, errorCallback, successCallback) => {
      try {
        await axios.delete(
          `https://pokelandbackend.herokuapp.com/tiers/delete/${id}`,
          {
            headers: { token: token },
          }
        );
        setTiers((prevTiers) => {
          return prevTiers.filter((tier) => tier._id !== id);
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Le Tier a bien été supprimé.",
          success: true,
        });
      } catch (error) {
        errorCallback({
          message: "La suppression du Tier a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  return (
    <TiersContext.Provider
      value={{
        tiers,
        setTiers,
        tier,
        setTier,
        getTier,
        addTier,
        getTiers,
        updateTier,
        deleteTier,
      }}
    >
      {children}
    </TiersContext.Provider>
  );
};

export { TiersContext, TiersProvider };
