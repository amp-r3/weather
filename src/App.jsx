import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getLanLon } from './store/features/weather'
import Daily from './components/Daily/Daily'
import Loader from './components/Loader/Loader'
import WeatherPanel from './components/WeatherPanel/WeatherPanel'

const App = () => {

  const { weather, isError } = useSelector((state) => state.weather)
  const dispatch = useDispatch()
  useEffect(() => { dispatch(getLanLon('Almalyk')) }, [dispatch])
  return (

    <div className='container'>
      <Navbar />
      {
        weather ?
          <>
            <WeatherPanel />
            <Daily />
          </>
          :
          isError ? <h1>{isError}</h1> :  <Loader />
      }
    </div>
  )
}

export default App