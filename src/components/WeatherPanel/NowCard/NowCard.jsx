import s from './nowCard.module.scss';
import getTime from '../../../utils/getTime';
import { icons } from '../../../assets/image';

const NowCard = ({ daily, name, current, timezoneOffset}) => {
    const today = daily[0];
    const iconNum = parseInt(today.weather[0].icon); 

    return (
        <div className={s.nowCard}>
            {/* Верхний ряд с температурой и иконкой */}
            <div className={s.topRow}>
                <div className={s.tempWrapper}>
                    <p className={s.degree}>{Math.round(today.temp.day)}°</p>
                    <p className={s.day}>Сегодня</p>
                </div>
                <div className={s.weatherIconWrapper}>
                    <img src={icons[iconNum]} alt="weather icon" className={s.weatherIcon} />
                </div>
            </div>

            {/* Нижняя часть с временем и городом */}
            <div className={s.bottomInfo}>
                 <p className={s.time}>
                    Время: {getTime(current.dt, timezoneOffset, 'hours')}:{getTime(current.dt, timezoneOffset, 'min')}
                </p>
                <p className={s.city}>Город: {name}</p>
            </div>
        </div>
    );
};

export default NowCard;