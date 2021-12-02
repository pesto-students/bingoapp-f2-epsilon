import { useEffect, useRef, useState,useCallback } from "react";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";

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
  let navigate = useNavigate();

  // async function handler(movie) {
  //   console.log("this is happened " + movie);
  //   const data = await getMovieData();
  //   const filterData = data.filter(
  //     (d) => d.title.toLowerCase().indexOf(movie.toLowerCase()) !== -1
  //   );
  //   if (movie) {
  //     setData(filterData);
  //   } else {
  //     setData([]);
  //   }
  // }
  // let debouncedRef = useRef(debounce(handler, 300));

  // useEffect(() => {
  //   debouncedRef.current(movie);
  // }, [movie]);

  // useEffect(() => {
  //   window.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     window.removeEventListener("mousedown", handleClickOutside);
  //   };
  // });

  // const handleClickOutside = (event) => {
  //   const { current: wrap } = wrapperRef;
  //   if (wrap && !wrap.contains(event.target)) {
  //     setDisplay(false);
  //   }
  // };

  // const showDisplay = () => {
  //   const debouncedSave = debounce(() => {
  //     navigate(`/search?title=${movie}`);
  //   }, 300);
  //   debouncedSave();
  // };

  // const updateMovie = (movieClick) => {
  //   setMovie(movieClick);
  //   setDisplay(false);
  // };

  // input change & debouncing starts
  const toSearchPage = (name) => {
    if(name){
      navigate(`/search/title/${name}`);
    }else{
      navigate(`/`);
    }
  };

  const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer=null;
        fn(...args);
      }, delay);
    };
  };

  const debounceChange=useCallback(debounce(toSearchPage, 800),[]);
  
  const onSearch = (e) => {
    setMovie(e.target.value);
    debounceChange(e.target.value)
  };

  // input change & debouncing ends

  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <div className="ui search">
        <div className="ui icon input">
          <input
            className="prompt"
            value={movie}
            type="text"
            placeholder="Search"
            onChange={onSearch}
          />
          <i className="search icon"></i>
        </div>
      </div>
      {/* {display && (
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
      )} */}
    </div>
  );
}

export default SearchBar;
