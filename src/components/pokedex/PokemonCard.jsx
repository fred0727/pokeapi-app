import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PokemonCard.css";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState(null);

  const formatTypesPokemon = (types = []) => {
    const nameTypes = types.map(
      (type) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)
    );
    const tittleTypes = nameTypes.join(" / ");
    return tittleTypes;
  };

  formatTypesPokemon(pokemon?.types);

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then(({ data }) => setPokemon(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link to={`/pokedex/${pokemon?.name}`}>
    <article className={`flex flex-col rounded-lg relative type-border-${pokemon?.types[0].type.name} cursor-pointer shadow-md hover:shadow-gray-400 hover:-translate-y-1 ease-in duration-300 bg-white dark:shadow-black dark:shadow-md`}>
      <div className="flex flex-col text-center items-center">
        <div className="h-[200px] w-[200px] flex justify-center relative">
          <img
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt=""
            className="w-[175px] z-30 absolute bottom-0"
          />
        </div>
        <h3 className={`font-bold type-text-${pokemon?.types[0].type.name}`}>
          {pokemon?.name.charAt(0).toUpperCase()}
          {pokemon?.name.slice(1)}
        </h3>
        <span className="">{formatTypesPokemon(pokemon?.types)}</span>
        <span className="text-sm text-gray-400">Tipo</span>
      </div>
      <hr className="my-2" />
      <section className="grid grid-cols-2 px-4 py-2 pb-4 gap-2">
        {pokemon?.stats.slice(0, 4).map((stat) => (
          <div
            key={stat.stat.url}
            className="flex flex-col justify-center items-center gap-2"
          >
            <h6 className="text-[12px] text-center text-gray-400">
              {stat.stat.name.toUpperCase()}
            </h6>
            <span className={`type-text-${pokemon?.types[0].type.name} font-bold`}>{stat.base_stat}</span>
          </div>
        ))}
      </section>
      <div
        className={`absolute w-full h-[135px] type-${pokemon?.types[0].type.name}`}
      ></div>
    </article>
    </Link>
  );
};

export default PokemonCard;
