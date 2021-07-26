import { UserProvider } from "./Contexts/UserContext";
import { TiersProvider } from "./Contexts/TiersContext";
import { TeamsGeneralTiersProvider } from "./Contexts/TeamsGeneralTiersContext";
import { SubTeamsGeneralTiersProvider } from "./Contexts/SubTeamsGeneralTiersContext";
import { TeamsCategoriesProvider } from "./Contexts/TeamsCategoriesContext";
import { TeamsProvider } from "./Contexts/TeamsContext";
import { TournamentsCategoriesProvider } from "./Contexts/TournamentsCategoriesContext";
import { TournamentsProvider } from "./Contexts/TournamentsContext";
import { TowersProvider } from "./Contexts/TowersContext";
import { ForumCategoriesProvider } from "./Contexts/ForumCategoriesContext";
import { ForumTopicsProvider } from "./Contexts/ForumTopicsContext";
import { ForumPostsProvider } from "./Contexts/ForumPostsContext";
import { ThemeProvider } from "./Contexts/ThemeContext";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <UserProvider>
        <TiersProvider>
          <TeamsGeneralTiersProvider>
            <SubTeamsGeneralTiersProvider>
              <TeamsCategoriesProvider>
                <TeamsProvider>
                  <TournamentsCategoriesProvider>
                    <TournamentsProvider>
                      <TowersProvider>
                        <ForumCategoriesProvider>
                          <ForumTopicsProvider>
                            <ForumPostsProvider>
                              <ThemeProvider>
                                <div className="app">
                                  <Layout />
                                </div>
                              </ThemeProvider>
                            </ForumPostsProvider>
                          </ForumTopicsProvider>
                        </ForumCategoriesProvider>
                      </TowersProvider>
                    </TournamentsProvider>
                  </TournamentsCategoriesProvider>
                </TeamsProvider>
              </TeamsCategoriesProvider>
            </SubTeamsGeneralTiersProvider>
          </TeamsGeneralTiersProvider>
        </TiersProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
