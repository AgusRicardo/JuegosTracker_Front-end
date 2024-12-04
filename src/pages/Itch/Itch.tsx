import { useEffect, useState } from "react";
import { Game } from "../../interfaces/game.types";
import { AvailableStoresEnum } from "../../Helpers/Enums/AvailableStoresEnum";
import { deleteGame, getGames } from "../../services/public.services";
import { Loading } from "../../components/Loading/Loading";
import { DeleteGame } from "../../interfaces/deleteGame.types";
import Modal from "../../Helpers/Modals/Modal";
import toast, { Toaster } from "react-hot-toast";
import logo from "./14.png";

const Itch = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const gamesData = await getGames(AvailableStoresEnum.ITCH_IO);
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
    <header className="bg-gray-900 py-4">
        <div className="container mx-auto flex justify-center">
          <img src={logo} alt="Logo" className="h-12 w-auto filter invert brightness-0" />
        </div>
      </header>
      <div className="">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 max-w-full lg:px-8">
          <h2 className="sr-only">Products</h2>

          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          ) : games.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-lg font-medium text-gray-700">No se encontraron juegos.</p>
            </div>
          ) : (
            <div className="results-container grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
              {games.map((product) => (
                <div key={product.game_id} className="group bg-gray-900 p-1 m-0.5 rounded-xl text-white shadow-[2px_2px_2px_1px_rgba(0,0,0,0.2)]">
                  <img
                    alt={product.game}
                    src={product.img}
                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover"
                  />
                  <h3 className="mt-4 mb-4 text-base">{product.game}</h3>
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

export default Itch;
