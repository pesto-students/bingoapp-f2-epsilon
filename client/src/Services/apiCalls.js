import { onApiCall } from "./CommonApi";

export const getAllMovies = (request) => {
  return onApiCall({
    url: `api/movies?page=${request ? request : "1"}`,
    method: "GET",
    data: request,
  });
};

export const getPlaylistMovies = (request) => {
  return onApiCall({
    url: `/api/playlist/show?email=${request.email}&page=${
      request.page ? request.page : "1"
    }`,
    method: "GET",
    data: request,
  });
};

export const getAllCategories = (request) => {
  return onApiCall({
    url: `/api/categories`,
    method: "GET",
    data: request,
  });
};

export const getSingleMovie = (request) => {
  return onApiCall({
    url: `/api/movies/${request.id}`,
    method: "GET",
    data: request,
  });
};

export const getSearchedMovies = (request) => {
  return onApiCall({
    url: `/api/search/${request.keyword}`,
    method: "GET",
    data: request,
  });
};

export const getCategoriesMovies = (request) => {
  return onApiCall({
    url: `/api/categories/search/${request.keyword}`,
    method: "GET",
    data: request,
  });
};

export const addToMyPlaylist = (request) => {
  return onApiCall({
    url: `/api/playlist/add`,
    method: "POST",
    data: request,
  });
};

export const getPreviouslyWatchedMovies = (request) => {
  return onApiCall({
    url: `/api/based_on_previous_watch/show?email=${request.email}&page=${
      request.page ? request.page : "1"}`,
    method: "GET",
    data: request,
  });
};
