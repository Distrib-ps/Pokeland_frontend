import { useState, useContext } from "react";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TowersContext } from "../../Contexts/TowersContext";
import TextEditor from "../../Input/TextEditor";
import File from "../../Input/File";
import Title from "../../Input/Title";
import Link from "../../Input/Link";

function TowerUpdatePopUp({ tower, closePopUp }) {
  const [title, setTitle] = useState({ value: tower.title, error: false });
  const [description, setDescription] = useState({
    value: tower.description,
    error: false,
  });
  const [file, setFile] = useState({ value: "", error: false });
  const [link, setLink] = useState({ value: "", error: false });
  const [error, setError] = useState({ message: "", error: false });
  const [success, setSuccess] = useState({ message: "", success: false });

  const { updateTower, updateTowerNoFile } = useContext(TowersContext);

  const handleSubmit = (e) => {
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

        updateTowerNoFile(body, tower._id, setError, setSuccess);
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

        updateTower(body, tower._id, setError, setSuccess);
      }
    }
  };

  return (
    <div className={`form_popup`}>
      <div className={`form_popup_content form_popup-light`}>
        <form onSubmit={handleSubmit}>
          <div className={`form_header`}>
            <h3>Modifiez la Tour de combat.</h3>
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
            <File
              name="file"
              hidden={false}
              disabled={false}
              onChange={setFile}
            >
              Ajoutez une image :
            </File>
            <Link onBlur={setLink} value="" disabled={false} label={true} />
            <TextEditor value={description.value} onBlur={setDescription} />
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

export default TowerUpdatePopUp;
