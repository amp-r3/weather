import { useState } from 'react';
import { uiIcons } from '../../assets/image';
import s from './navbar.module.scss';
import { useDispatch } from "react-redux";
import { getLanLon } from "../../store/features/weather.js";
import { useTheme } from '../../hooks/useTheme.js';

const Navbar = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const { toggleTheme } = useTheme();

    const getWeather = (event) => {
        const text = query.trim();
        if (event.key === 'Enter' && text) {
            dispatch(getLanLon(text));
            setQuery('');
        }
    };

    const handleClear = () => {
        setQuery('');
    };

    return (
        <header className={s.header}>
            <a href="/" className={s.logo}>
                <img src={uiIcons.logo} alt="Weather App Logo" />
                <span>Vue Weather</span>
            </a>

            <div className={s.controls}>

                <div className={s.search}>
                    <input
                        onKeyDown={getWeather}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        className={s.search__input}
                        placeholder='Выбрать город'
                    />

                    {query && (
                        <button onClick={handleClear} className={`${s.icon_btn} ${s.search__btn}`} aria-label="Clear search">
                            <span className={s.close_icon}></span>
                        </button>
                    )}
                </div>
                <button onClick={toggleTheme} className={`${s.icon_btn} ${s.theme_switcher}`} aria-label="Toggle theme">
                    <img src={uiIcons.city} alt="Change theme" />
                </button>
            </div>
        </header>
    );
};

export default Navbar;