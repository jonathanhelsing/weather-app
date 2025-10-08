import React, { useState, useEffect } from "react";

// Search Icon Component
const SearchIcon = ({ size = 20, color = "#fff" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>
);

// Weather Icons Component
const WeatherIcon = ({ condition, size = 64 }) => {
  const getIcon = () => {
    const lower = condition.toLowerCase();
    if (lower.includes("clear")) return "☀️";
    if (lower.includes("cloud")) return "☁️";
    if (lower.includes("rain")) return "🌧️";
    if (lower.includes("snow")) return "❄️";
    if (lower.includes("thunder")) return "⛈️";
    if (lower.includes("mist") || lower.includes("fog")) return "🌫️";
    return "🌤️";
  };

  return <div style={{ fontSize: `${size}px` }}>{getIcon()}</div>;
};

// Wind Direction Arrow Component
const WindDirection = ({ degrees, size = 24 }) => {
  const getDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        marginTop: "8px",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{
          transform: `rotate(${degrees}deg)`,
          transition: "transform 0.3s",
        }}
      >
        <path
          d="M12 2 L12 22 M12 2 L8 6 M12 2 L16 6"
          stroke="#ffd700"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span
        style={{
          fontSize: "12px",
          fontWeight: "600",
          color: "#ffd700",
          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
        }}
      >
        {getDirection(degrees)}
      </span>
    </div>
  );
};

// DateTime Display Component
const DateTime = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return `${days[date.getDay()]}, ${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <div
        style={{
          fontSize: "14px",
          color: "rgba(255, 255, 255, 0.8)",
          marginBottom: "4px",
        }}
      >
        {formatDate(currentTime)}
      </div>
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#ffd700",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        {formatTime(currentTime)}
      </div>
    </div>
  );
};

// Dynamic Background Based on Weather
const getBackgroundImage = (condition) => {
  const backgrounds = {
    Clear:
      "https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=1920&h=1080&fit=crop",
    Clouds:
      "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&h=1080&fit=crop",
    Rain: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1920&h=1080&fit=crop",
    Drizzle:
      "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1920&h=1080&fit=crop",
    Snow: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1920&h=1080&fit=crop",
    Thunderstorm:
      "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1920&h=1080&fit=crop",
    Mist: "https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1920&h=1080&fit=crop",
    Fog: "https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1920&h=1080&fit=crop",
    Haze: "https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1920&h=1080&fit=crop",
  };

  return backgrounds[condition] || backgrounds.Clear;
};

function App() {
  const [city, setCity] = useState("Stockholm");
  const [searchInput, setSearchInput] = useState("");

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // IMPORTANT: Replace with YOUR actual API key!
  const API_KEY = "a0653a8fbe672e53e63333f4017a799b";

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found - Using demo data");
      }

      const data = await response.json();
      setWeather(data);
      setCity(cityName);
      console.log("Weather data:", data);
    } catch (err) {
      setError(err.message);
      // Demo/fallback data so you can see the app working
      setWeather({
        name: cityName,
        sys: { country: "SE" },
        weather: [{ main: "Clear", description: "clear sky" }],
        main: { temp: 22, feels_like: 20, humidity: 65, pressure: 1013 },
        wind: { speed: 3.5, deg: 180 },
        rain: null, // ← Rain data
        snow: null, // ← Snow data
      });
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
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
      background: "rgba(0, 0, 0, 0.5)", // ← Darker (was 0.3)
      zIndex: 0,
    },
    card: {
      background: "rgba(255, 255, 255, 0.15)", // ← Much more transparent!
      borderRadius: "20px",
      padding: "40px",
      maxWidth: "450px",
      width: "100%",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      backdropFilter: "blur(20px)", // ← Strong blur effect!
      WebkitBackdropFilter: "blur(20px)", // ← Safari support
      border: "1px solid rgba(255, 255, 255, 0.3)", // ← Subtle border
      position: "relative",
      zIndex: 1,
    },
    searchContainer: {
      display: "flex",
      gap: "10px",
      marginBottom: "30px",
    },
    input: {
      flex: 1,
      padding: "12px 20px",
      border: "2px solid #e0e0e0",
      borderRadius: "10px",
      fontSize: "14px",
      outline: "none",
      fontFamily: "inherit",
    },
    searchButton: {
      padding: "12px 20px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "transform 0.2s",
    },
    weatherInfo: {
      textAlign: "center",
    },
    cityName: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#fff", // ← White instead of dark
      marginBottom: "10px",
      textShadow: "2px 2px 4px rgba(0,0,0,0.5)", // ← Text shadow for readability
    },
    temperature: {
      fontSize: "72px",
      fontWeight: "bold",
      color: "#fff", // ← White
      margin: "20px 0",
      textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
    },
    description: {
      fontSize: "18px",
      color: "#fff", // ← White
      textTransform: "capitalize",
      marginBottom: "30px",
      textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
    },
    loading: {
      textAlign: "center",
      fontSize: "18px",
      color: "#666",
    },
    error: {
      textAlign: "center",
      fontSize: "16px",
      color: "#e74c3c",
      marginBottom: "20px",
    },
    // ADD THESE NEW STYLES BELOW:
    details: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginTop: "30px",
    },
    detailBox: {
      background: "rgba(255, 255, 255, 0.2)", // ← More transparent
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      backdropFilter: "blur(10px)", // ← Blur
      WebkitBackdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },
    detailLabel: {
      fontSize: "12px",
      color: "rgba(255, 255, 255, 0.8)", // ← Light white
      textTransform: "uppercase",
      marginBottom: "5px",
      fontWeight: "500",
    },
    detailValue: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#fff", // ← White
      textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.card}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search city..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.searchButton}>
            <SearchIcon />
          </button>
        </div>

        <DateTime />

        {loading && <div style={styles.loading}>Loading...</div>}

        {error && <div style={styles.error}>❌ {error}</div>}

        {weather && !loading && (
          <div style={styles.weatherInfo}>
            <WeatherIcon condition={weather.weather[0].main} size={80} />

            <h1 style={styles.cityName}>
              {weather.name}, {weather.sys.country}
            </h1>

            <div style={styles.temperature}>
              {Math.round(weather.main.temp)}°C
            </div>

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
                    color: weather.rain
                      ? "#ffd700"
                      : weather.snow
                      ? "#ffd700"
                      : "#ffd700",
                    marginTop: "4px",
                    fontWeight: "600",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  }}
                >
                  {weather.rain
                    ? "🌧️ Rain"
                    : weather.snow
                    ? "❄️ Snow"
                    : "☀️ None"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
