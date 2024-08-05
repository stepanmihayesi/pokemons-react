import React from 'react';
interface Pokemon {
  name: string
}

interface PokemonListProps {
  pokemon: Pokemon;
}

const PokemonList: React.FC<PokemonListProps> = ({pokemon})  => {
  return  (
    <div>
      { pokemon.map((p: string) => (
        <div key={p}>{p}</div>
      )) }
    </div>
  );
}

export default PokemonList;
