import React from 'react';
import Spinner from './Spinner';

const Card_Weather = ({ loadingData, showData, weather, forecast }) => {

  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  var date = day + '/' + month + '/' + year;

  var url = "";
  var iconUrl = "";

  var iconUrl3 = "";
  var iconUrl6 = "";
  var iconUrl9 = "";

  var forecastDate3 = "";
  var forecastDate6 = "";
  var forecastDate9 = "";

  if (loadingData) {
    return <Spinner />;
  }

  if (showData) {
    url = "http://openweathermap.org/img/w/";
    iconUrl = url + weather.weather[0].icon + ".png";

    iconUrl3 = url + forecast.list[1].weather[0].icon + ".png";
    iconUrl6 = url + forecast.list[2].weather[0].icon + ".png";
    iconUrl9 = url + forecast.list[3].weather[0].icon + ".png";

    forecastDate3 = forecast.list[1].dt_txt.substring(8, 10) + '/' + forecast.list[1].dt_txt.substring(5, 7) + '/' + forecast.list[1].dt_txt.substring(0, 4) + ' ' + forecast.list[1].dt_txt.substring(11, 13);
    forecastDate6 = forecast.list[2].dt_txt.substring(8, 10) + '/' + forecast.list[2].dt_txt.substring(5, 7) + '/' + forecast.list[2].dt_txt.substring(0, 4) + ' ' + forecast.list[2].dt_txt.substring(11, 13);
    forecastDate9 = forecast.list[3].dt_txt.substring(8, 10) + '/' + forecast.list[3].dt_txt.substring(5, 7) + '/' + forecast.list[3].dt_txt.substring(0, 4) + ' ' + forecast.list[3].dt_txt.substring(11, 13);
  }

  return (
    <div className="mt-5">
      {
        showData === true ? (
          <div className="container-weather">
            <div className="card-weather mb-3 mx-auto bg-dark text-light rounded">
              <div className="row g-0">
                <div className="col-md-4">
                  <h3 className="card-weather-title text-dark">{weather.name}</h3>
                  <p className="card-weather-date text-dark">{date}</p>
                  <h1 className="card-weather-temp text-dark  ">{(weather.main.temp - 273.15).toFixed(1)}ºC</h1>
                  <p className="card-weather-desc text-dark "><img src={iconUrl} alt="icon" />{weather.weather[0].description}</p>
                  <img src="https://thumbs.dreamstime.com/b/casa-de-la-independencia-en-tucum%C3%A1n-la-argentina-38648637.jpg" className="img-fluid h-100 rounded" alt="..." />
                </div>
                <div className="col-md-8 d-none d-md-block" >
                  <div className="card-weather-body text-start mt-2">
                    <h5 className="card-weather-text">Temperatura máxima: {(weather.main.temp_max - 273.15).toFixed(1)}ºC</h5>
                    <h5 className="card-weather-text">Temperatura mínima: {(weather.main.temp_min - 273.15).toFixed(1)}ºC</h5>
                    <h5 className="card-weather-text">sensación térmica: {(weather.main.feels_like - 273.15).toFixed(1)}ºC</h5>
                    <h5 className="card-weather-text">Humedad: {weather.main.humidity}%</h5>
                    <h5 className="card-weather-text">Velocidad del viento: {weather.wind.speed}m/s</h5>
                  </div>
                  <hr />

                  <div className="row text-center m-2 d-none d-md-flex">
                    <div className="col">
                      <p>{forecastDate3}h</p>
                      <p className="description"><img src={iconUrl3} alt="icon" />{forecast.list[1].weather[0].description}</p>
                      <p className="temp">{(forecast.list[1].main.temp - 273.15).toFixed(1)}ºC</p>
                    </div>
                    <div className="col">
                      <p>{forecastDate6}h</p>
                      <p className="description"><img src={iconUrl6} alt="icon" />{forecast.list[2].weather[0].description}</p>
                      <p className="temp">{(forecast.list[2].main.temp - 273.15).toFixed(1)}ºC</p>
                    </div>
                    <div className="col">
                      <p>{forecastDate9}h</p>
                      <p className="description"><img src={iconUrl9} alt="icon" />{forecast.list[3].weather[0].description}</p>
                      <p className="temp">{(forecast.list[3].main.temp - 273.15).toFixed(1)}ºC</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h2 className="text-light">Sin datos</h2>
        )
      }
    </div>
  );
}

export default Card_Weather;
