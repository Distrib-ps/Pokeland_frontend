import { useContext, useState, useEffect } from "react";
import "./Header.css";
import Button from "../Button/Button";
import { UserContext } from "../Contexts/UserContext";
import UserHearder from "../User/UserHeader/UserHeader";
import HeaderPopUp from "./HeaderPopUp";
import HeaderNavigation from "./HeaderNavigation";

function Header() {
  const [popup, setPopup] = useState(null);
  const [signin, setSignin] = useState(null);
  const [signup, setSignup] = useState(null);
  const [error, setError] = useState(null);
  const { user, getUser } = useContext(UserContext);

  const handleSignin = () => {
    setPopup(true);
    setSignin(true);
    setSignup(false);
  };

  const handleSignup = () => {
    setPopup(true);
    setSignup(true);
    setSignin(false);
  };

  const handleClosePopUp = () => {
    setPopup(null);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      getUser(token, setError);
    }
  }, [getUser]);

  return (
    <header className={`header`}>
      <img src="/logo.png" alt="logo" className={`header_logo`} />
      <HeaderNavigation />
      {!user && (
        <div className={`header_auth`}>
          <Button onClick={handleSignin}>Connexion</Button>
          <Button onClick={handleSignup}>Inscription</Button>
        </div>
      )}
      {user && <UserHearder error={error} />}
      {popup && (
        <HeaderPopUp
          signin={signin}
          signup={signup}
          closePopUp={handleClosePopUp}
        />
      )}
    </header>
  );
}

export default Header;
