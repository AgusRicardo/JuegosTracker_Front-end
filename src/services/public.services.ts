import axios from 'axios';
import { CreateGame } from '../interfaces/createGame.types';
import { DeleteGame } from '../interfaces/deleteGame.types';

const URL = `${import.meta.env.VITE_RENDER_URL}`;

export const getGames = async (platform?: string) => {
  try {
    const user = localStorage.getItem('user');
    const { uid } = JSON.parse(user || '{}');
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

export const saveGame = async (newGame: CreateGame) => {  
  try {
    const user = localStorage.getItem('user');
    const { uid } = JSON.parse(user || '{}');
    newGame.userId = uid;
    const response = await axios.post(`${URL}games/createGame`, newGame, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al guardar el juego:', error);
    throw error;
  }
};

export const deleteGame = async (game: DeleteGame) => {
  try {
    const user = localStorage.getItem('user');
    const { uid } = JSON.parse(user || '{}');
    const { gameId } = game;

    const response = await axios.delete(`${URL}games/deleteGame`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        gameId,
        userId: uid, 
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al eliminar el juego:', error);
    throw error;
  }
};

export const getEstadistics = async () => {  
  try {
    const user = localStorage.getItem('user');
    const { uid } = JSON.parse(user || '{}');

    const response = await axios.post(`${URL}games/estadistics/user_id`, { userId: uid }, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al obtener los juegos:', error);
    throw error;
  }
};
