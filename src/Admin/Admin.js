import { useState } from "react";
import "./Admin.css";
import UserAdmin from "../User/UserAdmin/UserAdmin";
import NavAdmin from "./NavAdmin";
import TierAdmin from "../Tier/TierAdmin/TierAdmin";
import TeamsAdmin from "../Team/TeamAdmin/TeamsAdmin";
import TournamentsAdmin from "../Tournament/TournamentAdmin/TournamentsAdmin";
import TowersAdmin from "../Tower/TowerAdmin/TowersAdmin";

function Admin() {
  const [content, setContent] = useState("Tiers");
  let contentAdmin;

  switch (content) {
    case "Tiers":
      contentAdmin = <TierAdmin />;
      break;
    case "Teams":
      contentAdmin = <TeamsAdmin />;
      break;
    case "Tournaments":
      contentAdmin = <TournamentsAdmin />;
      break;
    case "Towers":
      contentAdmin = <TowersAdmin />;
      break;
    case "Users":
      contentAdmin = <UserAdmin />;
      break;
    default:
      contentAdmin = "";
  }

  return (
    <div className={`admin`}>
      <NavAdmin onClick={setContent} />
      {contentAdmin}
    </div>
  );
}

export default Admin;
