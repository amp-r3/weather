import HourlyItem from './HourlyItem';
import s from './hourlyList.module.scss';

const HourlyList = ({ hourly, timezoneOffset }) => {
  const next24Hours = hourly.slice(0, 24);

  return (
    <div className={s.hourlyList}>
      <h3 className={s.title}>Прогноз по часам</h3>
      <div className={s.scrollContainer}>
        {next24Hours.map((hour) => (
          <HourlyItem key={hour.dt} hour={hour} timezoneOffset={timezoneOffset} />
        ))}
      </div>
    </div>
  );
};

export default HourlyList;