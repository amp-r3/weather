import { useSelector } from 'react-redux'
import s from './daily.module.scss'
import DailyItem from './DailyItem'
import { useState } from 'react'

const Daily = () => {

    const [show, setShow] = useState(true)

    const { daily } = useSelector((state) => state.weather.weather)
    return (
        <div className={s.daily}>
            <div className={s.daily__nav}>
                <button onClick={()=>{setShow(true)}} className={`${s.daily__btn} ${ show ? s.active : ''} `}>На неделю</button>
                <button onClick={()=>{setShow(false)}} className={`${s.daily__btn} ${ !show ? s.active : ''} `}>Отменить</button>
            </div>
            <div className={`${s.daily__content} ${!show ? s.active : ''}`}>
                {
                    daily.map((elem, index) => (
                        <DailyItem day={elem} key={elem.dt} index={index} />
                    )).slice(0, 7)
                }
            </div>
        </div>
    )
}

export default Daily