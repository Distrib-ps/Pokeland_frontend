import { useEffect, useState, useContext } from "react";
import Button from "../../Button/Button";
import { TeamsContext } from "../../Contexts/TeamsContext";

function Team({ team }) {
  const [content, setContent] = useState();
  const [description, setDescription] = useState(false);
  const [error, setError] = useState(false);

  const { getTeam } = useContext(TeamsContext);

  useEffect(() => {
    getTeam(setError, setContent, team.idPokepast);
  }, [team, getTeam]);

  const handleDescription = () => {
    setDescription(!description);
  };

  return (
    <div className={`team`}>
      {content && (
        <div className={`team_page_content`}>
          <div className={`team_page_content_pokemons`}>
            {content.imagesSrc.map((item, index) => {
              return (
                <div className={`team_page_content_pokemon`} key={index}>
                  <img src={item} alt={content.names[index]} />
                  <p>{content.names[index]}</p>
                </div>
              );
            })}
          </div>
          <div className={`team_page_admin`}>
            <a href={team.link} alt="vers pokepast">
              <img src="/pokeball.png" alt="pokeball" />
            </a>
            <Button onClick={handleDescription}>Description</Button>
            <p className={``}>{team.category}</p>
            <h5>{team.title}</h5>
            <p className={``}>{team.date}</p>
          </div>
        </div>
      )}
      {description && <p className={``}>{team.description}</p>}
      {error && <p>Le chargement des Equipes a échoué.</p>}
    </div>
  );
}

export default Team;
