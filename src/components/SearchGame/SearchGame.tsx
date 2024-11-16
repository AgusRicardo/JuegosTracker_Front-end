import { useState } from "react";
import { searchGame } from "../../services/rawg.services";
import "./searchGame.css";

const SearchGame = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); 
    try {
      const response = await searchGame<{ results: any[] }>(searchQuery);
      console.log("Resultados de búsqueda:", response.data.results);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error realizando la búsqueda:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleResultClick = (result: any) => {
    console.log("Elemento seleccionado:", result);
  };

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
            placeholder="Search Mockups, Logos..."
            value={searchQuery}
            onChange={handleInputChange}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center mt-4">
          <p className="text-lg text-gray-500">Cargando...</p>
        </div>
      )}

      {!loading && searchResults.length > 0 && (
        <div className="results-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 container-search-card">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="card bg-white rounded-lg shadow-md p-4 dark:bg-gray-800 dark:text-white"
              onClick={() => handleResultClick(result)}
            >
              {result.short_screenshots && result.short_screenshots[0]?.image ? (
                <img
                  src={result.short_screenshots[0].image}
                  alt={`${result.name} screenshot`}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Sin imagen</span>
                </div>
              )}

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
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchGame;
