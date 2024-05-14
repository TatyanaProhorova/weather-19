import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import useWeatherData from "./hooks/useWeatherData";
import './App.css';
import ForecastCard from './components/ForecastCard';

function App() {
  const { data, forecast, isLoading, fetchData } = useWeatherData(); // вызвали польз хук;

  const [cityName, setCityName] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {     //  event:FormEvent
    event.preventDefault();
    fetchData({ name: cityName });
    setCityName('');
    // console.dir(evt.target);
  }

  const handleChangeCityName = (event: ChangeEvent<HTMLInputElement>) => {
      setCityName(event.target.value);
  }

  useEffect(() => {
    fetchData({});   
  }, []);

  // interface Item {                   
  //     dt_txt: string;
  //     main: {
  //         feels_like: number;
  //         temp: number;
  //     }
  // } 
  // const list: Array<{Item}> 

  // const list: Array<{Item}>

 const getItems = (itemOfList_0: Array<{                       
    dt_txt: string;
    main: {
      feels_like: number;
      temp: number;
    }}> | undefined) => {
      itemOfList_0 = forecast?.list[0];
      console.log(forecast?.list[0]);
    }
 
  // const days = []; days[0] = itemOflist?[8]; days[1] = itemOflist?[16];  ///!!!!!!!!!!!!!!!!!!!!!!!!!
  // console.log('itemOfList --',itemOfList_0); 
  // console.log('days', days);   

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
                  <span>Thursday</span><span>month_and_day</span><span>2024</span>
                  {/* <span>{day_of_week}  </span><span>{month_and_day}  </span><span>{year}</span> */}
                </div>

                <div>сегодня {forecast?.list[0].dt_txt}</div>

                <div className='temp'>
                  <span>{data?.main?.temp.toFixed(1)}</span><span>&deg;C</span>
                </div>
                          
                <div className='forecast'>
                  <div>
                    <span>прогноз погоды на 3 дня</span>

                    </div> 
                  <div>                
                    <ForecastCard day={forecast?.list[8].dt_txt} temp={forecast?.list[8].main.temp}/>  
                    <ForecastCard day={forecast?.list[16].dt_txt} temp={forecast?.list[16].main.temp}/>
                    <ForecastCard day={forecast?.list[24].dt_txt} temp={forecast?.list[24].main.temp}/>
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


                      {/* {days.map((day, index) => {
                        return(
                          <p key={index}>{day.dt_txt}</p>
                        )})} */}