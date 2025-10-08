import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
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

export default DateTime;
