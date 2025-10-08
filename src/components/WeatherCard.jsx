import React from "react";
import { WeatherIcon, WindDirection } from "./Icons";

const WeatherCard = ({ weather }) => {
  const styles = {
    weatherInfo: {
      textAlign: "center",
    },
    cityName: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "10px",
      textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    },
    temperature: {
      fontSize: "72px",
      fontWeight: "bold",
      color: "#fff",
      margin: "20px 0",
      textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
    },
    description: {
      fontSize: "18px",
      color: "#fff",
      textTransform: "capitalize",
      marginBottom: "30px",
      textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
    },
    details: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginTop: "30px",
    },
    detailBox: {
      background: "rgba(255, 255, 255, 0.2)",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    detailLabel: {
      fontSize: "12px",
      color: "rgba(255, 255, 255, 0.8)",
      textTransform: "uppercase",
      marginBottom: "5px",
      fontWeight: "500",
    },
    detailValue: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#fff",
      textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
    },
  };

  return (
    <div style={styles.weatherInfo}>
      <WeatherIcon condition={weather.weather[0].main} size={80} />

      <h1 style={styles.cityName}>
        {weather.name}, {weather.sys.country}
      </h1>

      <div style={styles.temperature}>{Math.round(weather.main.temp)}°C</div>

      <p style={styles.description}>{weather.weather[0].description}</p>

      <div style={styles.details}>
        <div style={styles.detailBox}>
          <div style={styles.detailLabel}>Feels Like</div>
          <div style={styles.detailValue}>
            {Math.round(weather.main.feels_like)}°C
          </div>
        </div>

        <div style={styles.detailBox}>
          <div style={styles.detailLabel}>Humidity</div>
          <div style={styles.detailValue}>{weather.main.humidity}%</div>
        </div>

        <div style={styles.detailBox}>
          <div style={styles.detailLabel}>Wind</div>
          <div style={styles.detailValue}>
            {Math.round(weather.wind.speed)} m/s
          </div>
          <WindDirection degrees={weather.wind.deg} size={24} />
        </div>

        <div style={styles.detailBox}>
          <div style={styles.detailLabel}>Precipitation</div>
          <div style={styles.detailValue}>
            {weather.rain
              ? `${weather.rain["1h"] || 0} mm`
              : weather.snow
              ? `${weather.snow["1h"] || 0} mm`
              : "0 mm"}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#ffd700",
              marginTop: "4px",
              fontWeight: "600",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {weather.rain ? "🌧️ Rain" : weather.snow ? "❄️ Snow" : "☀️ None"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
