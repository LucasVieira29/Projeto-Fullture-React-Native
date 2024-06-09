const axios = require("axios").default;
import { TMDB_BASE_URL, TMDB_API_KEY, TMDB_IMAGE_BASE_URL, ENDPOINTS } from "@/constants/Urls";

const api = axios.create({
    baseURL:TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
        language: "pt-BR",
    },
});

const getNowPlayingMovies = () => api.get(ENDPOINTS.NOW_PLAYING_MOVIES);

const getPoster = (path: any) => `${TMDB_IMAGE_BASE_URL}/original${path}`;

const getMovieById = (movieId) => api.get(`${ENDPOINTS.MOVIE}/${movieId}`);



export { getNowPlayingMovies, getPoster, getMovieById, api };