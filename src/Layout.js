import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useContext } from "react";
import { ThemeContext } from "./Contexts/ThemeContext";

function Layout() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`layout ${theme}`}>
      <Header />
      <div className={`app_content`}>
        <Sidebar />
        <Main />
      </div>
      <Footer />
    </div>
  );
}
export default Layout;
