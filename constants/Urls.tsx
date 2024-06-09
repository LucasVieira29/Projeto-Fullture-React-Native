const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const TMDB_API_KEY = "3c57e2cf1785854198d17584cdbd86ce"

const ENDPOINTS = {
    NOW_PLAYING_MOVIES: "/movie/now_playing",
    GENRES: "/genre/movie/list",
    MOVIE: "/movie",
};

const APPEND_TO_RESPONSE = {
    SIMILAR: "similar"
}

export {TMDB_BASE_URL, TMDB_API_KEY, TMDB_IMAGE_BASE_URL, ENDPOINTS, APPEND_TO_RESPONSE};