import React, { useState } from 'react';

const App = () => {
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const handleConsultarClima = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},${country}&appid=YOUR_API_KEY&lang=es&units=metric`);
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
        setError('');
      } else {
        setWeatherData(null);
        setError('No se encontraron datos de la ciudad ingresada.');
      }
    } catch (error) {
      console.error('Error al consultar el clima:', error);
      setError('Ocurrió un error al consultar el clima. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h1>Consulta de Clima</h1>
      <div>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ingrese la ubicación" />
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Ingrese el país" />
        <button onClick={handleConsultarClima}>Consultar</button>
      </div>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Clima en {weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Descripción: {weatherData.weather[0].description}</p>
          {/* Mostrar más datos del clima según tus necesidades */}
        </div>
      )}
    </div>
  );
};

export default App;
