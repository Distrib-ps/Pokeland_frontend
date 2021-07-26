import { useState, useContext } from "react";
import { TeamsContext } from "../../Contexts/TeamsContext";
import IdPokepast from "../../Input/IdPokepast";
import TextArea from "../../Input/TextArea";
import Title from "../../Input/Title";
import Link from "../../Input/Link";
import Button from "../../Button/Button";

function AddTeams({ teamsCategory }) {
  const [title, setTitle] = useState({ value: "", error: true });
  const [link, setLink] = useState({ value: "", error: true });
  const [description, setDescription] = useState({ value: "", error: true });
  const [idPokepast, setIdPokepast] = useState({ value: "", error: true });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { addTeam } = useContext(TeamsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.error || link.error || description.error || idPokepast.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = {
        title: title.value,
        link: link.value,
        categoryName: teamsCategory.name,
        categoryId: teamsCategory._id,
        description: description.value,
        idPokepast: idPokepast.value,
      };

      addTeam(body, setError, setSuccess);
    }
  };

  return (
    <div className={``}>
      <div className={`form_header`}>
        <h3>Ajoutez une Equipe</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <Title onBlur={setTitle} value="" disabled={false} label={true} />
        <Link onBlur={setLink} value="" disabled={false} label={true} />
        <TextArea
          onBlur={setDescription}
          value=""
          disabled={false}
          label="Entrez un description"
          labelInput={true}
        />
        <IdPokepast
          onBlur={setIdPokepast}
          value=""
          disabled={false}
          label={true}
        />
        <Button>Ajouter</Button>
      </form>
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
    </div>
  );
}

export default AddTeams;
