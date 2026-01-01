import React from 'react'
import { useEffect, useState } from 'react';

function Weather(){
    const [city, setCity] = useState(localStorage.getItem("city") || "Delhi");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = "OpenWeatherMap_API_Key"; // Replace with your OpenWeatherMap API key

    const fetchWeather = async () => {
    if(city.trim() === '') return;
    
   


    setLoading(true);
    setError(null);
    setWeather(null);
    localStorage.setItem("city", city);


    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if(!response.ok){
            throw new Error('City not found');
        }

        const data = await response.json();
            setWeather(data);
            localStorage.setItem("city", city);

    } catch (err) {
        setError(err.message);
} finally {
    setLoading(false);
}
};

 useEffect(() => { //for default city weather on page load
  fetchWeather();
}, []);


const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    fetchWeather();
  }
};


return(
    <div className='app'>
        <h1>Weather App </h1>

        <input 
        type="text"
        placeholder='Enter city'
        value={city}
        onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={fetchWeather} disabled={city.trim() === ""}>Search</button>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

       {weather && (
  <div className="weather-box">
    <h2>{weather.name}</h2>

    <img
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      alt="weather icon"
    />

    <p className="temp">{weather.main.temp} °C</p>
    <p className="condition">{weather.weather[0].main}</p>
  </div>
)}


    </div>
    );
}

export default Weather;
