import React from "react";

const Pokemon = (props) => {
  const pokemonID = props.match.params.pokemonID;
  return <div>{`Ini Pokemon nomor #${pokemonID}`}</div>;
};

export default Pokemon;
