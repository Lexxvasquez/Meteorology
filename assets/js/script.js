let store;
const apiKey = "c002c8f1af7ca0796ef27ced7f8c12e0";
const currentWeatherContainer = document.querySelector('#current')
const getHistory = async () => {
  store = (await localStorage.history) ? JSON.parse(localStorage.history) : [];

  history.innerHTML = "";
  store.forEach((city) => {
    history.innerHTML += `<button onclick="weatherAgain()">${city}</button>`;
  });
};

getHistory();

const searchCity = async () => {
  let city = document.querySelector('#cityName').value;
  if (!city) return;
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  // let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}$units=imperial&appid=${apiKey}`;
  // let url2 = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}units=imperial&q=${city}`;

  // let currentWeather = await (await fetch(url1)).json();
  let data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  );
  let weather = await data.json();

  // let forecastWeather = await (await fetch(url2)).json();

  if (!store.includes(city)) {
    store.push(city);
    localStorage.history = JSON.stringify(store);
    getHistory();
  }

  console.log(weather);
  const cityEl = document.createElement('h1')
  cityEl.textContent = weather.name
  currentWeatherContainer.append(cityEl)
};

searchCity();
