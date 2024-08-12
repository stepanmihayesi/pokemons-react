import { Pokemon } from "../types/types";
import List from "./List";
import PokemonBlock from "./PokemonBlock";

interface Props {
  pokemons: Pokemon[];
}

const PokemonsList: React.FC<Props> = (props) => {
  const pokemons = props;
  return (
    <section className="poke-list-container">
      <List
        items={pokemons.pokemons}
        renderItem={(pokemon: Pokemon) => (
          <PokemonBlock
            key={pokemon.id}
            name={pokemon.name}
            id={pokemon.id}
            image={pokemon.sprites.front_default}
            type={pokemon.types[0].type.name}
          />
        )}
      />
    </section>
  );
};
export default PokemonsList;
