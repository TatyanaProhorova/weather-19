import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import useWeatherData from "./hooks/useWeatherData";
import './App.css';
import ForecastCard from './components/ForecastCard/ForecastCard';

function App() {
  const { data, forecast, isLoading, fetchData } = useWeatherData();

  // if (forecast) {
  // for (const i of forecast) forecast // Type 'ForecastDays' must have a '[Symbol.iterator]()' method that returns an iterator.

  // if (forecast) {
  //   const forecast3Days = forecast.filter((key) => {forecast[key].dt_txt !== forecast[0].dt_txt});
  // }

  const [cityName, setCityName] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {  
    event.preventDefault();
    fetchData({ name: cityName });
    setCityName('');

  }

  const currentDate = data ? new Date(data.dt * 1000).toDateString() : new Date().toDateString()

  const handleChangeCityName = (event: ChangeEvent<HTMLInputElement>) => {
      setCityName(event.target.value);
  }

  useEffect(() => {
    fetchData({});
  }, []);

  return (
    <>
      <div className="info_panel">
        <form name="myForm" onSubmit={handleSubmit}>
            <input type="text" value={cityName} onChange={handleChangeCityName}
            className="input_field"  placeholder="Введите название города" />
            <button type="submit">Поиск</button>
        </form>

        {isLoading ? (
            <div>Загрузка...</div>
        ) : (
              <>
                <div className='city_name'>
                  {data?.name}
                </div>

                <div className="current_date">
                  {currentDate && (
                    <div>сегодня {currentDate}</div>
                  )}
  
                </div>

                  

                <div className='temp'>
                  <span>{data?.main?.temp.toFixed(1)}</span><span>&deg;C</span>
                </div>

                <div className='forecast'>
                  <div>
                    <span>прогноз погоды</span>
                  </div>
                  <div className='forecast__daily'>

                    {forecast ? Object.keys(forecast).map((key) => {


                        return (
                            <ForecastCard day={forecast[key].dt_txt} hours={forecast[key].hours}/>
                        )
                    }) : (
                        <span>Данных о прогнозе погоды нет</span>
                    )}

                  </div>
                </div>
              </>
            )
        }
      </div>
    </>
  )
}

export default App
