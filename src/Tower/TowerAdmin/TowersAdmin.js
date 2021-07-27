import { useEffect, useContext, useState } from "react";
import Button from "../../Button/Button";
import { TowersContext } from "../../Contexts/TowersContext";
import AddTower from "../../Form/Tower/AddTower";
import Tower from "./Tower";
import "./TowerAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function TowersAdmin() {
  const [error, setError] = useState(null);
  const [form, setForm] = useState(false);

  const { towers, getTowers } = useContext(TowersContext);

  useEffect(() => {
    getTowers(setError);
  }, [getTowers]);

  return (
    <div className={`tower_admin`}>
      {!form && (
        <div className={`tower_admin_header`}>
          <h3>Ajouter une Actualité</h3>
          <Button
            onClick={() => {
              setForm(!form);
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      )}
      {form && (
        <div className={`tower_admin_header`}>
          <h3>Retour</h3>
          <Button
            onClick={() => {
              setForm(!form);
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </Button>
        </div>
      )}
      {form && <AddTower />}
      {error && <p>Le chargement de la liste des Actualités a échoué.</p>}
      {towers &&
        towers.length !== 0 &&
        towers.map((tower) => {
          return <Tower tower={tower} key={tower._id} />;
        })}
    </div>
  );
}

export default TowersAdmin;
