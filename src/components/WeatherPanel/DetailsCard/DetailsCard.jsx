import getWindDirection from '../../../utils/getWindDirection';
import { getUviDescription } from '../../../utils/getUviDescriprion';
import getTime from '../../../utils/getTime';
import { uiIcons } from '../../../assets/image';
import s from './detailsCard.module.scss';

const DetailsCard = ({ daily, timezoneOffset }) => {
    const today = daily[0];
    return (
        <div className={s.detailsCard}>
            <div className={s.detailItem}>
                <div className={s.itemIcon}><img src={uiIcons.temp} alt="Temperature" /></div>
                <p className={s.itemName}>Температура</p>
                <p className={s.itemDesc}>{Math.round(today.temp.day)}° - ощущается как {Math.round(today.feels_like.day)}°</p>
            </div>

            <div className={s.detailItem}>
                <div className={s.itemIcon}><img src={uiIcons.pressure} alt="Pressure" /></div>
                <p className={s.itemName}>Давление</p>
                <p className={s.itemDesc}>{today.pressure} мм ртутного столба</p>
            </div>

            <div className={s.detailItem}>
                <div className={s.itemIcon}><img src={uiIcons.precipitation} alt="Precipitation" /></div>
                <p className={s.itemName}>Осадки</p>
                <p className={s.itemDesc}>
                    {today.pop > 0 ? `Вероятность ${today.pop * 100}%` : 'Без осадков'}
                </p>
            </div>

            <div className={s.detailItem}>
                <div className={s.itemIcon}><img src={uiIcons.wind} alt="Wind" /></div>
                <p className={s.itemName}>Ветер</p>
                <p className={s.itemDesc}>
                    {today.wind_speed} м/с {getWindDirection(today.wind_deg)}
                    {today.wind_gust && ` (порывы до ${Math.round(today.wind_gust)} м/с)`}
                </p>
            </div>

            <div className={s.detailItem}>
                <div className={s.itemIcon}><img src={uiIcons.humidity} alt="Humidity" /></div>
                <p className={s.itemName}>Влажность</p>
                <p className={s.itemDesc}>{today.humidity}%</p>
            </div>

            <div className={s.detailItem}>
                <div className={s.itemIcon}><img src={uiIcons.uvi} alt="UV Index" /></div>
                <p className={s.itemName}>УФ-индекс</p>
                <p className={s.itemDesc}>{today.uvi} ({getUviDescription(today.uvi)})</p>
            </div>

            <div className={s.detailItem}>
                <div className={s.itemIcon}><img src={uiIcons.sunrise} alt="Sunrise/Sunset" /></div>
                <p className={s.itemName}>Восход / Закат</p>
                <p className={s.itemDesc}>
                    {getTime(today.sunrise, timezoneOffset, 'hours')}:{getTime(today.sunrise, timezoneOffset, 'min')} / {getTime(today.sunset, timezoneOffset, 'hours')}:{getTime(today.sunset, timezoneOffset, 'min')}
                </p>
            </div>
        </div>
    );
};

export default DetailsCard;