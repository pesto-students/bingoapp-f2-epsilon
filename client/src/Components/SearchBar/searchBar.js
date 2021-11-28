import { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";

function getMovieData() {
  return fetch("data.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
}

function SearchBar() {
  const [data, setData] = useState([]);
  const [movie, setMovie] = useState("");
  const [display, setDisplay] = useState(false);
  const wrapperRef = useRef(null);

  async function handler(movie) {
    console.log("this is happened " + movie);
    const data = await getMovieData();
    const filterData = data.filter(
      (d) => d.title.toLowerCase().indexOf(movie.toLowerCase()) !== -1
    );
    if (movie) {
      setData(filterData);
    } else {
      setData([]);
    }
  }
  let debouncedRef = useRef(debounce(handler, 300));

  useEffect(() => {
    debouncedRef.current(movie);
  }, [movie]);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const showDisplay = () => {
    const debouncedSave = debounce(() => setDisplay(!display), 300);
    debouncedSave();
  };

  const updateMovie = (movieClick) => {
    setMovie(movieClick);
    setDisplay(false);
  };
  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <div className="ui search">
        <div className="ui icon input">
          <input
            className="prompt"
            value={movie}
            onClick={showDisplay}
            type="text"
            placeholder="Search"
            onChange={(event) => {
              setMovie(event.target.value);
            }}
          />
          <i className="search icon"></i>
        </div>
      </div>
      {display && (
        <div className="autoContainer">
          {data.map((el, i) => {
            return (
              <div className="hoverColor">
                <div className="options" onClick={() => updateMovie(el.title)}>
                  <span key={i}>{el.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
