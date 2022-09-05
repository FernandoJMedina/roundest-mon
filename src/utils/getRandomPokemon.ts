import { useEffect, useState } from "react";

const MAX_DEX_ID = 493;

export const getRandomPokemon: (notThisOne?: number) => number = (
  notThisOne
) => {
  const pokedexNumber = Math.floor(Math.random() * MAX_DEX_ID) + 1;

  if (pokedexNumber !== notThisOne) return pokedexNumber;
  return getRandomPokemon(notThisOne);
};

export const useGetOptionsForVote = () => {
  const [firstId, setFirst] = useState<number>();

  const [secondId, setSecond] = useState<number>();

  useEffect(() => {
    setFirst(getRandomPokemon());
  }, []);

  useEffect(() => {
    setSecond(getRandomPokemon(firstId));
  }, [firstId]);

  return [firstId, secondId];
};
