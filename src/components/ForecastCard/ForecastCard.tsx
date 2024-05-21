import { useState } from "react";

import { ForecastDayHour } from "../../utils/types";

import "./ForecastCard.css";

interface ForecastProps {
  
  day: string | null;
  hours: ForecastDayHour[];
}

function ForecastCard(props: ForecastProps) {
const { day, hours} = props;

const dayOfMonth: number | undefined = day? 
new Date(day).getDate(): undefined;
const monthName: string | undefined = day? 
new Date(day).toLocaleString('default', { month: 'long' }): undefined;// ? ?
const year: number | undefined = day? 
new Date(day).getFullYear(): undefined;

  const [isOpen, setOpen] = useState(false);
  return(
      <div className='foreCast__card'>

        <button className="foreCast__button" onClick={() => setOpen(!isOpen)}>
          <div>{dayOfMonth}</div>
          <div>{monthName}</div>
          <div>{year}</div>
        </button>

        <div className={`${isOpen} ? "dropdown-active" : "dropdown"}`}>
          {hours.map((hourItem) => (
          
            <ul className="dropdown__list">
              <li className="dropdown__item">
                <span>
                  <div>{`${hourItem.hour}:00`}</div>
                  <div><span>{hourItem.temp.toFixed(0)}&deg;C</span></div>
                </span>
              </li>
            </ul>
        
          ))}
        </div>
      </div>  
  )
}


export default ForecastCard
