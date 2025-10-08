import React from "react";

export const SearchIcon = ({ size = 20, color = "#fff" }) => (
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

export const WeatherIcon = ({ condition, size = 64 }) => {
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

export const WindDirection = ({ degrees, size = 24 }) => {
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
