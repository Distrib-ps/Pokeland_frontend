import { useState } from "react";
import Button from "../../Button/Button";
import parse from "html-react-parser";

function Tournament({ tournament }) {
  const [description, setDescription] = useState(false);

  const handleDescription = () => {
    setDescription(!description);
  };

  console.log(tournament);

  return (
    <div className={`tournament`}>
      <div className={`tournament_page_content`}>
        {tournament.picture && tournament.picture.includes("http") && (
          <img src={`${tournament.picture}`} alt="tournament" />
        )}
        {tournament.picture && !tournament.picture.includes("http") && (
          <img
            src={`https://pokelandbackend-server.herokuapp.com/static/${tournament.picture}`}
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
