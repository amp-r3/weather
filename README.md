# My Weather - React Weather Application

"My Weather" is a clean, modern, and responsive weather forecast application built with React and Vite. It provides users with real-time weather data based on their current location or a city search. The application leverages Redux Toolkit for robust state management and integrates multiple third-party APIs for accurate geolocation and weather data.


## Features

* **Automatic Geolocation:** On load, the app attempts to get the user's precise location using the browser's Geolocation API.
* **IP-Based Fallback:** If browser geolocation fails or is denied, the app automatically falls back to an IP-based geolocation service (`ipapi.co`) to provide relevant weather.
* **City Search:** Users can enter any city name in the navigation bar to fetch and display weather data for that location.
* **Comprehensive Data:** The app displays:
    * **Current Weather:** Temperature, "feels like," weather description, and city name.
    * **Hourly Forecast:** A sliding panel showing the forecast for the next several hours.
    * **7-Day Forecast:** A collapsible section showing the daily forecast for the upcoming week.
    * **Detailed Metrics:** A "Details" card showing humidity, pressure, wind speed, sunrise/sunset times, and UV index.
* **Dark/Light Mode:** Includes a theme toggler that respects user preference by saving the choice (`light` or `dark`) to `localStorage` via a custom React hook.
* **Client-Side Caching:** Implements a 60-second cache in `localStorage` for coordinate-based weather lookups to reduce redundant API calls and improve performance.
* **Asynchronous State Management:** Uses Redux Thunks to handle all asynchronous API calls, complete with loading and error states for a smooth user experience.

## Tech Stack

This project is built using a modern frontend stack:

* **Core:** React 19, Vite
* **State Management:** Redux Toolkit, React-Redux
* **Data Fetching:** Axios
* **Styling:** Sass (SCSS), Material-UI
* **Linting:** ESLint

### External APIs

* **OpenWeatherMap:** Used for both geocoding (city to coordinates) and fetching all weather data (One Call API).
* **Geoapify:** Used for reverse geocoding (coordinates to city name).
* **ipapi.co:** Used for IP-based geolocation as a fallback.

## How It Works

1.  **Location:** `App.jsx` first dispatches `getLocationByBrowser()`.
2.  **Fallback:** If it fails, it dispatches `getLocation()` (IP-based).
3.  **Weather Fetching:**
    * If `lat` and `lon` are present in the state, `getWeatherByCoords()` is dispatched. This thunk checks the cache before fetching.
    * If only a `city` is present (from IP fallback), `getLanLon()` is dispatched to first get coordinates, which then triggers a weather fetch.
4.  **State Update:** The `weather` slice in Redux is updated with the API response, and the UI re-renders to display the data, hide the loader, or show an error message.
