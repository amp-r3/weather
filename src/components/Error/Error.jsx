import s from './error.module.scss';
import { useDispatch } from 'react-redux';
import { getLanLon } from '../../store/features/weather';

const Error = ({ message }) => {
    const dispatch = useDispatch();

    const handleRetry = () => {
        dispatch(getLanLon('Almalyk'));
    };

    return (
        <div className={s.errorWrapper}>
            <div className={s.errorCard}>
                <h2 className={s.errorTitle}>Что-то пошло не так</h2>
                <p className={s.errorMessage}>
                    {message.includes('404')
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