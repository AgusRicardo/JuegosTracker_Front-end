import { useEffect, useState } from "react";
import { deleteGame, getGames } from "../../services/public.services";
import { Game } from "../../interfaces/game.types";
import { Loading } from "../../components/Loading/Loading";
import { DeleteGame } from "../../interfaces/deleteGame.types";
import Modal from "../../Helpers/Modals/Modal";
import toast, { Toaster } from "react-hot-toast";

const Xbox = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const gamesData = await getGames('Xbox');
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

  const handleDelete = async () => {
    if (selectedGameId === null) return;

    try {
      const game: DeleteGame = {
        gameId: selectedGameId,
      };

      await deleteGame(game);
      await fetchGames();
      toast.success("Se eliminó el juego correctamente");
    } catch (error: any) {
      toast.error("Error al borrar el juego. Intenta nuevamente.");
      console.log(error.response?.data?.error || "Error al borrar el juego. Intenta nuevamente.");
    } finally {
      setModalOpen(false);
      setSelectedGameId(null); 
    }
  };

  const openModal = (gameId: number) => {
    setSelectedGameId(gameId);
    setModalOpen(true);
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
                      onClick={() => openModal(product.game_id)}
                      className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Eliminar juego"
        message="¿Estás seguro de que deseas eliminar este juego? Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
      <Toaster position="bottom-left" reverseOrder={true} />
    </>
  );
};

export default Xbox;
