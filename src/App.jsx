import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getLanLon } from './store/features/weather'
import Daily from './components/Daily/Daily'
import Loader from './components/Loader/Loader'
import WeatherPanel from './components/WeatherPanel/WeatherPanel'
import Error from './components/Error/Error' // 1. Импортируем компонент ошибки

const App = () => {
    const { weather, isError } = useSelector((state) => state.weather);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getLanLon('Almalyk'));
    }, [dispatch]);
    
    return (
        <div className='container'>
            <Navbar />
            {
                (() => {
                    if (isError) {
                        return <Error message={isError} />;
                    }
                    if (weather) {
                        return (
                            <>
                                <WeatherPanel />
                                <Daily />
                            </>
                        );
                    }
                    return <Loader />;
                })()
            }
        </div>
    );
};

export default App;