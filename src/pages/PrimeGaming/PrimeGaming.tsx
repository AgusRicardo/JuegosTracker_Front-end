import { useEffect, useState } from "react";
import { Game } from "../../interfaces/game.types";
import { deleteGame, getGames } from "../../services/public.services";
import { AvailableStoresEnum } from "../../Helpers/Enums/AvailableStoresEnum";
import { Loading } from "../../components/Loading/Loading";
import { DeleteGame } from "../../interfaces/deleteGame.types";

const PrimeGaming = () => {
  const [games, setGames] = useState<Game[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const gamesData = await getGames(AvailableStoresEnum.PRIME_GAMING);
      setGames(gamesData);
    } catch (error) {
      console.error("Error al cargar los juegos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDelete = async (gameId: number) => {
    try {
      const game: DeleteGame = {
        gameId: gameId,
      };

      await deleteGame(game); 
      await fetchGames();
    } catch (error: any) {
      console.log(error.response?.data?.error || 'Error al borrar el juego. Intenta nuevamente.');
    }
  };

  return (
    <>
      <div className="">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
  
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          ) : games.length === 0 ? ( 
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700">No se encontraron juegos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {games.map((product) => (
                <div key={product.game_id} className="group">
                  <img
                    alt={product.game}
                    src={product.img}
                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover"
                  />
                  <h3 className="mt-4 text-sm text-gray-700">{product.game}</h3>
                  <div className="flex justify-end">
                    <button 
                      type="button"
                      onClick={() => handleDelete(product.game_id)}
                      className="flex items-center justify-center bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none">
                      Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PrimeGaming