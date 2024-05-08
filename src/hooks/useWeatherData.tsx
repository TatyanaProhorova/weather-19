import {useState} from "react";
// import webpack  from  "webpack";  // доустановили
// import dotenv from "dotenv";      // пакеты   "webpack": "^5.91.0",
// "webpack-cli": "^5.1.4" 


// module.exports = () => {
//   // dotenv вернет объект с полем parsed 
//   const env = dotenv.config().parsed;
  
//   сделаем reduce, чтобы сделать объект
//   const envKeys = Object.keys(env).reduce((prev, next) => {
//     prev[`process.env.${next}`] = JSON.stringify(env[next]);
//     return prev;
//   }, {});

//   return {
//     plugins: [
//       new webpack.DefinePlugin(envKeys)
//     ]
//   };
// }
const API_KEY = "aa31822992d867d5cdbc0d5461abd90a";

// const API_KEY = process.env.REACT_APP_API_KEY;

//была ошибка useWeatherData.tsx:5 Uncaught ReferenceError: process is not defined,
// ввели `npm i --save-dev @types/node` - не помогло
// This solved it for me let process = {} adding that to one of my root files- не помогло.

interface WeatherData {
    coord: {
        lon: number;
        lat: number;
    },

    weather: [
        {
            id: number;
            main: string;
            description: string;
            icon: string
        }
    ],

    base: string;

    main: {
        temp: number; // текущая температура
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    },

    visibility: number;

    wind: {
        speed: number;
        deg: number;
    },

    timezone: number;
    id: number;
    name: string; // название города
    cod: number; // код города
}

const useWeatherData = () => {

    const [data, setData] = useState<WeatherData | null>(null);
    const [isLoading, setLoading] = useState(false);

    const fetchData = () => {
        setLoading(true);
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&appid=${API_KEY}`
        )
            .then(res => res.json())
            .then(responseData => {
                setData(responseData);
            })
            .finally(() => {
            setLoading(false);
        });
    }
    return { data, isLoading, fetchData };
};

export default useWeatherData;
