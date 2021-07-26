import { useContext, useState, useEffect } from "react";
import Select from "../Input/Select";
import "./Sidebar.css";
import { TiersContext } from "../Contexts/TiersContext";
import Tier from "./Tier";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";

let optionsList = ["2021-04/gen8uu-1760"];

function Sidebar() {
  const { getTier, tier, getTiers, tiers } = useContext(TiersContext);
  const [usage, setUsage] = useState(null);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchItems, setSearchItems] = useState(null);
  const [extend, setExtend] = useState(false);

  useEffect(() => {
    if (usage) {
      getTier(setError, usage);
    }

    if (!usage) {
      getTier(setError, optionsList[0]);
    }

    getTiers(setError);
  }, [getTier, usage, getTiers]);

  const handleSearchInput = (value) => {
    setSearchValue(value);
    const itemsValues = [...tier];

    function filtreTexte(arr, requete) {
      return arr.filter(function (el) {
        return el[1].toLowerCase().indexOf(requete.toLowerCase()) !== -1;
      });
    }

    const restItems = filtreTexte(itemsValues, value);
    setSearchItems(restItems);
  };

  if (tiers.length !== 0) {
    optionsList = tiers.map((tier) => {
      return tier.date + "/" + tier.name;
    });
  }

  return (
    <aside
      className={`sidebar sidebar-light ${extend ? "sidebar-extend" : ""}`}
    >
      <div className={`sidebar_header`}>
        <h2>Tiers Stratégiques</h2>
        <span className={`sidebar_button`}>
          <Button onClick={() => setExtend(!extend)}>
            <FontAwesomeIcon icon={extend ? faMinus : faPlus} />
          </Button>
        </span>
      </div>
      <Select optionsList={optionsList} onChange={setUsage} />
      <SearchBar onChange={handleSearchInput} value={searchValue} />
      <ul className={`tier`}>
        {tier &&
          !searchItems &&
          tier.map((item, index) => {
            return <Tier item={item} key={index} />;
          })}
        {tier &&
          searchItems &&
          searchItems.map((item, index) => {
            return <Tier item={item} key={index} />;
          })}
      </ul>
      {error && <p>Erreur lors du chargement du tier.</p>}
    </aside>
  );
}

export default Sidebar;
