import { createContext, useState, useContext, useCallback } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const TeamsContext = createContext();

const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);

  const { token } = useContext(UserContext);

  const getTeams = useCallback(
    async (errorCallback, teamsCategoryId) => {
      try {
        const responseServer = await axios.get(
          `https://pokelandbackend.herokuapp.com/teams/teams/${teamsCategoryId}`,
          {
            headers: { token: token },
          }
        );
        setTeams(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const getTeamsPage = useCallback(
    async (errorCallback, teamsCategoryId, setContent) => {
      try {
        const responseServer = await axios.get(
          `https://pokelandbackend.herokuapp.com/teams/teams/${teamsCategoryId}`,
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

  const getAllTeams = useCallback(
    async (errorCallback) => {
      try {
        const responseServer = await axios.get(
          "https://pokelandbackend.herokuapp.com/teams/all",
          {
            headers: { token: token },
          }
        );
        setTeams(responseServer.data);
        errorCallback(false);
      } catch (err) {
        errorCallback(true);
      }
    },
    [token]
  );

  const getTeam = useCallback(async (errorCallback, setContent, idPokepast) => {
    try {
      const responseServer = await axios.get(
        `https://pokelandbackend.herokuapp.com/teams/team/${idPokepast}`
      );

      const imagesSrc = responseServer.data.content.images.map((image) => {
        const src = image.split(/"/gm);
        return "https://pokepast.es" + src[3];
      });

      const names = responseServer.data.content.names.map((name) => {
        let pokeName, pokeNameFinal;
        if (name.includes("gender")) {
          pokeName = name.split(/<pre><span class="type-[a-z]+">/);
          pokeNameFinal = pokeName[1].split(/<\/span>/);
        } else {
          pokeName = name.split(/<pre><span class="type.+">/);
          pokeNameFinal = pokeName[1].split(/<\/span>/);
        }

        return pokeNameFinal[0];
      });

      setContent({ imagesSrc, names });
      errorCallback(false);
    } catch (err) {
      errorCallback(true);
    }
  }, []);

  const addTeam = useCallback(
    async (body, errorCallback, successCallback) => {
      try {
        const response = await axios.post(
          "https://pokelandbackend.herokuapp.com/teams/add",
          body,
          {
            headers: { token: token },
          }
        );
        setTeams((prevTeams) => {
          return [response.data, ...prevTeams];
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "L'Equipe a bien été enregistré.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message:
            "L'enregistrement de l'équipe a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const updateTeam = useCallback(
    async (body, id, errorCallback, successCallback) => {
      try {
        const response = await axios.put(
          `https://pokelandbackend.herokuapp.com/teams/update/${id}`,
          body,
          {
            headers: { token: token },
          }
        );
        setTeams((prevTeams) => {
          const existingTeams = [...prevTeams];
          const existingTeam = existingTeams.find(
            (team) => team._id === response.data._id
          );
          existingTeam.title = response.data.title;
          existingTeam.link = response.data.link;
          existingTeam.categoryName = response.data.categoryName;
          existingTeam.categoryId = response.data.categoryId;
          existingTeam.description = response.data.description;
          existingTeam.idPokepast = response.data.idPokepast;
          return existingTeams;
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "L'Equipe a bien été modifié.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message: "L'Equipe n'a pas pu être modifié.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const deleteTeam = useCallback(
    async (id, errorCallback, successCallback) => {
      try {
        await axios.delete(
          `https://pokelandbackend.herokuapp.com/teams/delete/${id}`,
          {
            headers: { token: token },
          }
        );
        setTeams((prevTeams) => {
          return prevTeams.filter((teams) => teams._id !== id);
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "L'Equipe a bien été supprimé.",
          success: true,
        });
      } catch (error) {
        errorCallback({
          message: "La suppression de l'Equipe a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  return (
    <TeamsContext.Provider
      value={{
        teams,
        setTeams,
        addTeam,
        getTeams,
        updateTeam,
        deleteTeam,
        getAllTeams,
        getTeam,
        getTeamsPage,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};

export { TeamsContext, TeamsProvider };
