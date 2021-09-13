function Tier({ item }) {
  const pourcent = item[2].replace("%", " ");
  const pourcentNumber = parseFloat(pourcent);

  return (
    <li className={`tier_item tier_item-light`}>
      <img
        src={`https://img.pokemondb.net/sprites/home/normal/${item[1]
          .toLowerCase()
          .trim()}.png`}
        alt={`${item[1]}`}
      />
      <p>{item[1]}</p>
      <p>{Math.round(pourcentNumber * 10) / 10} %</p>
    </li>
  );
}

export default Tier;
