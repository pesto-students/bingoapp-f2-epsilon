import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../assets/css/search.css";
import { movies } from "../../Utilities";
import { Link } from "react-router-dom";
import Loader from "../../Parts/Loader/loader";
import {
  getSearchedMovies,
  getCategoriesMovies,
} from "../../Services/apiCalls";

function Cards(props) {
  return (
    <div className="col-xs-12 col-md-6 col-sm-6 col-lg-4 hello center-aligned">
      <Link to={`/watch/${props.id}`}>
        <div className="wrapper center-block">
          <img
            className="play img-fluid responsive-image"
            src="https://i.imgur.com/z3jH6DD.png"
            alt="play-button"
          />
          <img
            className="img-fluid responsive-image"
            src={props.thumbnail}
            alt="search-movie-image"
          />
        </div>
      </Link>
      <p className="search-desc">{props.title}</p>
    </div>
  );
}

function SearchPage() {
  const [loading, setLoading] = useState(true);
  const [moviesData, setMoviesData] = useState([]);
  const { type,keyword } = useParams();
  useEffect(() => {
    if (type==="title") {
      getMovies(keyword);
    }
    if (type==="categories") {
      getMoviesBasedOnCategories(keyword);
    }
  }, [type,keyword]);

  const getMovies = async (keyword) => {
    const { data, status } = await getSearchedMovies({ keyword });
    if (status === 200) {
      setMoviesData(data.movie);
      setLoading(false);
    }
  };

  const getMoviesBasedOnCategories = async (keyword) => {
    const { data, status } = await getCategoriesMovies({ keyword });
    if (status === 200) {
      setMoviesData(data);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <h4 className="search-h4"> Based on your search....</h4>
          <p className="search-p">{moviesData.length} matches </p>
          <div className="row">
            {moviesData.length > 0 ? (
              moviesData.map((item) => (
                <Cards title={item.name} id={item._id} thumbnail={item.image} />
              ))
            ) : (
              <p>No matches found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default SearchPage;
