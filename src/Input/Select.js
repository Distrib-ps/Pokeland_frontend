import { useState, useEffect } from "react";

export default function Select({ optionsList, onChange }) {
  // STATE
  const [value, setValue] = useState("");

  useEffect(() => {
    if (optionsList.length !== 0) {
      setValue(optionsList[0]);
    }
  }, [setValue, optionsList, onChange]);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={`select_container select_container-light`}>
      <select value={value.value} onChange={handleChange}>
        {optionsList.length !== 0 &&
          optionsList.map((optionList, index) => (
            <option
              value={optionList.tierName ? optionList.tierAddress : optionList}
              key={index}
            >
              {optionList.tierName ? optionList.tierName : optionList}
            </option>
          ))}
      </select>
    </div>
  );
}
