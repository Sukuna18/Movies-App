import axios from 'axios';
const API_KEY = '75ab2a3184c6669aa4e548d7d0fc1c20';
const API_URL = 'https://api.themoviedb.org/3';
export const getPopularMovies = async () => {
  const res = await axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}`);
  return res.data;
};
export const getUpcomingMovies = async () => {
  const res = await axios.get(`${API_URL}/movie/upcoming?api_key=${API_KEY}`);
  return res.data;
};
export const getPopularTvMovies = async () => {
  const res = await axios.get(`${API_URL}/tv/popular?api_key=${API_KEY}`);
  return res.data;
};
export const getFamilyMovies = async () => {
  const res = await axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&
  with_genres=10751`);
  return res.data;
};
export const getMovieDetails = async (id: number) => {
  const res = await axios.get(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
  return res.data;
};
