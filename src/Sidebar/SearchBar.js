import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ onChange, value }) {
  return (
    <label className={`searchbar searchbar-light`}>
      <input
        type="search"
        id="site-search"
        name="search"
        aria-label="Search"
        placeholder="Rechercher"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <FontAwesomeIcon icon={faSearch} />
    </label>
  );
}

export default SearchBar;
