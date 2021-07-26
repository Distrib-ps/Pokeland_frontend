import React, { useState } from "react";

// Crée un contexte pour le thème (avec “light” comme valeur par défaut).
const ThemeContext = React.createContext("light");

// Utilise un Provider pour passer le thème plus bas dans l’arbre. Nous passons “dark” comme valeur actuelle.
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const setThemeLocal = (theme) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  /**
   * Fonction qui regarde les préférences de thème
   */
  const keepTheme = () => {
    if (localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") === "dark") {
        setTheme("dark");
      } else if (localStorage.getItem("theme") === "light") {
        setTheme("light");
      }
    } else {
      setTheme("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeLocal, keepTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
