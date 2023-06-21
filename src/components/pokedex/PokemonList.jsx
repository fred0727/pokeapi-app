import React from 'react'
import PokemonCard from './PokemonCard'

const PokemonList = ({pokemons}) => {
  return (
    <div className='grid grid-cols-[repeat(auto-fill,_275px)] gap-5 p-5 items-center justify-center lg:max-w-[1600px] mx-auto'>
        {
        pokemons?.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}/>)
        }
    </div>
  )
}

export default PokemonList