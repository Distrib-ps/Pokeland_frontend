import { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import Button from "../Button/Button";

export default function NavAdmin({ onClick }) {
  const { user } = useContext(UserContext);
  const handleTiers = () => {
    onClick("Tiers");
  };
  const handleTeams = () => {
    onClick("Teams");
  };
  const handleTournaments = () => {
    onClick("Tournaments");
  };
  const handleActus = () => {
    onClick("Towers");
  };
  const handleUsers = () => {
    onClick("Users");
  };

  return (
    <div className={`admin_navigation`}>
      {user && user.role === "Owner" && (
        <Button onClick={handleTiers}>Tiers</Button>
      )}
      {user && (user.role === "Owner" || user.role === "Rédacteur") && (
        <Button onClick={handleTeams}>Equipes</Button>
      )}
      {user && user.role === "Owner" && (
        <Button onClick={handleTournaments}>Tournois</Button>
      )}
      {user && user.role === "Owner" && (
        <Button onClick={handleActus}>Actualités</Button>
      )}
      {user && user.role === "Owner" && (
        <Button onClick={handleUsers}>Utilisateurs</Button>
      )}
    </div>
  );
}
