import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faYoutube,
  faTwitch,
  //faTwitter,
} from "@fortawesome/free-brands-svg-icons";

// STYLES
import "./Links.css";

export default function Links() {
  return (
    <ul className="footer_links">
      <li className="footer_link">
        <a href="https://play.pokemonshowdown.com/pokeland">
          <FontAwesomeIcon icon={faLink} />
        </a>
      </li>
      <li className="footer_link">
        <a href="https://discord.gg/zqnfPXrrJV">
          <FontAwesomeIcon icon={faDiscord} />
        </a>
      </li>
      <li className="footer_link">
        <a href="https://www.youtube.com/channel/UCcoFJANjdm4u8ibMHEo94Fw">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </li>
      <li className="footer_link">
        <a href="https://twitch.tv/pokelandtv">
          <FontAwesomeIcon icon={faTwitch} />
        </a>
      </li>
      {/*<li className="footer_link">
        <a href="#">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </li>*/}
    </ul>
  );
}
