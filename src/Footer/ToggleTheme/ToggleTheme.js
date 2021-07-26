import { useState, useContext, useEffect } from "react";

// STYLES
import "./ToggleTheme.css";

// UTILS
import { ThemeContext } from "../../Contexts/ThemeContext";

export default function ToggleTheme() {
  const [checked, setChecked] = useState(false);
  const { theme, setThemeLocal } = useContext(ThemeContext);

  useEffect(() => {
    theme === "light" ? setChecked(true) : setChecked(false);
  }, [theme]);

  /**
   * Change app theme and toggle button class
   */
  const handleChange = () => {
    setChecked(!checked);

    if (theme === "dark") {
      setThemeLocal("light");
    } else {
      setThemeLocal("dark");
    }
  };

  return (
    <div className="toggle-theme">
      <input
        type="checkbox"
        id="toggle-theme"
        name="toggle-theme"
        value="checked"
        checked={checked}
        onChange={handleChange}
        className="toggle_checkbox"
      />
      <label htmlFor="toggle-theme" className="toggle_label">
        <span></span>
      </label>
    </div>
  );
}
