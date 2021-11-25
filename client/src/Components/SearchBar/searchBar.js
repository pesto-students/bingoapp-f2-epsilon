import { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";

function getCityData() {
  return fetch("data.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
}

function SearchBar() {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const [display, setDisplay] = useState(false);
  const wrapperRef = useRef(null);

  async function handler(city) {
    console.log("this is happened " + city);
    const data = await getCityData();
    const filterData = data.filter(
      (d) => d.title.toLowerCase().indexOf(city.toLowerCase()) !== -1
    );
    if (city) {
      setData(filterData);
    } else {
      setData([]);
    }
  }
  let debouncedRef = useRef(debounce(handler, 300));

  useEffect(() => {
    debouncedRef.current(city);
  }, [city]);

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

  const updateCity = (cityClick) => {
    setCity(cityClick);
    setDisplay(false);
  };
  return (
    <div ref={wrapperRef} className="flex-container flex-column pos-rel">
      <div class="ui search">
        <div class="ui icon input">
          <input
            class="prompt"
            value={city}
            onClick={showDisplay}
            type="text"
            placeholder="Search"
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          <i class="search icon"></i>
        </div>
      </div>
      {display && (
        <div className="autoContainer">
          {data.map((el, i) => {
            return (
              <div className="hoverColor">
                <div className="options" onClick={() => updateCity(el.title)}>
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
