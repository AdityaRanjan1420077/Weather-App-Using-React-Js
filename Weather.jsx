import React, { useEffect, useState, useRef } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null); // Initialize as null
  const allIcons = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03n': cloud_icon,
    '03d': cloud_icon,
    '04n': drizzle_icon,
    '04d': drizzle_icon,
    '09n': rain_icon,
    '09d': rain_icon,
    '10n': rain_icon,
    '10d': rain_icon,
    '13d': snow_icon,
    '13n': snow_icon,
  };

  const search = async (city) => {
    if (city.trim() === '') {
      alert('Enter the City Name');
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Invalid city or API key');
      }
      
      const data = await response.json();
      console.log(data); // Log the response data for debugging
      
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    search('London'); // Default city set to London
  }, []);

  const handleSearch = () => {
    const inputCity = inputRef.current.value;
    search(inputCity);
  };

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search' />
        <img src={search_icon} alt="Search" onClick={handleSearch} />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className='weather-icon' />
          <p className='temperature'>{`${weatherData.temperature}°C`}</p>
          <p className='location'>{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{`${weatherData.humidity}%`}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed" />
              <div>
                <p>{`${weatherData.windSpeed} KMPH`}</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Weather;
