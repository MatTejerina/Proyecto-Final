import React, { useState, useEffect } from 'react';
import Card_Weather from './Card_Weather';
import '../styles/HomePage.css'

const WeatherPanel = () => {
  const location = "San Miguel de Tucuman";
  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=6eea3fda2ef773b920358893eba07aba&lang=es&q=${location}`;
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?appid=6eea3fda2ef773b920358893eba07aba&lang=es&q=${location}`;

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);

      try {
        const weatherResponse = await fetch(urlWeather);
        if (!weatherResponse.ok) throw new Error('Failed to fetch weather data');
        const weatherData = await weatherResponse.json();
        setWeather(weatherData);

        const forecastResponse = await fetch(urlForecast);
        if (!forecastResponse.ok) throw new Error('Failed to fetch forecast data');
        const forecastData = await forecastResponse.json();
        setForecast(forecastData);

        setShow(true);
      } catch (error) {
        console.error(error);
        setShow(false);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [urlWeather, urlForecast]);

  return (
    <React.Fragment>
      <Card_Weather className='card-weather'
        showData={show}
        loadingData={loading}
        weather={weather}
        forecast={forecast}
      />
    </React.Fragment>
  );
};

export default WeatherPanel;