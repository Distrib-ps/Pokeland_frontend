import { useState } from "react";
import Button from "../Button/Button";
import parse from "html-react-parser";

function Tower({ tower, onDescription }) {
  const [description, setDescription] = useState(false);

  const handleDescription = () => {
    setDescription(!description);
    onDescription();
  };

  return (
    <div className={`tower tiwer-light`}>
      <div className={`tower_page_content`}>
        {tower.picture && (
          <img
            src={`https://pokelandbackend-server.herokuapp.com/static/${tower.picture}`}
            alt="tower"
          />
        )}
        <div>
          <h3 className={``}>{tower.title}</h3>
          <p className={``}>{tower.date}</p>
          <Button onClick={handleDescription}>Description</Button>
        </div>
      </div>
      {description && <div className={``}>{parse(tower.description)}</div>}
    </div>
  );
}

export default Tower;
