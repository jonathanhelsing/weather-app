import { WEATHER_BACKGROUNDS } from "../data/constants";

export const getBackgroundImage = (condition) => {
  return WEATHER_BACKGROUNDS[condition] || WEATHER_BACKGROUNDS.Clear;
};
