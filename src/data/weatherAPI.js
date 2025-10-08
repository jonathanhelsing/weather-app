const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherByCity = async (cityName) => {
  const response = await fetch(
    `${API_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  return await response.json();
};

export const getDemoWeather = (cityName) => ({
  name: cityName,
  sys: { country: "SE" },
  weather: [{ main: "Clear", description: "clear sky" }],
  main: { temp: 22, feels_like: 20, humidity: 65, pressure: 1013 },
  wind: { speed: 3.5, deg: 180 },
  rain: null,
  snow: null,
});
