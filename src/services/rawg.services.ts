import { ApiResponse } from "../interfaces/api.types";

export const searchGame = async <T>(
  search: string,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  const baseUrl = 'https://api.rawg.io/api/'; 
  const url = `${baseUrl}games?key=${import.meta.env.VITE_FIREBASE_RAWG_API_KEY}&search=${search}&page_size=10`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en la consulta');
    }

    
    const filteredAndSortedResults = data.results
      .sort((a: any, b: any) => b.metacritic - a.metacritic);

    const sortedData = {
      ...data,
      results: filteredAndSortedResults,
    };

    return { data: sortedData, status: response.status };
  } catch (error: any) {
    throw new Error(error.message || 'Error al procesar la solicitud');
  }
};
