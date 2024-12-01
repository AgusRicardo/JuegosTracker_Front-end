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
          <button onClick={handleToggleSearch} className="px-4 py-2 bg-red-500 text-white rounded mb-4">
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
          ): (
          <div className="bg-gray-50 py-5 sm:py-5">
            <div className="cabecera-home">
              <button onClick={handleToggleSearch} className="px-4 py-2 bg-blue-500 text-white rounded">
                Agregar juego
              </button>
            </div>
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
              <h2 className="text-center text-base/7 font-semibold text-indigo-600">Juegos Tracker</h2>
              <p className="mx-auto mt-2 max-w-lg text-balance text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
                Tus juegos favoritos en un solo lugar
              </p>
              <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
              {estadistics.map((estadistic: any, index: number) => (
                <div key={index} className="relative max-lg:row-start-1">
                  <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]"></div>
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                    <div className="px-5 py-5 sm:px-10 sm:pt-10 flex flex-col justify-center items-center">
                      <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                        {estadistic.plataforma}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-blue-500 max-lg:text-center">
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
