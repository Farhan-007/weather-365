const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('.locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');
const divList = document.querySelector('.cities');
const closeBtn = document.querySelector('#close');

//default city when the page loads
let cityInput = "Satna";

//add click event for cities
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = '0';
    });
})

form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in a city name');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
    return weekday[new Date(`${day}` / `${month}` / `${year}`).getDay()];
};

console.log(cities);

function fetchWeatherData() {

    fetch(`https://api.weatherbit.io/v2.0/current?city=${cityInput}&key=a1f826d098eb4f92a3695693af14ecf1`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            temp.innerHTML = response.data[0].temp + "&#176;";
            conditionOutput.innerHTML = response.data[0].weather.description;

            const date = response.data[0].ob_time;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = response.data[0].city_name;

            const iconId = response.data[0].weather.icon + `.png`;
            icon.src = "./icons2/" + iconId;

            cloudOutput.innerHTML = response.data[0].clouds + `%`;
            humidityOutput.innerHTML = parseInt(response.data[0].rh) + `%`;
            windOutput.innerHTML = parseInt(response.data[0].wind_spd * 3600 / 1000) + `km/h`;

            let timeOfDay = "day";
            const code = response.data[0].weather.code;

            if (response.data[0].pod != `d`) {
                timeOfDay = "night";
                console.log(code);
            }

            if (code == 800) {
                app.style.backgroundImage = `url(./photos/${timeOfDay}/clear.jpg)`;
                btn.style.background = "#e5ba92";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            }

            else if (
                code == 700 ||
                code == 711 ||
                code == 721 ||
                code == 731 ||
                code == 741 ||
                code == 751 ||
                code == 801 ||
                code == 802 ||
                code == 803 ||
                code == 804 ||
                code == 900
            ) {
                app.style.backgroundImage = `url(./photos/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = "#fa6d1b";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            }

            else if (
                code == 200 ||
                code == 201 ||
                code == 202 ||
                code == 230 ||
                code == 231 ||
                code == 232 ||
                code == 233 ||
                code == 300 ||
                code == 301 ||
                code == 302 ||
                code == 500 ||
                code == 501 ||
                code == 502 ||
                code == 511 ||
                code == 520 ||
                code == 521 ||
                code == 522
            ) {
                app.style.backgroundImage = `url(./photos/${timeOfDay}/rainy.jpg)`;
                btn.style.background = "#647d75";
                if (timeOfDay == "night") {
                    btn.style.background = "325c80";
                }
            } else {
                app.style.backgroundImage = `url(./photos/${timeOfDay}/snowy.jpg)`;
                btn.style.background = "#4d72aa";
                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                }
            }

            app.style.opacity = "1";

        })

        .catch(() => {
            alert('City not found, please try again');
            app.style.opacity = "1";
        })
        .catch(err => console.error(err));
}

fetchWeatherData();

app.style.opacity = "1";
