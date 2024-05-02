import { useState } from 'react'

import './App.css'
import MyWeatherComponent from './components/MyWeatherComponent'

function App() {

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log(evt.type);
    console.dir(evt.target);
  }

  return (
    <>
      {/* <MyWeatherComponent /> */}

      <div className="info_panel">

        <form name="myForm" onSubmit={handleSubmit}>
          <input type="text" className="input_field" placeholder="enter city name" name="location" />
          <input type="button" value="=>" form="myForm"></input>
        </form>   

        <div className='city_name'>
          city
        </div>
        
        
        <div className="current_date">
          <span>Thursday</span><span>month_and_day</span><span>2024</span>
          {/* <span>{day_of_week}  </span><span>{month_and_day}  </span><span>{year}</span> */}
        </div>

        <div className='temp'>
          <span>current_temperature</span><span>&deg;C</span>
        </div>
        
        <div className='forecast'>
          <div>
            <span>5-day forecast</span>
          </div>
          <div>
              <div className='card'>
                <div>day</div>
                <div><span>t</span><span>&deg;C</span></div>
              </div>
              <div className='card'>
                <div>day</div>
                <div><span>t</span><span>&deg;C</span></div>
              </div>
              <div className='card'>
                <div>day</div>
                <div><span>t</span><span>&deg;C</span></div>
              </div>
              <div className='card'>
                <div>day</div>
                <div><span>t</span><span>&deg;C</span></div>
              </div>
              <div className='card'>
                <div>day</div>
                <div><span>t</span><span>&deg;C</span></div>
              </div>
          </div>
        </div>
        
      
      </div>
    </>
  )
}

export default App


