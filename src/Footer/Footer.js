// STYLES
import "./Footer.css";

// COMPOENENTS
import Links from "./Links/Links";
import ToggleTheme from "./ToggleTheme/ToggleTheme";

export default function Footer() {
  return (
    <footer className="component_container footer">
      <ToggleTheme />
      <Links />
    </footer>
  );
}
