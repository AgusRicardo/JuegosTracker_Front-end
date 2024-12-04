import { useState } from "react";
import { searchGame } from "../../services/rawg.services";
import "./searchGame.css";
import SaveGame from "../SaveGame/SaveGame";

const SearchGame = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 
  const [selectedGame, setSelectedGame] = useState<any | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); 
    try {
      const response = await searchGame<{ results: any[] }>(searchQuery);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error realizando la búsqueda:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleResultClick = (result: any) => {
    setSelectedGame(result); 
  };

  if (selectedGame) {
    return <SaveGame game={selectedGame} />;
  }

  return (
    <div>
      <form className="max-w-md mx-auto" onSubmit={handleSearch}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Buscar juegos..."
            autoComplete="off"
            value={searchQuery}
            onChange={handleInputChange}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          >
            Buscar
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center mt-4">
          <p className="text-lg text-gray-500">Cargando...</p>
        </div>
      )}

      {!loading && searchResults.length > 0 && (
        <div className="results-container grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="group bg-gray-900 p-1 m-0.5 rounded-xl text-white min-h-96 shadow-[2px_2px_2px_1px_rgba(0,0,0,0.2)]"
              onClick={() => handleResultClick(result)}
            >
              {result.metacritic !== null && (
                <div
                  className={`absolute top-2 right-2 text-white text-xs font-bold py-1 px-2 rounded ${
                    result.metacritic >= 75
                      ? 'bg-green-500'
                      : result.metacritic >= 50
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                >
                  {result.metacritic}
                </div>
              )}
              {result.short_screenshots && result.short_screenshots[0]?.image ? (
                <img
                  src={result.short_screenshots[0].image}
                  alt={`${result.name} screenshot`}
                  className="w-full h-40 object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Sin imagen</span>
                </div>
              )}

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{result.name}</h3>

                {result.stores && result.stores.length > 0 ? (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Tiendas:</h4>
                    <ul className="text-sm list-disc list-inside">
                      {result.stores.map((store: any, idx: number) => (
                        <li key={idx}>{store.store.name}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No disponible en tiendas</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchGame;
