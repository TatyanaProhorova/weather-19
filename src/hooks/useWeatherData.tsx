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
            icon: string;
        }
    ],
    //base: string; // ???????????????????????
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

interface FetchDataProps {
    name?: string;
}

// https://api.openweathermap.org/data/3.0/  
// onecall?lat={lat}&lon={lon}&exclude=hourly,daily,alerts&appid={API key}
interface ForecastData {
     
    // lon: number;
    // lat: number;
    // "timezone":"America/Chicago",
    // "timezone_offset":-18000,
    // current:{
    //     temp: number;
    //     // feels_like: number;
    //     // pressure: number;
    //     // humidity: number;

    //     visibility: number;
    //     wind_speed: number;
    //     wind_deg: number;
    //     weather:[
            // {
            //     id:number;
            // // "main":"Clouds",
            //     main: string;
            // // "description":"broken clouds",
            //     description: string,
            //     // "icon":"04d"  ????????????????????????????????
            // }

    city: {
        coord:{
            country: string; 
            id: number;
            name: string;
        }
    },

    list: [    
            { 
            dt_txt: string;
            main: {
                feels_like: number;
                humidity: number;
                pressure: number;
                temp: number;
                temp_kf: number;
                temp_max: number;
                temp_min: number;
            };
            // wind_speed: number;
            // wind_deg: number;
            // weather: [
            //     {
            //         id: number;
            //         main: string;
            //         icon: string;
            //     }
            // ];
        }] 

}

const useWeatherData = () => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [forecast, setForecast] = useState<ForecastData | null>(null);
    const [isLoading, setLoading] = useState(false);


    // запрос за текущими данными

    // const fetchData = ({ name = 'London' }: FetchDataProps) => {

    const fetchData = ({ name = 'Moscow' }: FetchDataProps) => {
        setLoading(true);
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${API_KEY}`
        )
            .then(res => res.json())
            .then((responseData: WeatherData) => {
                setData(responseData);
                fetchForecast(responseData.coord.lat, responseData.coord.lon);
            }).finally(() => {
            setLoading(false);
        });
    }
    // запрос за прогнозом на 5 дней
    const fetchForecast = (lat: number, lon: number) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        )
            .then(res => res.json()) // about https://developer.mozilla.org/en-US/docs/Web/API/Response/json
            .then((forecastResponseData: ForecastData) => {
                setForecast(forecastResponseData);
            })
    }

    return { data, forecast, isLoading, fetchData };
};
export default useWeatherData;
