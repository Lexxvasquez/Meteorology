let store;

const getHistory = async () => {
  store = (await localStorage.history) ? JSON.parse(localStorage.history) : [];

  history.innerHTML = "";
  store.forEach((city) => {
    history.innerHTML += `<button onclick="weatherAgain()">${city}</button>`;
  });
};

getHistory();

const searchCity = async () => {
  let city = document.querySelector("input").value;
  if (!city) return;

  let url1 = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}units=imperial&q=${city}`;
  let url2 = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}units=imperial&q=${city}`;

  let currentWeather = await (await fetch(url1)).json();
  let forecastWeather = await (await fetch(url2)).json();

  if (!store.includes(city)) {
    store.push(city);
    localStorage.history = JSON.stringify(store);
    getHistory();
  }

  console.log(currentWeather, forecastWeather);
};
