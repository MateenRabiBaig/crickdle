import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const getRandomPlayer = async () => {
  const res = await axios.get(`${BASE_URL}/api/v1/players/random`);
  return res.data.data;
};

export const getAllPlayers = async () => {
  const res = await axios.get(`${BASE_URL}/api/v1/players`);
  return res.data.data;
};