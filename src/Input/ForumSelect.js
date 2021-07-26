import { useState, useEffect } from "react";

export default function ForumSelect({ optionsList, onChange }) {
  // STATE
  const [value, setValue] = useState({ name: "", id: "" });

  useEffect(() => {
    if (optionsList.length !== 0) {
      setValue({ name: optionsList[0].name, id: optionsList[0]._id });
      onChange({ name: optionsList[0].name, id: optionsList[0]._id });
    }
  }, [setValue, optionsList, onChange]);

  const handleChange = (e) => {
    setValue({ name: e.target.value, id: e.target.key });
    onChange({ name: e.target.value, id: e.target.key });
  };

  return (
    <div className={`select_container select_container-light`}>
      <select value={value.value} onChange={handleChange}>
        {optionsList.length !== 0 &&
          optionsList.map((optionList) => (
            <option value={optionList.name} key={optionsList._id}>
              {optionList.name}
            </option>
          ))}
      </select>
    </div>
  );
}
