import { useState } from "react";
import Button from "../../Button/Button";
import parse from "html-react-parser";

function Tournament({ tournament }) {
  const [description, setDescription] = useState(false);

  const handleDescription = () => {
    setDescription(!description);
  };

  return (
    <div className={`tournament`}>
      <div className={`tournament_page_content`}>
        {tournament.picture && (
          <img
            src={`http://localhost:8000/static/${tournament.picture}`}
            alt="tournament"
          />
        )}
        <div>
          <h3 className={``}>{tournament.title}</h3>
          <p className={``}>{tournament.date}</p>
          <Button onClick={handleDescription}>Description</Button>
        </div>
      </div>
      {description && <div className={``}>{parse(tournament.description)}</div>}
    </div>
  );
}

export default Tournament;
