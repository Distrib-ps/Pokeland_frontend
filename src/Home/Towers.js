import { useEffect, useContext, useState } from "react";
import { TowersContext } from "../Contexts/TowersContext";
import Tower from "./Tower";

function Towers({ onDescription }) {
  const [error, setError] = useState(null);

  const { towers, getTowers } = useContext(TowersContext);

  useEffect(() => {
    getTowers(setError);
  }, [getTowers]);

  return (
    <div className={`home_page_tower`}>
      <h2>Tours de Combat</h2>
      {towers &&
        towers.length !== 0 &&
        towers.map((tower) => {
          return (
            <Tower
              tower={tower}
              key={tower._id}
              onDescription={onDescription}
            />
          );
        })}
      {error && <p>Le chargement des Tours de combat a échoué.</p>}
    </div>
  );
}

export default Towers;
