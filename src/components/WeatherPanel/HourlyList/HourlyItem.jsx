import getTime from '../../../utils/getTime';
import { weatherIcons, uiIcons } from '../../../assets/image';
import s from './hourlyList.module.scss';

const HourlyItem = ({ hour, timezoneOffset }) => {
    const iconNum = hour.weather[0].icon;
    return (
        <div className={s.hourlyItem}>
            <p className={s.time}>{getTime(hour.dt, timezoneOffset, 'hours')}:00</p>
            <img className={s.icon} src={weatherIcons[iconNum]} alt={hour.weather[0].description} />
            <p className={s.temp}>{Math.round(hour.temp)}°</p>
            {hour.pop > 0 && (
                <div className={s.popContainer}>
                    <img className={s.popIcon} src={uiIcons.precipitation} alt="precipitation" />
                    <p className={s.pop}>{Math.round(hour.pop * 100)}%</p>
                </div>
            )}
        </div>
    );
};

export default HourlyItem;