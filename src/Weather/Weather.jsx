import { useEffect, useState } from "react";
import "./Weather.css";

const Weather = () => {
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState({});
    const [lag, setLag] = useState([])
    const [leti, setLeti] = useState([])
    const [weatherClass, setWeatherClass] = useState('default-background');
    const [isClicked, setIsClicked] = useState(false);

  
    const api = {
      key: "e6efd5e4cc8b44dc43cfc7fbea2bca5b",
      base: "https://api.openweathermap.org/data/2.5/",
    };
  
    function searchApi() {
        setIsClicked(true);
        if (search) {
          fetch(`${api.base}weather?q=${search}&lat=${leti}&lon=${lag}&APPID=${api.key}&units=metric`)
            .then((res) => res.json())
            .then((data) => {
              setWeather(data);
    
              if (data.weather && data.weather[0]) {
                const condition = data.weather[0].main;
                const bg = {
                  
                  clouds: 'cloudy-background',
                  
                };
    
                setWeatherClass(bg[condition] || 'default-background');
              }
            });
        }
      }
    
      function fetchCurrentLocation() {
        setIsClicked(true);
        navigator.geolocation.getCurrentPosition(function (position) {
          fetch(`${api.base}weather?&lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=${api.key}&units=metric`)
            .then((res) => res.json())
            .then((data) => {
              setWeather(data);
    
              if (data.weather && data.weather[0]) {
                const condition = data.weather[0].main;
                const bg= {
                  
                  clouds: 'cloudy-background',
                  
                };
    
                setWeatherClass(bg[condition] || 'default-background');
              }
            });
        });
      }
      

    
    return (
      <div >
  
      <div className={`weather ${isClicked ? 'cloudy-background' : 'default-background'}`}>
        {/* <AsyncPaginate placeholder="Search for city" /> */}
            <div className="search">
              <input
                type="text"
                placeholder="Enter City Name"
                onChange={(e) => setSearch(e.target.value)}
                />
              <button onClick={searchApi}>
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
              <button onClick={fetchCurrentLocation}>
          <i className="fa-solid fa-location"></i>
        </button>
              
            </div>
        {typeof weather.main !== "undefined" ? (
          <div className="details">
  
            <div className="wDetails">
              <p className="city">{weather.name}</p>
              <img src={`icons/${weather.weather[0].icon}.png`} alt="" />
              <p className="type">{weather.weather[0].main}</p>
              <p className="deg">{Math.floor(weather.main.temp)}°C</p>
              <p>Feel like {Math.floor(weather.main.feels_like)} °C</p>
              <p>
                <i class="fa-solid fa-wind"></i> {weather.wind.speed} m/s
              </p>
              <p>Humidity {weather.main.humidity}%</p>
            </div>
          </div>
        ) : (
          <div className="reload">
            Not Found
            <button onClick={searchApi}><i class="fa-solid fa-rotate-right"></i></button>
          </div>
          )}
      </div>
    </div>
    );
  };
  
export default Weather;
  