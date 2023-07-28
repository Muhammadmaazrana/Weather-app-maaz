import React, { useState, useEffect } from 'react';


function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  const fetchWeatherData = async () => {
    try {
      // Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
      const apiKey = '81166c5917e725eed05d9bd2ce435358';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error(error);
      setWeather(null);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  // List of background images (add your own image URLs here)
  const backgroundImages = [
    'url("https://images.pexels.com/photos/6195003/pexels-photo-6195003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
    'url("https://images.pexels.com/photos/2422497/pexels-photo-2422497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
    'url("https://images.pexels.com/photos/3227984/pexels-photo-3227984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
    'url("https://images.unsplash.com/photo-1530908295418-a12e326966ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80")',
    'url("https://images.unsplash.com/photo-1562494400-5b335a653209?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=462&q=80)',
    // Add more image URLs as needed
  ];

  const [backgroundIndex, setBackgroundIndex] = useState(0);

  // Function to change the background image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  // Apply the dynamically changing background image style to the body
  useEffect(() => {
    document.body.style.backgroundImage = backgroundImages[backgroundIndex];
  }, [backgroundIndex]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6 col-md-8 col-sm-10">
        <div id="background" className="background-div">
          <div className="card bg-transparent border-0">
            <div className="card-body">
              <h1 className="text-center mb-4"><b>Weather App</b></h1>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter city name..."
                  value={city}
                  onChange={handleCityChange}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                  Search
                </button>
              </div>
              <br />
              {weather ? (
                <div className="weather-info">
                  <h2 className="text-center mb-4">
                    {weather.name}, {weather.sys.country}
                  </h2>
                  <div className="d-flex justify-content-center align-items-center weather-icon">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                      alt="Weather Icon"
                    />
                    <h3 className="ms-3 weather-description">
                      {weather.weather[0].description}
                    </h3>
                  </div>
                  <div className="text-center mt-4 weather-details">
                    <h1 className="display-1">{weather.main.temp}°C</h1>
                    <p>Feels like: {weather.main.feels_like}°C</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind: {weather.wind.speed} m/s</p>
                  </div>
                </div>
              ) : (
                
                <p className="text-center"><b>Enter a city to get the weather</b></p>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
