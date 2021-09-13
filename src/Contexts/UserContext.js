import { useState, createContext, useCallback } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }, []);

  const getUserById = useCallback(async (errorCallback, userId, setAuthor) => {
    try {
      const response = await axios.get(
        `https://pokelandbackend-server.herokuapp.com/user/user/${userId}`,
        {}
      );
      setAuthor(response.data);
      errorCallback(false);
    } catch (err) {
      errorCallback(true);
    }
  }, []);

  const getUser = useCallback(async (token, errorCallback) => {
    try {
      const response = await axios.get(
        "https://pokelandbackend-server.herokuapp.com/user/profile",
        {
          headers: { token: token },
        }
      );
      setUser(response.data);
      errorCallback(false);
    } catch (err) {
      errorCallback(true);
    }
  }, []);

  const getUsers = useCallback(async (token, errorCallback) => {
    try {
      const response = await axios.get(
        "https://pokelandbackend-server.herokuapp.com/user/all",
        {
          headers: { token: token },
        }
      );
      setUsers(response.data);
      errorCallback(false);
    } catch (err) {
      errorCallback(true);
    }
  }, []);

  const signinUser = useCallback(
    async (body, errorCallback, successCallback) => {
      try {
        const response = await axios.post(
          "https://pokelandbackend-server.herokuapp.com/user/signin/form",
          body
        );
        const token = response.data.token;
        setUser(response.data.user);
        setToken(token);
        localStorage.setItem("token", token);

        errorCallback({ message: "", error: false });
        successCallback({
          message: "Vous êtes connecté.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message:
            "La connexion à votre compte a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    []
  );

  const updateUserNoFile = useCallback(
    async (body, id, errorCallback, successCallback) => {
      try {
        const response = await axios.put(
          `https://pokelandbackend-server.herokuapp.com/user/update/${id}`,
          body
        );
        setUser(response.data);
        if (users.length !== 0) {
          setUsers((prevUsers) => {
            const existingUsers = [...prevUsers];
            const existingUser = existingUsers.find(
              (user) => user._id === response.data._id
            );
            existingUser.pseudo = response.data.pseudo;
            existingUser.email = response.data.email;
            existingUser.password = response.data.password;
            existingUser.profilePicture = response.data.profilePicture;
            return existingUsers;
          });
        }
        errorCallback({ message: "", error: false });
        successCallback({
          message: "L'utilisateur a bien été modifié.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message: "Votre profil n'a pas pu être modifié.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [users]
  );

  const updateUser = useCallback(
    async (token, body, id, errorCallback, successCallback) => {
      try {
        const response = await axios.put(
          `https://pokelandbackend-server.herokuapp.com/user/update/${id}`,
          body,
          {
            headers: { token: token },
          }
        );
        setUser(response.data);
        setUsers((prevUsers) => {
          const existingUsers = [...prevUsers];
          const existingUser = existingUsers.find(
            (user) => user._id === response.data._id
          );
          existingUser.pseudo = response.data.pseudo;
          existingUser.email = response.data.email;
          existingUser.password = response.data.password;
          existingUser.profilePicture = response.data.profilePicture;
          return existingUsers;
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "L'utilisateur a bien été modifié.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message: "Votre profil n'a pas pu être modifié.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    []
  );

  const updateUserAdmin = useCallback(
    async (token, body, id, errorCallback, successCallback) => {
      try {
        const response = await axios.put(
          `https://pokelandbackend-server.herokuapp.com/user/update/${id}`,
          body,
          {
            headers: { token: token },
          }
        );
        setUsers((prevUsers) => {
          const existingUsers = [...prevUsers];
          const existingUser = existingUsers.find(
            (user) => user._id === response.data._id
          );
          existingUser.pseudo = response.data.pseudo;
          existingUser.email = response.data.email;
          existingUser.password = response.data.password;
          existingUser.profilePicture = response.data.profilePicture;
          return existingUsers;
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "L'utilisateur a bien été modifié.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message: "Votre profil n'a pas pu être modifié.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    []
  );

  const signupUser = async (body, errorCallback, successCallback) => {
    try {
      const response = await axios.post(
        "https://pokelandbackend-server.herokuapp.com/user/signup/form",
        body
      );
      const token = response.data.token;
      setUser(response.data.userSet);
      setToken(token);
      localStorage.setItem("token", token);

      errorCallback({ message: "", error: false });
      successCallback({
        message: "L'utilisateur a bien été enregistré.",
        success: true,
      });
    } catch (err) {
      errorCallback({
        message:
          "L'enregistrement de votre compte a échoué, veuillez recommencer.",
        error: true,
      });
      successCallback({ message: "", success: false });
    }
  };

  const deleteUser = useCallback(
    async (id, errorCallback, successCallback) => {
      try {
        await axios.delete(
          `https://pokelandbackend-server.herokuapp.com/user/delete/${id}`,
          {
            headers: { token: token },
          }
        );
        setUser(null);
        setToken(null);
        setUsers((prevUsers) => {
          return prevUsers.filter((user) => user._id !== id);
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Votre profil a bien été supprimer.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message:
            "La suppression de votre compte a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  const deleteUserList = useCallback(
    async (id, errorCallback, successCallback) => {
      try {
        await axios.delete(
          `https://pokelandbackend-server.herokuapp.com/user/delete-list/${id}`,
          {
            headers: { token: token },
          }
        );
        setUsers((prevUsers) => {
          return prevUsers.filter((user) => user._id !== id);
        });
        errorCallback({ message: "", error: false });
        successCallback({
          message: "Votre profil a bien été supprimer.",
          success: true,
        });
      } catch (err) {
        errorCallback({
          message:
            "La suppression de votre compte a échoué, veuillez recommencer.",
          error: true,
        });
        successCallback({ message: "", success: false });
      }
    },
    [token]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        logout,
        getUser,
        updateUser,
        signinUser,
        signupUser,
        deleteUser,
        getUsers,
        users,
        deleteUserList,
        updateUserAdmin,
        getUserById,
        updateUserNoFile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
