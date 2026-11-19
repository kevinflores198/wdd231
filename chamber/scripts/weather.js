
const API_KEY = "862654860370d36f0b901e6b09a2ba83";

const LATITUDE = -34.6037;
const LONGITUDE = -58.3816;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const QUERY = `lat=${LATITUDE}&lon=${LONGITUDE}&units=metric&appid=${API_KEY}`;

const weatherMessage = document.getElementById("weather-message");
const currentWeather = document.getElementById("current-weather");
const forecastList = document.getElementById("forecast");

async function fetchJson(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`The weather request failed (status ${response.status}).`);
    }

    return response.json();
}

function capitalize(text) {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

function getDayKey(unixSeconds, timezoneOffset) {
    return new Date((unixSeconds + timezoneOffset) * 1000).toISOString().slice(0, 10);
}

function getThreeDayForecast(forecast) {
    const { list, city } = forecast;
    const todayKey = getDayKey(Math.floor(Date.now() / 1000), city.timezone);
    const temperaturesByDay = {};

    list.forEach((entry) => {
        const dayKey = getDayKey(entry.dt, city.timezone);

        if (dayKey !== todayKey) {
            temperaturesByDay[dayKey] = temperaturesByDay[dayKey] || [];
            temperaturesByDay[dayKey].push(entry.main.temp);
        }
    });

    return Object.entries(temperaturesByDay).slice(0, 3).map(([dayKey, temperatures]) => ({
        dayKey,
        high: Math.round(Math.max(...temperatures)),
        low: Math.round(Math.min(...temperatures))
    }));
}

function showCurrentWeather(current) {
    const { description, icon } = current.weather[0];

    currentWeather.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="" width="100" height="100">
        <div>
            <p class="current-temp">${Math.round(current.main.temp)}&deg;C</p>
            <p>${capitalize(description)}</p>
        </div>
    `;
}

function showForecast(days) {
    forecastList.innerHTML = days.map((day) => {
        const label = new Date(`${day.dayKey}T12:00:00Z`).toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
            timeZone: "UTC"
        });

        return `
            <li>
                <strong>${label}</strong>
                High ${day.high}&deg;C / Low ${day.low}&deg;C
            </li>
        `;
    }).join("");
}

async function loadWeather() {
    try {
        if (API_KEY === "") {
            throw new Error("Missing OpenWeatherMap API key in weather.js.");
        }

        const [current, forecast] = await Promise.all([
            fetchJson(`${BASE_URL}/weather?${QUERY}`),
            fetchJson(`${BASE_URL}/forecast?${QUERY}`)
        ]);

        showCurrentWeather(current);
        showForecast(getThreeDayForecast(forecast));
    } catch (error) {
        weatherMessage.textContent = "Weather data is not available right now.";
        console.error(error);
    }
}

loadWeather();
