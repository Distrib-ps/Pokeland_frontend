import "./Button.css";

function Button({ children, onClick }) {
  return (
    <div>
      <button className={`button button-light`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default Button;
