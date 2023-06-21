import React, { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const PokemonId = () => {
  const [pokemon, setPokemon] = useState(null);

  const { pokemonName } = useParams();

  const percentProgresStat = (baseStat) => {
    const STAT_MAX = 255;
    return `${(baseStat * 100) / STAT_MAX}%`;
  };

  const formatTypesPokemon = (types = []) => {
    const nameTypes = types.map(
      (type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
    );
    return nameTypes;
  };

  const formatAbilitiesPokemon = (abilities = []) => {
    const nameAbilities = abilities.map(
      (ability) =>
        ability.ability.name.charAt(0).toUpperCase() +
        ability.ability.name.slice(1)
    );
    return nameAbilities;
  };
  
  const formatMovesPokemon = (moves = []) => {
    const nameMoves = moves.map(
      (move) =>
        move.move.name.charAt(0).toUpperCase() +
        move.move.name.slice(1)
    );
    return nameMoves;
  };

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`;
    axios
      .get(url)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <Header />
      <div className="px-3 py-5 pt-20 lg:pt-32 dark:bg-slate-950">
        <section className="border-[1px] border-gray-300 shadow-md shadow-gray-300 mb-7 md:w-[600px] lg:w-[800px] mx-auto bg-white">
          <div
            className={`type-${pokemon?.types[0].type.name} relative h-[75px] justify-center flex md:h-[125px] lg:h-[150px]`}
          >
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
              className="w-[150px] absolute bottom-0 md:w-[200px] lg:w-[250px]"
            />
          </div>
          <section className="pt-3 px-4 lg:px-16">
            <div
              className={`font-bold type-text-${pokemon?.types[0].type.name} flex justify-center pb-2`}
            >
              <h4 className="border-[1px] border-gray-200 p-1 xxs:text-xl md:text-2xl lg:text-3xl">
                #{pokemon?.id}
              </h4>
            </div>
            <div className="flex justify-between items-center">
              <span className="bg-gray-300 w-[30%] xxs:w-[35%] h-[.5px]"></span>
              <h3
                className={`type-text-${pokemon?.types[0].type.name} w-[40%] xxs:w-[30%] px-1 xxs:px-2 text-center font-bold xxs:text-xl md:text-2xl lg:text-3xl`}
              >
                {pokemon?.name.charAt(0).toUpperCase()}
                {pokemon?.name.slice(1)}
              </h3>
              <span className="bg-gray-300 w-[30%] xxs:w-[35%] h-[.5px]"></span>
            </div>
            <div className="flex justify-center gap-5 text-[9px] font-bold my-2 xxs:text-sm lg:text-lg">
              <div className="text-center">
                <h4>Weight</h4>
                <span>{pokemon?.weight}</span>
              </div>
              <div className="text-center">
                <h4>Height</h4>
                <span>{pokemon?.height}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 text-center gap-6 font-medium">
              <div className="flex flex-col gap-2 lg:gap-4 lg:text-lg">
                <h3 className="">Type</h3>
                <div className="flex gap-2 flex-col justify-center items-center lg:flex-row">
                  <div className="w-full bg-[#85C9C5] text-white text-[11px] py-2 xxs:text-sm">
                    {formatTypesPokemon(pokemon?.types)[0]}
                  </div>
                  <div className="w-full bg-[#6C3D9A] text-white text-[11px] py-2 xxs:text-sm">
                    {(formatTypesPokemon(pokemon?.types)[1]) ? formatTypesPokemon(pokemon?.types)[1] : "#"}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 lg:gap-4 lg:text-lg">
                <h3 className="font-medium">Abilities</h3>
                <div className="flex gap-2 flex-col justify-center items-center lg:flex-row">
                  <div className="w-full bg-gray-100 text-black text-[11px] py-2 xxs:text-sm border-[1px]">
                    {formatAbilitiesPokemon(pokemon?.abilities)[0]}
                  </div>
                  <div className="w-full bg-gray-100 text-black text-[11px] py-2 xxs:text-sm  border-[1px]">
                    {formatAbilitiesPokemon(pokemon?.abilities)[1]}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <article className="px-4 pb-5 lg:px-16 lg:pb-10">
            <section className="mt-6">
              <h4 className="flex justify-between items-center gap-5 font-medium xxs:text-lg lg:text-2xl">
                Stats <span className="w-[85%] bg-gray-300 h-[1px]"></span> <img src="/images/pokeball.svg" alt="" className="w-[75px] lg:w-[100px] hidden xxs:flex"/>
              </h4>
              <section className="flex flex-col gap-4 mt-4">
                {pokemon?.stats.map((stat) => (
                  <article key={stat.stat.url}>
                    <section className="flex justify-between items-center font-medium text-sm md:text-base lg:text-lg">
                      <h5>
                        {stat.stat.name.charAt(0).toUpperCase()}
                        {stat.stat.name.slice(1)}
                      </h5>
                      <span>{stat.base_stat}/255</span>
                    </section>
                    <div className="bg-gray-300 h-5 rounded-md md:h-7 lg:h-10">
                      <div
                        style={{ width: percentProgresStat(stat.base_stat) }}
                        className="h-full bg-yellow-500 rounded-md"
                      ></div>
                    </div>
                  </article>
                ))}
              </section>
            </section>
          </article>
        </section>

        <section className="border-[1px] border-gray-300 shadow-md shadow-gray-300 p-4 flex flex-col gap-2 md:w-[600px] lg:w-[800px] mx-auto lg:px-16 lg:pb-10 dark:bg-white">
          <h3 className="flex justify-between items-center gap-5 font-medium xxs:text-lg lg:text-2xl mb-4 xxs:mb-3 lg:mb-0">
          Movements <span className="w-[85%] bg-gray-300 h-[1px]"></span> <img src="/images/pokeball.svg" alt="" className="w-[75px] lg:w-[100px] hidden xxs:flex"/>
          </h3>
          <div className="flex flex-wrap gap-2">
          {
            formatMovesPokemon(pokemon?.moves).map((move) => (
              <div className="rounded-full bg-gray-200 p-2 px-3 text-sm text-black">
                {move}
              </div>
            ))
          }
          </div>
        </section>
      </div>
    </main>
  );
};

export default PokemonId;
