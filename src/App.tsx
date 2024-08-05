import /* React,  */{ useState, useEffect } from 'react'
import './App.css'
import PokemonList from './PokemonList'
import axios, { Canceler } from 'axios'
import Pagination from './Pagination'

interface Pokemon {
  avatar: string
  name: string
  type: string
}

interface PokemonListProps {
  pokemon: Pokemon;
}

function App() {
  const [pokemon, setPokemon] = useState()
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPokemon = async () =>{
      setLoading(true)
      let cancel: Canceler
      axios.get(currentPageUrl, {
        cancelToken : new axios.CancelToken(c => cancel = c )
      }).then(res => {
        setLoading(false)
        setNextPageUrl(res.data.next)
        setPrevPageUrl(res.data.previous)
        
        setPokemon(res.data.results.map((pokemon : Pokemon ) => pokemon.name ))
        console.log('pokemon', pokemon);
      })
      return () => cancel()
    }
    getPokemon()
  }, [currentPageUrl])
  
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }
  if(loading) return "loading..."
  // loading && "loading..."
  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination 
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  )
}

export default App
