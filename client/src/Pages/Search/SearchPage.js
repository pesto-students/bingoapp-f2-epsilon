import React from "react";
import "../../assets/css/search.css";
import bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { movies } from "../../Utilities";
import { Link } from "react-router-dom";

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
  var arr = [];
  Object.keys(movies).forEach(function (key) {
    arr.push(movies[key]);
  });
  return (
    <>
      <div className="container">
        <h4 className="search-h4"> Based on your search....</h4>
        <p className="search-p">204 matches </p>
        <div className="row">
          {arr.map((item) => (
            <Cards
              title={item.title}
              id={item.id}
              thumbnail={item.thumbnail}
              completed={item}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default SearchPage;
