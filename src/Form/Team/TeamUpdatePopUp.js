import { useState, useContext } from "react";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TeamsContext } from "../../Contexts/TeamsContext";
import IdPokepast from "../../Input/IdPokepast";
import TextArea from "../../Input/TextArea";
import Title from "../../Input/Title";
import Link from "../../Input/Link";

function TeamUpdatePopUp({ team, closePopUp }) {
  const [title, setTitle] = useState({ value: team.title, error: false });
  const [link, setLink] = useState({ value: team.link, error: false });
  const [description, setDescription] = useState({
    value: team.description,
    error: false,
  });
  const [idPokepast, setIdPokepast] = useState({
    value: team.idPokepast,
    error: false,
  });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { updateTeam } = useContext(TeamsContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.error || link.error || description.error || idPokepast.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = {
        title: title.value,
        link: link.value,
        categoryName: team.categoryName,
        categoryId: team.categoryId,
        description: description.value,
        idPokepast: idPokepast.value,
      };

      updateTeam(body, team._id, setError, setSuccess);
    }
  };

  console.log(team);

  return (
    <div className={`form_popup`}>
      <div className={`form_popup_content form_popup-light`}>
        <form onSubmit={handleSubmit}>
          <div className={`form_header`}>
            <h3>Modifiez l'Equipe.</h3>
            <Button onClick={closePopUp}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </div>
          <div>
            <Title
              onBlur={setTitle}
              value={title.value}
              disabled={false}
              label={true}
            />
            <Link
              onBlur={setLink}
              value={link.value}
              disabled={false}
              label={true}
            />
            <TextArea
              onBlur={setDescription}
              value={description.value}
              disabled={false}
              label="Entrez un description"
              labelInput={true}
            />
            <IdPokepast
              onBlur={setIdPokepast}
              value={idPokepast.value}
              disabled={false}
              label={true}
            />
          </div>
          <Button
            onClick={() => {
              return;
            }}
          >
            Modifier
          </Button>
        </form>
        {error.error && <p className={``}>{error.message}</p>}
        {success.success && <p>{success.message}</p>}
      </div>
    </div>
  );
}

export default TeamUpdatePopUp;
