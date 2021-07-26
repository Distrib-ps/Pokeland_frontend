import { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const TowersContext = createContext();

const TowersProvider = ({ children }) => {
  const [towers, setTowers] = useState([]);

  const { token } = useContext(UserContext);

  const getTowers = useCallback(
    async (errorCallback) => {
      try {
        const responseServer = await axios.get(
          `https://pokelandbackend.herokuapp.com/towers/towers`,
          {
            headers: { token: token },
          }
        );
        setTowers(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const addTower = useCallback(
    async (body, errorCallback, successCallback) => {
      try {
        const response = await axios.post(
          "https://pokelandbackend.herokuapp.com/towers/add",
          body,
          {
            headers: { token: token },
          }
        );
        setTowers((prevTowers) => {
          return [response.data, ...prevTowers];
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "La Tour de combat a bien été enregistré.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message:
            "L'enregistrement de la Tour de combat a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const updateTower = useCallback(
    async (body, id, errorCallback, successCallback) => {
      try {
        const response = await axios.put(
          `https://pokelandbackend.herokuapp.com/towers/update/${id}`,
          body,
          {
            headers: { token: token },
          }
        );
        setTowers((prevTowers) => {
          const existingTowers = [...prevTowers];
          const existingTower = existingTowers.find(
            (tower) => tower._id === response.data._id
          );
          existingTower.title = response.data.title;
          existingTower.description = response.data.description;
          existingTower.picture = response.data.picture;
          return existingTowers;
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "La Tour de combat a bien été modifié.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message: "La Tour de combat n'a pas pu être modifié.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const deleteTower = useCallback(
    async (id, errorCallback, successCallback) => {
      try {
        await axios.delete(
          `https://pokelandbackend.herokuapp.com/towers/delete/${id}`,
          {
            headers: { token: token },
          }
        );
        setTowers((prevTowers) => {
          return prevTowers.filter((tower) => tower._id !== id);
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "La Tour de combat a bien été supprimé.",
          success: true,
        });
      } catch (error) {
        errorCallback({
          message:
            "La suppression de la Tour de combat a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  return (
    <TowersContext.Provider
      value={{
        towers,
        setTowers,
        addTower,
        getTowers,
        updateTower,
        deleteTower,
      }}
    >
      {children}
    </TowersContext.Provider>
  );
};

export { TowersContext, TowersProvider };
