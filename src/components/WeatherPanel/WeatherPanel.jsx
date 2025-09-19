import { useSelector } from 'react-redux';
import NowCard from './NowCard/NowCard';
import s from './weatherPanel.module.scss';
import DetailsCard from './DetailsCard/DetailsCard';
import HourlyList from './HourlyList/HourlyList';

const WeatherPanel = () => {

    const { daily, name, current, hourly } = useSelector((state) => state.weather.weather);
    
  return (
    <section className={s.weatherPanel}> 
        <div className={s.leftColumn}>
          <NowCard daily={daily} name={name} current={current}/>
          <HourlyList hourly={hourly}/>
        </div>
        <DetailsCard daily={daily}/>
    </section>
  )
}

export default WeatherPanel;