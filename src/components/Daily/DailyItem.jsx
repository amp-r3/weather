import s from './daily.module.scss'
import { icons } from '../../assets/image'
import getTime from '../../utils/getTime'

const DailyItem = ({ day, index }) => {
  const iconNum = parseInt(day.weather[0].icon)
  return (
    <div className={s.daily__item}>
      <h3 className={s.daily__title}>{
        index == 0 ? 'Сегодня' :
        index == 1 ? 'Завтра' :
        getTime(day.dt, 'weekday')
        }</h3>
      <p className={s.daily__date}>
        {getTime(day.dt, 'day')} {getTime(day.dt, 'month')}
        </p>
      <img src={icons[iconNum]} alt="" className={s.daily__icon} />
      <p className={s.daily__day}>
        {Math.round(day.temp.day)}°
        </p>
      <p className={s.daily__night}>
        {Math.round(day.temp.night)}°
        </p>
      <p className={s.daily__desc}>{day.weather[0].description}</p>

    </div>
  )
}

export default DailyItem