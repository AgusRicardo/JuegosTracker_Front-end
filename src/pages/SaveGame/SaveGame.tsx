import { useState } from "react";
import { AvailableStoreIds, AvailableStoresEnum } from "../../Helpers/Enums/AvailableStoresEnum";
import { CreateGame } from "../../interfaces/createGame.types";
import { Store } from "../../interfaces/store.types";
import { saveGame } from "../../services/public.services";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SaveGame = ({ game }: { game: any }) => {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleStoreSelect = (store: Store) => {
    const storeId = AvailableStoreIds[store.name as AvailableStoresEnum];
    if (selectedStore?.name === store.name) {
      setSelectedStore(null);
    } else {
      setSelectedStore({ id: storeId, name: store.name });
    }
  };

  const handleSaveGame = async () => {
    if (!selectedStore) {
      console.error("No se ha seleccionado ninguna tienda");
      return;
    }

    const newGame: CreateGame = {
      name: game.name,
      img_url: game.short_screenshots?.[0]?.image || "Sin imagen",
      platform_id: selectedStore?.id,
      category_id: game.genres[0].id,
    };

    try {
      setIsSaving(true);
      await saveGame(newGame);
      toast.success("Juego guardado exitosamente");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Error al guardar el juego");
      console.log(error);
    }
  };

  return (
    <div className="max-w-xs mx-auto my-8 bg-white rounded-lg shadow-lg overflow-hidden">
      {game.short_screenshots && game.short_screenshots[0]?.image ? (
        <img
          src={game.short_screenshots[0].image}
          alt={`${game.name} screenshot`}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Sin imagen</span>
        </div>
      )}

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{game.name}</h3>

        <div className="mt-2">
          <h4 className="text-sm font-medium text-gray-700">Categorías:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
            {game.genres && game.genres.length > 0 ? (
              game.genres.map((genre: any, idx: number) => (
                <li key={idx} className="text-gray-600">{genre.name}</li>
              ))
            ) : (
              <p className="text-gray-500">No disponible</p>
            )}
          </div>
        </div>

        {game.stores && game.stores.length > 0 ? (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700">Disponible en:</h4>
            <div className="gap-2 mt-2">
              {game.stores.map((store: any, idx: number) => (
                <button
                key={idx}
                onClick={() => handleStoreSelect({ id: store.store.id, name: store.store.name })}
                className={`mr-1 mt-1 px-4 py-2 text-sm font-medium rounded-lg focus:outline-none 
                  ${
                    Object.values(AvailableStoresEnum).includes(store.store.name)
                      ? selectedStore?.name === store.store.name
                        ? "bg-green-200 text-black"
                        : "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm text-center"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-not-allowed"
                  }`}
                disabled={!Object.values(AvailableStoresEnum).includes(store.store.name)}
              >
                {store.store.name}
              </button>

              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-2">No disponible en tiendas</p>
        )}

        <button
          onClick={handleSaveGame}
          disabled={isSaving || !selectedStore}
          className={`w-full mt-4 py-2 rounded-lg text-white font-medium 
            ${isSaving || !selectedStore ? "bg-gray-300 cursor-not-allowed" : "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center"}`}
        >
          {isSaving ? "Guardando..." : "Guardar Juego"}
        </button>
      </div>
      <Toaster position="bottom-left" reverseOrder={true} />
    </div>
  );
};

export default SaveGame;
