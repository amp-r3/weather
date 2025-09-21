import { useSelector } from 'react-redux';
import NowCard from './NowCard/NowCard';
import s from './weatherPanel.module.scss';
import DetailsCard from './DetailsCard/DetailsCard';
import HourlyList from './HourlyList/HourlyList';

const WeatherPanel = () => {

    const { daily, name, current, hourly, timezone_offset } = useSelector((state) => state.weather.weather);

  return (
    <section className={s.weatherPanel}> 
        <div className={s.leftColumn}>
          <NowCard name={name} current={current} timezoneOffset={timezone_offset} hourly={hourly}/>
          <HourlyList hourly={hourly} timezoneOffset={timezone_offset}/>
        </div>
        <DetailsCard daily={daily} timezoneOffset={timezone_offset}/>
    </section>
  )
}

export default WeatherPanel;