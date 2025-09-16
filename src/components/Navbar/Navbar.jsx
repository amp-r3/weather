import React, { useEffect, useState } from 'react'
import { images } from '../../assets/image'
import s from './navbar.module.scss'
import { useDispatch } from "react-redux";
import { getLanLon } from "../../store/features/weather.js";
const Navbar = () => {
    const [query, setQuery] = useState('');
    const [theme, setTheme] = useState('light')
    const dispatch = useDispatch()
    const getWeather = (event) => {
        const text = query.trim()
        if (event.key == 'Enter' && text) {
            dispatch(getLanLon(text))
        }
    }

    const changeTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }
    useEffect(()=>{
        const localTheme = localStorage.getItem('theme')
        setTheme(localTheme)
    }, [])
    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('active')
        } else {
            document.body.classList.remove('active')
        }
        
        localStorage.setItem('theme', theme)
        
    }, [theme])
    
    return (
        <header className={s.header}>
            <a href="" className={s.logo}>
                <img src={images.logo} alt="" />
                vue weather
            </a>
            <div className={s.search}>
                <img onClick={changeTheme} src={images.city} alt="" />
                <input
                    onKeyDown={getWeather}
                    value={query}
                    onChange={(event) => { setQuery(event.target.value) }}
                    type="text" className={s.search__input} placeholder='Выбрать город'
                />

                {query && <button onClick={() => { setQuery('') }} className={s.search__btn}>x</button>}
            </div>
        </header>
    )
}

export default Navbar