import { useState, useContext } from "react";
import { TowersContext } from "../../Contexts/TowersContext";
import Title from "../../Input/Title";
import Button from "../../Button/Button";
import File from "../../Input/File";
import TextEditor from "../../Input/TextEditor";
import Link from "../../Input/Link";

function AddTower() {
  const [title, setTitle] = useState({ value: "", error: true });
  const [description, setDescription] = useState({ value: "", error: true });
  const [file, setFile] = useState({ value: "", error: false });
  const [link, setLink] = useState({ value: "", error: true });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { addTower, addTowerNoFile } = useContext(TowersContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (link.value) {
      if (title.error || description.error || link.error) {
        setError({ message: "L'un des champs est mal remplis.", error: true });
        setSuccess({ message: "", success: false });
      } else {
        const body = {
          title: title.value,
          description: description.value,
          picture: link.value,
        };

        addTowerNoFile(body, setError, setSuccess);
      }
    } else {
      if (title.error || description.error || file.error) {
        setError({ message: "L'un des champs est mal remplis.", error: true });
        setSuccess({ message: "", success: false });
      } else {
        const body = new FormData();
        body.append("title", title.value);
        body.append("description", description.value);
        body.append("picture", file.value);

        addTower(body, setError, setSuccess);
      }
    }
  };

  return (
    <div className={``}>
      <div className={`form_header`}>
        <h3>Ajoutez une Tour de combat</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <Title onBlur={setTitle} value="" disabled={false} label={true} />
        <File name="file" hidden={false} disabled={false} onChange={setFile}>
          Ajoutez une image :
        </File>
        <Link onBlur={setLink} value="" disabled={false} label={true} />
        <TextEditor onBlur={setDescription} value="" />
        <Button>Ajouter</Button>
      </form>
      {error.error && <p className={`form_error`}>{error.message}</p>}
      {success.success && <p>{success.message}</p>}
    </div>
  );
}

export default AddTower;
