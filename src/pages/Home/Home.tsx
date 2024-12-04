import { useEffect, useState } from "react";
import SearchGame from "../SearchGame/SearchGame";
import './home.css';
import { getEstadistics } from "../../services/public.services";
import { Loading } from "../../components/Loading/Loading";

const Home = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [estadistics, setEstadistics] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleToggleSearch = () => {
    setShowSearch((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchEstadistics = async () => {
      try {
        setIsLoading(true);
        const data = await getEstadistics();
        setEstadistics(data);
      } catch (err) {
        console.log('Error al obtener las estadísticas', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEstadistics();
  }, []);

  return (
    <>
      <section className="bg-gray-50">
        {showSearch ? (
          <div>
            <button onClick={handleToggleSearch} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Volver
            </button>
            <div>
              <SearchGame />
            </div>
          </div>
        ) : (
          <div>
            {
              isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading />
                </div>
              ) : (
                <div className="bg-gray-50 py-5 sm:py-5">
                  <div className="cabecera-home">
                    <button onClick={handleToggleSearch} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Agregar juego
                    </button>
                  </div>
                  <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-center text-base/7 font-semibold text-blue-500">Juegos Tracker</h2>
                    <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight sm:text-5xl">
                      Tus juegos favoritos en un solo lugar
                    </p>
                    <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                      {estadistics.map((estadistic: any, index: number) => (
                        <div key={index} className="relative bg-gray-900 p-1 m-0.5 rounded-xl text-white shadow-[2px_2px_2px_1px_rgba(0,0,0,0.2)]">
                          <div className="absolute inset-px rounded-lg max-lg:rounded-t-[2rem]"></div>
                          <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                            <div className="px-5 py-5 sm:px-10 sm:p-10 flex flex-col justify-center items-center">
                              <p className="mt-2 text-lg font-medium tracking-tight max-lg:text-center">
                                {estadistic.plataforma}
                              </p>
                              <p className="mt-2 text-3xl font-bold text-cyan-500 max-lg:text-center">
                                {estadistic.total_juegos}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                </div>
              )}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
