import axios from 'axios';

const user = localStorage.getItem('user');
if (!user) {
  throw new Error('No se encontró un usuario autenticado en localStorage.');
}

const { uid } = JSON.parse(user);
const URL = `http://localhost:5432/`;

export const getGames = async (platform?: string) => {
  try {
    let endpoint = `${URL}user/${uid}`;
    if (platform) {
      endpoint += `/${platform}`;
    }
    
    const response = await axios.get(`${endpoint}/games`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener los juegos:', error);
    throw error;
  }
};
