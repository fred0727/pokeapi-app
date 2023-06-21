import React, { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonList from "../components/pokedex/PokemonList";

const Pokedex = () => {
  const nameTrainer = useSelector((store) => store.nameTrainer);
  const [types, setTypes] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [namePokemon, setNamePokemon] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(20);
  const [pokemonInPage, setPokemonInPage] = useState(null)
  const [lastPage, setLastPage] = useState(null)
  const [pagesInBlock, setPagesInBlock] = useState([])

  const pokemonByName = pokemons.filter((pokemon) =>
    pokemon.name.includes(namePokemon.toLowerCase().trim())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setNamePokemon(e.target.namePokemon.value);
  };

  const handleChangeType = (e) => {
    setCurrentType(e.target.value);
  };

  const handleChangePokemonsPage = (e) => {
    setPokemonPerPage(Number(e.target.value));
  };

  const paginationLogic = () => {
    // Pokemons que se van a mostrar en la pagina actual
    const sliceStart = (currentPage - 1) * pokemonPerPage;
    const sliceEnd = sliceStart + pokemonPerPage;
    setPokemonInPage(pokemonByName.slice(sliceStart, sliceEnd));

    // Ultima Pagina
    setLastPage(Math.ceil(pokemonByName.length / pokemonPerPage) || 1);

    // Bloque Actual
    const PAGE_PER_BLOCK = 5;
    const actualBlock = Math.ceil(currentPage / PAGE_PER_BLOCK);

    // Paginas que se van a mostrar en el bloque actual
    const pagesInBlockarray = [];
    const minPage = (actualBlock - 1) * PAGE_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGE_PER_BLOCK + 1;
    for (let i = minPage; i < maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlockarray.push(i);
      }
    }
    setPagesInBlock(pagesInBlockarray)
  };

  const handleClickPrevisusPage = () => {
    const newCurrentpage = currentPage - 1;
    if (newCurrentpage >= 1) {
      setCurrentPage(newCurrentpage);
    }
  };

  const handleClickNextPage = () => {
    const newCurrentpage = currentPage + 1;
    if (newCurrentpage <= lastPage) {
      setCurrentPage(newCurrentpage);
    }
  };

  useEffect(() => {
    if (!currentType) {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=1281";
      axios
      .get(url)
      .then(({ data }) => {
        setPokemons(data.results)
      })
      .catch((err) => console.log(err));
    }
  }, [currentPage,currentType,pokemonInPage]);

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/type";
    axios
      .get(url)
      .then(({ data }) => {
        setTypes(data.results)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentType) {
      const url = `https://pokeapi.co/api/v2/type/${currentType}`;
      axios
        .get(url)
        .then(({ data }) => {
          const pokemonsByType = data.pokemon.map((pokemon) => pokemon.pokemon);
          setPokemons(pokemonsByType);
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  
  useEffect(() => {
    setCurrentPage(1);
  }, [namePokemon, currentType]);
  
  useEffect(() => {
    paginationLogic()
  }, [pokemons, currentType, currentPage, pokemonPerPage, namePokemon]);

  
  return (
    <div className="w-full items-center dark:bg-slate-950 min-h-screen">
      <Header />
      <section className="px-4 py-4 text-sm xxs:text-base md:w-[750px] mx-auto md:text-xl lg:w-full lg:px-10 lg:max-w-[1440px] lg:py-1">
        <div className="flex flex-col gap-3 md:pt-4 ">
          <p className="dark:text-white">
            <span className="text-[#FE1936] font-bold">
              Bienvenido {nameTrainer}
            </span>
            , aquí podras encontrar tu pokemón favorito.
          </p>
          <div className="flex flex-wrap gap-3 lg:flex-nowrap lg:gap-5 lg:flex-row-reverse">
            <form
              className="flex justify-center items-center w-full"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                id="namePokemon"
                placeholder="Look for a pokemon"
                className="bg-white h-8 xxs:h-10 text-sm xxs:text-base px-3 outline-none shadow-md rounded-sm text-gray-600 hover:border-gray-100 hover:border-[1px] w-full lg:h-12"
              />
              <button className="bg-[#D93F3F] text-white text-sm px-4 h-8 shadow-md rounded-sm xxs:text-lg xxs:h-10 xxs:px-6 lg:h-12 lg:text-xl">
                Go!
              </button>
            </form>
            <div className="flex flex-col gap-3 w-full xxs:flex-row">
              <div className="flex w-full xxs:w-[70%]">
                <select
                  name="selectType"
                  id="selectType"
                  className="w-full bg-white rounded-sm shadow-md py-3 px-3 outline-none cursor-pointer"
                  onChange={handleChangeType}
                >
                  <option value="">All pokemon</option>
                  {types.map((type) => (
                    <option key={type.url} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-start items-center w-full gap-4 xxs:w-[30%]">
                <label
                  htmlFor="selectPokemonPage"
                  className="w-full xxs:hidden dark:text-white"
                >
                  Number of pokemon:
                </label>
                <select
                  name="selectPokemonPage"
                  id="selectPokemonPage"
                  className="bg-white rounded-sm shadow-md py-3 px-3 outline-none cursor-pointer w-[120px] xxs:w-full"
                  onChange={handleChangePokemonsPage}
                >
                  <option value="20">Per Page</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="12">12</option>
                  <option value="16">16</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PokemonList pokemons={pokemonInPage} />
      <ul className="flex gap-3 justify-center py-6 md:py-12 px-2 flex-wrap">
        <li
          onClick={() => setCurrentPage(1)}
          className="p-3 md:px-6 md:py-5 bg-red-400 font-bold text-white rounded-md cursor-pointer md:text-lg"
        >
          {"<<"}
        </li>
        <li
          onClick={handleClickPrevisusPage}
          className="p-3 md:px-6 md:py-5 bg-red-400 font-bold text-white rounded-md cursor-pointer md:text-lg"
        >
          {"<"}
        </li>
        {pagesInBlock.map((numberPage) => (
          <li
            onClick={() => setCurrentPage(numberPage)}
            className={`p-3 md:px-6 md:py-5 hover:bg-red-600 hover:text-white  font-bold rounded-md md:text-lg cursor-pointer ${
              numberPage === currentPage
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-800 font-light"
            }`}
            key={numberPage}
          >
            {numberPage}
          </li>
        ))}
        <li
          onClick={handleClickNextPage}
          className="p-3 md:px-6 md:py-5 bg-red-400 font-bold text-white rounded-md cursor-pointer md:text-lg"
        >
          {">"}
        </li>
        <li
          onClick={() => setCurrentPage(lastPage)}
          className="p-3 md:px-6 md:py-5 bg-red-400 font-bold text-white rounded-md cursor-pointer md:text-lg"
        >
          {">>"}
        </li>
      </ul>
    </div>
  );
};

export default Pokedex;
