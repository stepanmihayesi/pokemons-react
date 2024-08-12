import { useState, useEffect, useCallback } from "react";
import "./App.css";
import PokemonsList from "./components/PokemonsList";
import axios, { Canceler } from "axios";
import Pagination from "./Pagination";
import { Pokemon } from "./types/types";
import Events from "./components/Events";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
  );
  const [prevPageUrl, setPrevPageUrl] = useState<string>("");
  const [nextPageUrl, setNextPageUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [cancel, setCancel] = useState<Canceler | null>(null);

  const fetchPokemonData = useCallback(async () => {
    setLoading(true);
    let cancel: Canceler;
    const source = axios.CancelToken.source();
    setCancel(() => source.cancel);
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setPrevPageUrl(res.data.previous);
        setNextPageUrl(res.data.next);
        const pokemonDetailsPromises = res.data.results.map(
          (pokemon: { name: string }) => {
            return axios
              .get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
              .then((poke) => poke.data);
          }
        );
        return Promise.all(pokemonDetailsPromises);
      })
      .then((pokemonDetails) => {
        setPokemons(pokemonDetails);
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error while fetching Pokemon data:", error);
        }
        setLoading(false);
      });
    // try {
    //   const res = await axios.get(currentPageUrl);
    //   setPrevPageUrl(res.data.previous);
    //   setNextPageUrl(res.data.next);
    //   const pokemonDetails = await Promise.all(
    //     res.data.results.map(async (pokemon: { name: string }) => {
    //       const poke = await axios.get(
    //         `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
    //       );
    //       return poke.data;
    //     })
    //   );
    //   setLoading(false);
    //   setPokemons(pokemonDetails);
    // } catch (error) {
    //   console.error("Error while fetching Pokemon data:", error);
    // }
  }, [currentPageUrl]);
  useEffect(() => {
    fetchPokemonData();
    if (cancel) {
      cancel();
    }
  }, [fetchPokemonData]);
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }
  function setPagination(num: string) {
    setCurrentPageUrl(
      `https://pokeapi.co/api/v2/pokemon?limit=${num}&offset=0`
    );
  }
  if (loading) return "loading...";
  return (
    <div className="App">
      <Events />
      <PokemonsList pokemons={pokemons} />
      <Pagination
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
        setPagination={setPagination}
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
      />
    </div>
  );
}

export default App;
