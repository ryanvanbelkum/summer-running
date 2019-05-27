import React, {useEffect, useState} from 'react';

import './Weather.scss';

const API_KEY = '258a24a9f2fa82cf4f8105fa9d167dce';
const API_MAP = {
    'Clouds': 'cloudy',
    'Snow': 'snowy',
    'Rain': 'rainy',
    'Drizzle': 'rainy',
    'Thunderstorm': 'stormy',
    'Clear': 'clear',
    'Mist': 'rainy',
};

const Weather = () => {
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geoFetch, stJoeFetch);
        }else {
            stJoeFetch();
        }
    }, []);
    const geoFetch = position => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=${API_KEY}`)
            .then(rsp => {
                rsp.json().then(data => setWeather(data))
            })
    };
    const stJoeFetch = () => {
        console.log('weather st joe');
        fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=64506,us&APPID=${API_KEY}`)
            .then(rsp => {
                rsp.json().then(data => setWeather(data))
            })
    };

    if(!weather || !weather.weather){
        return null;
    }

    let weatherMap = API_MAP[weather.weather[0].main];
    if (weatherMap === 'clear') {
        const time = new Date().getHours();
        weatherMap = time < 6 || time > 21 ? 'starry' : 'sunny';
    }

    return (
        <div className="weather">
            <div className={weatherMap || 'sunny'} />
            <strong className="weather__temp">{parseInt(weather.main.temp)}&deg;</strong>
        </div>
    );
};

export default Weather;
