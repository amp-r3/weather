import s from './error.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getLanLon, getWeatherByCoords } from '../../store/features/weather';

const Error = ({ message }) => {
    const { location } = useSelector((state) => state.IPGeo)
    const dispatch = useDispatch();

    const handleRetry = () => {
        if (location.lat && location.lon) {
            dispatch(getWeatherByCoords({ lat: location.lat, lon: location.lon }));
        }
        else if (location.city) {
            dispatch(getLanLon(location.city));
        }
    };

    return (
        <div className={s.errorWrapper}>
            <div className={s.errorCard}>
                <h2 className={s.errorTitle}>Что-то пошло не так</h2>
                <p className={s.errorMessage}>
                    {message.includes('Город не найден')
                        ? 'Город не найден. Пожалуйста, проверьте правильность написания.'
                        : 'Не удалось загрузить данные. Проверьте ваше интернет-соединение.'
                    }
                </p>
                <button onClick={handleRetry} className={s.retryButton}>
                    Попробовать снова
                </button>
            </div>
        </div>
    );
};

export default Error;