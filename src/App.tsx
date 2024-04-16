import React, { useState, useEffect } from 'react';
import SearchBasicExample from './search.tsx';
// import './app.css';


interface Pokemon {
  name: string;
  url: string;
  image: string;
  sprites: {
    'official-artwork': {
      front_default: string;
    };
  };
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=500');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const pokemonDetailsPromises = data.results.map(async (pokemon: any) => {
          const pokemonResponse = await fetch(pokemon.url);
          if (!pokemonResponse.ok) {
            throw new Error('Failed to fetch pokemon details');
          }
          const pokemonData = await pokemonResponse.json();
            return {
              name: pokemonData.name,
              // image: pokemonData.sprites.other['official-artwork'].front_default,
              image: pokemonData.sprites.versions['generation-v']['black-white']['animated'].front_default,
              natural_gift_power: pokemonData.natural_gift_power,
              type: pokemonData.types.map((type: any) => type.type.name).join(', '),
              id: pokemonData.id,
            };
        });
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
        setPokemons(pokemonDetails);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toUpperCase().includes(searchTerm.toUpperCase()),
  );

  return (
    <>
      <h1 className='flex items-center text-1xl sm:text-2xl bg-stone-700 w-full text-white p-2'> {/*SMALL SCREEN   size-4/12 */}
        <img src='/img/logo.png' alt='Logo' className='size-2/12 mr-2 sm:mr-4 sm:size-1/12' /> {/*SMALL SCREEN   size-4/12 */}
        <span className='font-bold mr-1 sm:mr-2'>Pokeverse</span>  | All Pokemon
      </h1>
      <SearchBasicExample searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      

      <div className='grid grid-cols-2 sm:grid-cols-5'>
        {filteredPokemons.map((pokemon, index) => (
          <div className="grid items-center justify-items-center w-36 m-4 py-4 px-4 max-w-sm mx-auto bg-white rounded-xl shadow-xl space-y-6" key={index}>
            <img src={pokemon.image} alt={pokemon.name} className="rounded-lg w-1/2 h-auto pt-0 border-t-0" />
            <div className='justify-items-left text-lg font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-pink-900 to-red-500'>{pokemon.name.toLocaleUpperCase()}</div>
            {/* <div className='justify-items-left '>Level: {pokemon.natural_gift_power}</div> */}


            <button className="px-6 py-1 text-xs text-pink-600 font-semibold rounded-lg border border-purple-200 hover:text-white  hover:bg-pink-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-offset-2 ease-in-out duration-300">
              More
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

    // Reaponse.all(data).then((results) => {
    // const pokemon = results.map((result) => ({
    //     name: result.name,
    //     image: result.sprites['front_default'],
    //     type: result.types.map((type) => type.type.name).join(', '),
    //     id: result.id
    // }));
    // displayPokemon(pokemon);
    // });