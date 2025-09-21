import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getLanLon, getWeatherByCoords } from './store/features/weather'
import Daily from './components/Daily/Daily'
import Loader from './components/Loader/Loader'
import WeatherPanel from './components/WeatherPanel/WeatherPanel'
import Error from './components/Error/Error'
import { getLocation, getLocationByBrowser } from './store/features/IPGeo'

const App = () => {
    const { weather, isError } = useSelector((state) => state.weather);
    const { location } = useSelector((state) => state.IPGeo)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLocationByBrowser())
            .unwrap()
            .catch(error => {
                console.warn('Не удалось получить точную геолокацию, причина:', error.message);
                dispatch(getLocation());
            });
    }, [dispatch]);

    useEffect(() => {
        if (location.lat && location.lon) {
            dispatch(getWeatherByCoords({ lat: location.lat, lon: location.lon }));
        }
        else if (location.city) {
            dispatch(getLanLon(location.city));
        }
    }, [location.lat, location.lon, location.city, dispatch]);

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