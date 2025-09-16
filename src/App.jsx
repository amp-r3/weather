import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Current from './components/Current/Current'
import { useDispatch, useSelector } from 'react-redux'
import { getLanLon } from './store/features/weather'
import Daily from './components/Daily/Daily'
import Loader from './components/Loader/Loader'

const App = () => {
  const {weather, isError} = useSelector((state) => state.weather)
  const dispatch = useDispatch()
  useEffect(() => { dispatch(getLanLon('Almalyk')) }, [dispatch])
  return (
    <div className='container'>
      <Navbar />
      {
        weather ? 
        <>
        <Current/>
        <Daily/>
        </>
         :
        isError ? <h1>{isError}</h1> :
        <Loader/>
      }
    </div>
  )
}

export default App