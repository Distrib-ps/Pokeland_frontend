import "./Main.css";
import UserProfile from "../User/UserProfile/UserProfile";
import { Switch, Route } from "react-router-dom";
import TeamPage from "../Team/TeamPage.js/TeamPage";
import TournamentPage from "../Tournament/TournamentPage/TournamentPage";
import HomePage from "../Home/HomePage";
import ForumPage from "../Forum/ForumPage";

function Main() {
  return (
    <main className={`main main-light`}>
      <Switch>
        <Route path="/teams/:id">
          <TeamPage />
        </Route>
        <Route path="/tournaments/:id">
          <TournamentPage />
        </Route>
        <Route path="/forum">
          <ForumPage />
        </Route>
        <Route path="/profile">
          <UserProfile />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </main>
  );
}

export default Main;
