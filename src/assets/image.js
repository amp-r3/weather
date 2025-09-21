// --- Импорт иконок для интерфейса ---
import logo from './img/icons/logo.png';
import city from './img/icons/city.png';
import temp from './img/icons/temp.png';
import pressure from './img/icons/pressure.png';
import precipitation from './img/icons/precipitation.png';
import wind from './img/icons/wind.png';
import humidity from './img/icons/humidity.png';
import uvi from './img/icons/uvi.png';
import sunrise from './img/icons/sunrise.png';

// --- Импорт иконок погоды ---
import sun from './img/images/sun.png'; // 01d
import moon from './img/images/moon.png'; // 01n
import fewClouds from './img/images/fewClouds.png'; // 02d
import fewCloudsN from './img/images/fewCloudsN.png'; // 02n
import mainlyCloudy from './img/images/mainlyCloudy.png'; // 03d & 04d (рассеянные и разорванные облака)
import mainlyCloudyN from './img/images/mainlyCloudyN.png'; // 03n & 04n
import smallRainSun from './img/images/smallRainSun.png'; // 10d
import smallRain from './img/images/smallRain.png'; // 10n (предположительно, лучше создать отдельную иконку с луной)
import rain from './img/images/rain.png'; // 09d
import rainN from './img/images/rainN.png'; // 09n
import storm from './img/images/storm.png'; // 11d
import stormN from './img/images/stormN.png'; // 11n
import snow from './img/images/snow.png'; // 13d
import snowN from './img/images/snowN.png'; // 13n
import mist from './img/images/mist.png'; // 50d
import mistN from './img/images/mistN.png'; // 50n

// --- Экспорт UI иконок ---
export const uiIcons = {
  logo,
  city,
  temp,
  pressure,
  precipitation,
  wind,
  humidity,
  uvi,
  sunrise,
};

export const weatherIcons = {
  '01d': sun,
  '01n': moon,
  '02d': fewClouds,
  '02n': fewCloudsN,
  '03d': mainlyCloudy,
  '03n': mainlyCloudyN,
  '04d': mainlyCloudy,
  '04n': mainlyCloudyN,
  '09d': rain,
  '09n': rainN,
  '10d': smallRainSun,
  '10n': smallRain,
  '11d': storm,
  '11n': stormN,
  '13d': snow,
  '13n': snowN,
  '50d': mist,
  '50n': mistN,
};