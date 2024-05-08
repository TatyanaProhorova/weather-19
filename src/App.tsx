import { useState } from 'react';
import {useEffect} from 'react';
import useWeatherData from "./hooks/useWeatherData";
import './App.css';
import ForecastCard from './components/ForecastCard';


// 1. Создали хук useWeatherData для получения данных о погоде с API
// 2. Описали интерфейс данных с бэкенда
// 3. И немного соединили с версткой

function App() {
  const { data, isLoading, fetchData } = useWeatherData(); // вызвали польз хук;

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.dir(evt.target);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="info_panel">
        <form name="myForm" onSubmit={handleSubmit}>
        <input type="text" className="input_field"  placeholder="enter city name" />
                      
        <input type="button" value="=>" form="myForm"></input>
        </form>

        {isLoading ? (
            <div>Загрузка...</div>
        ) : (
          <>
            <div className='city_name'>
              {data?.name}
            </div>
                  
            <div className="current_date">
              <span>Thursday</span><span>month_and_day</span><span>2024</span>
              {/* <span>{day_of_week}  </span><span>{month_and_day}  </span><span>{year}</span> */}
            </div>

            <div className='temp'>
              <span>{data?.main?.temp}</span><span>&deg;C</span>
            </div>
            
            <div className='forecast'>
              <div>
                <span>5-day forecast</span>
                {/*  здесь д.б. массив всего прогноза и map??? для 5 компоннтов */}
                  
              </div>
              <div>
                  <ForecastCard />
                  <ForecastCard />
                  <ForecastCard />
                  <ForecastCard />
                  <ForecastCard />              
              </div>
            </div>
          </>
        )}

      </div>  
    </>
  )
}

export default App
