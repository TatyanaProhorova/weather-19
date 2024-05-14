interface ForecastProps {
  day: string | null;
  t: number | null;
}

function ForecastCard(props: ForecastProps) {  

const { day='Пятница', temp} = props;
  return(
    <>
      <div className='card'>
        <div>{day}</div>
        <div><span>{temp?.toFixed(1)}</span><span>&deg;C</span></div>
      </div>
    </>
  )
}

export default ForecastCard
