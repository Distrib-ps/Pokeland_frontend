import { useEffect, useContext, useState } from "react";
import "./UserAdmin.css";
import { UserContext } from "../../Contexts/UserContext";
import User from "./User";

function UserAdmin() {
  const [error, setError] = useState(null);
  const { token, getUsers, users } = useContext(UserContext);

  useEffect(() => {
    getUsers(token, setError);
  }, [getUsers, token]);

  return (
    <div className={`user_admin`}>
      {users &&
        users.map((user) => {
          return <User userItem={user} key={user._id} />;
        })}
      {error && <p>Le chargement de la liste des utilisateurs a échoué.</p>}
    </div>
  );
}

export default UserAdmin;
