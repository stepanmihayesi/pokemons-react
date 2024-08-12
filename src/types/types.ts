export interface Pokemons {
    name:string
    url: string
}
export interface Pokemon {
    id: number
    name: string
    sprites: {
      front_default: string
    }
    types: {
      type: {
        name: string
      }
    }[]
}
// export interface PokemonListProps {
//     pokemon: Pokemon;
// }
