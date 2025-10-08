import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar.jsx";
import DateTime from "./components/DateTime.jsx";
import WeatherCard from "./components/WeatherCard.jsx";
import { fetchWeatherByCity, getDemoWeather } from "./data/weatherAPI.js";
import { getBackgroundImage } from "./utils/helpers.js";
import { DEFAULT_CITY } from "./data/constants.js";

function App() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [searchInput, setSearchInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherByCity(cityName);
      setWeather(data);
      setCity(cityName);
      console.log("Weather data:", data);
    } catch (err) {
      setError(err.message);
      setWeather(getDemoWeather(cityName));
      console.log("Using demo data for:", cityName);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchWeather(searchInput);
      setSearchInput("");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: weather
        ? `url(${getBackgroundImage(weather.weather[0].main)}) center/cover`
        : "url(https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&h=1080&fit=crop) center/cover",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      transition: "background 0.5s ease",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      zIndex: 0,
    },
    card: {
      background: "rgba(255, 255, 255, 0.15)",
      borderRadius: "20px",
      padding: "40px",
      maxWidth: "450px",
      width: "100%",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      position: "relative",
      zIndex: 1,
    },
    loading: {
      textAlign: "center",
      fontSize: "18px",
      color: "#fff",
    },
    error: {
      textAlign: "center",
      fontSize: "16px",
      color: "#e74c3c",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.card}>
        <SearchBar
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleSearch}
        />

        <DateTime />

        {loading && <div style={styles.loading}>Loading...</div>}
        {error && <div style={styles.error}>❌ {error}</div>}
        {weather && !loading && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;
