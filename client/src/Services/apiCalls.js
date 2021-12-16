import { onApiCall } from "./CommonApi";

export const getAllMovies = (request) => {
  return onApiCall({
    url: `read/movies?page=${request ? request : "1"}`,
    method: "GET",
    data: request,
  });
};

export const getPlaylistMovies = (request) => {
  return onApiCall({
    url: `/read/playlist/show?email=${request.email}&page=${
      request.page ? request.page : "1"
    }`,
    method: "GET",
    data: request,
  });
};

export const getAllCategories = (request) => {
  return onApiCall({
    url: `/read/categories`,
    method: "GET",
    data: request,
  });
};

export const addNewCategory = (request) => {
  return onApiCall({
    url: `/admin/categories/add`,
    method: "POST",
    data: request,
  });
};


export const getSingleMovie = (request) => {
  return onApiCall({
    url: `/read/movies/${request.id}`,
    method: "GET",
    data: request,
  });
};

export const getSearchedMovies = (request) => {
  return onApiCall({
    url: `/read/search/${request.keyword}`,
    method: "GET",
    data: request,
  });
};

export const getCategoriesMovies = (request) => {
  return onApiCall({
    url: `/read/categories/search/${request.keyword}`,
    method: "GET",
    data: request,
  });
};

export const addToMyPlaylist = (request) => {
  return onApiCall({
    url: `/write/playlist/add`,
    method: "POST",
    data: request,
  });
};

export const getPreviouslyWatchedMovies = (request) => {
  return onApiCall({
    url: `/read/based_on_previous_watch/show?email=${request.email}&page=${
      request.page ? request.page : "1"}`,
    method: "GET",
    data: request,
  });
};


export const uploadObject = (formdata) => {
  return onApiCall({
    url: `/write/video/upload`,
    method: "POST",
    data: formdata,
    isFileUpload:true,
  });
};