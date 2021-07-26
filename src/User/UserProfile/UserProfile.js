import { useContext } from "react";
import "./UserProfile.css";
import UserUpdate from "../../Form/User/UserUpdate";
import { UserContext } from "../../Contexts/UserContext";
import Admin from "../../Admin/Admin";

function UserProfile() {
  const { user } = useContext(UserContext);
  return (
    <div className={`user_profile`}>
      {user ? (
        <UserUpdate user={user} />
      ) : (
        <p>Erreur lors du chargement de votre profil.</p>
      )}
      {user && (user.role === "Owner" || user.role === "Rédacteur") && (
        <Admin />
      )}
    </div>
  );
}

export default UserProfile;
