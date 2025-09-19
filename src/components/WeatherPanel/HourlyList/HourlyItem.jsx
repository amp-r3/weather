import getTime from '../../../utils/getTime';
import { icons, images } from '../../../assets/image';
import s from './hourlyList.module.scss';

const HourlyItem = ({ hour }) => {
    const iconNum = parseInt(hour.weather[0].icon);
    return (
        <div className={s.hourlyItem}>
            <p className={s.time}>{getTime(hour.dt, 'hours')}:00</p>
            <img className={s.icon} src={icons[iconNum]} alt={hour.weather[0].description} />
            <p className={s.temp}>{Math.round(hour.temp)}°</p>
            {hour.pop > 0 && (
                <div className={s.popContainer}>
                    <img src={images.precipitation} alt="precipitation" />
                    <p className={s.pop}>{Math.round(hour.pop * 100)}%</p>
                </div>
            )}
        </div>
    );
};

export default HourlyItem;