import { useSelector } from 'react-redux'
import { icons, images } from '../../assets/image'
import s from './current.module.scss'
import getWindDirection from '../../utils/getWindDirection'
import getTime from '../../utils/getTime'

const Current = () => {
    const { current, name } = useSelector((state) => state.weather.weather)
    const iconNum = parseInt(current.weather[0].icon)
    return (
        <div className={s.current}>
            <div className={s.current__info}>
                <p className={s.current__deg}>{Math.round(current.temp)}°</p>
                <p className={s.current__day}>Сегодня</p>
                <p className={s.current__time}>
                    Время: {getTime(current.dt, 'hours')}:{getTime(current.dt, 'min')}
                    </p>
                <p className={s.current__city}>Город: {name}</p>
                <img src={icons[iconNum]} alt="" className={s.current__img} />
            </div>
            <div className={s.current__content}>
                <div className={s.current__icon}>
                    <img src={images.temp} alt="" />
                </div>
                <p className={s.current__name}>Температура</p>
                <p className={s.current__desc}>{Math.round(current.temp)}° - ощущается как {Math.round(current.feels_like)}°</p>
                <div className={s.current__icon}>
                    <img src={images.pressure} alt="" />
                </div>
                <p className={s.current__name}>Давление</p>
                <p className={s.current__desc}>{current.pressure} мм ртутного столба</p>
                <div className={s.current__icon}>
                    <img src={images.precipitation} alt="" />
                </div>
                <p className={s.current__name}>Осадки</p>
                {
                    current.rain ?
                        <p className={s.current__desc}>Дождь - {current.rain['1h']} мм/ч</p> :
                        current.snow ?
                            <p className={s.current__desc}>Снег - {current.snow['1h']} мм/ч</p> :
                            <p className={s.current__desc}>Без осадков</p>
                }
                <div className={s.current__icon}>
                    <img src={images.wind} alt="" />
                </div>
                <p className={s.current__name}>Ветер</p>
                <p className={s.current__desc}>
                    {current.wind_speed} м/с {getWindDirection(current.wind_deg)} -
                    {
                        current.wind_gust ?
                            <span> порыв ветра: {current.wind_gust} м/сек</span> : <span> лекгий ветер</span>
                    }
                </p>
            </div>
        </div>
    )
}

export default Current