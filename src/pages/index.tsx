import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { getOptionsForVote } from "utils/getRandomPokemon";
import { trpc } from "utils/trpc";

const buttonClasses =
  "w-70 items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());

  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const voteForRoundest = (selected: number) => {
    // todo: fire mutation to persist changes

    updateIds(getOptionsForVote());
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is Rounder?</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center capitalize">
        <div className="w-64 h-64 flex flex-col">
          {firstPokemon.data && (
            <Image
              src={firstPokemon.data?.sprites.front_default!}
              alt={firstPokemon.data?.name}
              layout="responsive"
              width={64}
              height={64}
              className="w-full"
            />
          )}
          <div className="text-center mt-[-2rem]">
            {firstPokemon.data?.name}
          </div>
          <button
            className={buttonClasses}
            onClick={() => voteForRoundest(first)}
          >
            Rounder
          </button>
        </div>
        <div className="p-8">VS</div>
        <div className="w-64 h-64 flex flex-col">
          {secondPokemon.data && (
            <Image
              src={secondPokemon.data?.sprites.front_default!}
              alt={secondPokemon.data?.name}
              layout="responsive"
              width={64}
              height={64}
              className="w-full"
            />
          )}

          <div className="text-center mt-[-2rem]">
            {secondPokemon.data?.name}
          </div>
          <button
            className={buttonClasses}
            onClick={() => voteForRoundest(second)}
          >
            Rounder
          </button>
        </div>
        <div className="p-2" />
      </div>
    </div>
  );
};

export default Home;
