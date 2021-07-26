import { useState, useContext } from "react";
import { TournamentsContext } from "../../Contexts/TournamentsContext";
import Title from "../../Input/Title";
import Button from "../../Button/Button";
import File from "../../Input/File";
import TextEditor from "../../Input/TextEditor";

function AddTournaments({ tournamentsCategory }) {
  const [title, setTitle] = useState({ value: "", error: true });
  const [description, setDescription] = useState({ value: "", error: true });
  const [file, setFile] = useState({ value: "", error: false });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { addTournament } = useContext(TournamentsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.error || description.error || file.error) {
      setError({ message: "L'un des champs est mal remplis.", error: true });
      setSuccess({ message: "", success: false });
    } else {
      const body = new FormData();
      body.append("title", title.value);
      body.append("description", description.value);
      body.append("categoryName", tournamentsCategory.name);
      body.append("categoryId", tournamentsCategory._id);
      body.append("picture", file.value);

      addTournament(body, setError, setSuccess);
    }
  };

  return (
    <div className={``}>
      <div className={`form_header`}>
        <h3>Ajoutez un Tournois</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <Title onBlur={setTitle} value="" disabled={false} label={true} />
        <File name="file" hidden={false} disabled={false} onChange={setFile}>
          Ajoutez une image :
        </File>
        <TextEditor onBlur={setDescription} value="" />
        <Button>Ajouter</Button>
      </form>
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
    </div>
  );
}

export default AddTournaments;
