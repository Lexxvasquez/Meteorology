let store;
const history = document.getElementById("history");
const forecast = document.getElementById("forecast");
const currentWeatherContainer = document.querySelector("#current");

const getHistory = async () => {
  store = (await localStorage.history) ? JSON.parse(localStorage.history) : [];

  history.innerHTML = "";
  store.forEach((city) => {
    console.log(city);
    history.innerHTML += `<button onclick="weatherAgain('${city}')">${city}</button>`;
  });
};

getHistory();

const searchCity = async () => {
  let city = document.querySelector("#cityName").value;
  if (!city) return;
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  let url1 = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial&q=${city}`;
  let url2 = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&units=imperial&q=${city}`;
}

let {
  name,
  dt,
  main: { temp, humidity },
  wind: { speed },
  weather: [{ icon }],
} = await (await fetch(url1)).json();

currentWeatherContainer.innerHTML = `
  <h1> ${name} (${new Date(
  dt * 1000
).toLocaleDateString()}) <img src="https://openweathermap.org/img/w/${icon}.png" /> </h1>
  <h3>Temp: ${temp} </h3>
  <h3>Humidity: ${humidity} </h3>
  <h3>Wind Speed: ${speed} </h3>
  `;

let { list } = await (await fetch(url2)).json();

forecast.innerHTML = "";

for (let i = 0; i < list.length; i = i + 8) {
  let {
    dt,
    main: { temp, humidity },
    wind: { speed },
    weather: [{ icon }],
  } = list[i];

  forecast.innerHTML += `
      <div class="card">
          <h3>${new Date(dt * 1000).toLocaleDateString()} </h3>
          <img src="https://openweathermap.org/img/w/${icon}.png" />
          <h5>Temp: ${temp}</h5>
          <h5>Humidity: ${humidity}</h5>
          <h5>Wind Speed: ${speed}</h5>
      </div>
    `;
}

console.log(list);

if (!store.includes(city)) {
  store.push(city);
  localStorage.history = JSON.stringify(store);
}

searchCity();

console.log(weather);
const cityEl = document.createElement('h1')
cityEl.textContent = weather.name
currentWeatherContainer.append(cityEl);
