import React, {useEffect, useState} from 'react';

import './Weather.scss';

const API_KEY = '258a24a9f2fa82cf4f8105fa9d167dce';
const API_MAP = {
    'Clouds': 'cloudy',
    'Snow': 'snowy',
    'Rain': 'rainy',
    'Drizzle': 'rainy',
    'Thunderstorm': 'stormy',
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
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=${API_KEY}`)
            .then(rsp => {
                rsp.json().then(data => setWeather(data))
            })
    };
    const stJoeFetch = () => {
        console.log('weather st joe');
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=64506,us&APPID=${API_KEY}`)
            .then(rsp => {
                rsp.json().then(data => setWeather(data))
            })
    };

    if(!weather || !weather.weather){
        return null;
    }

    let weatherMap = API_MAP[weather.weather[0].main] || weather.weather[0].main;
    if (weatherMap === 'Clear') {
        const time = new Date().getHours();
        weatherMap = time < 8 || time > 20 ? 'starry' : 'sunny';
    }

    return (
        <div className="weather">
            <div className={weatherMap || 'sunny'} />
        </div>
    );
};

export default Weather;
