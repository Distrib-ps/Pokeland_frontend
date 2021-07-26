import "./Button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

function GoogleButton({ children, onClick, disabled }) {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`button button-light`}
      >
        <FontAwesomeIcon icon={faGoogle} />
        <span className="button_text">{children}</span>
      </button>
    </div>
  );
}

export default GoogleButton;
