import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './Card';

const Clima = ({searchWeather, setSearchweather}) => {
    
    const [obj, setObj] = useState()
    const [weather, setWeather] = useState()
    const [isLoading, setIsLoading] = useState(true)
    
    {/*----- Geolocaton-------*/ }
    useEffect(() => {

            const success = (pos) => {
                let lon = pos.coords.longitude
                let lat = pos.coords.latitude
                setObj({lon,lat})
            }
    
            const error = (err) => {
                let msg = '';
                switch (err.code) {
                case err.PERMISSION_DENIED:
                    msg = 'No nos has dado permiso para obtener tu ubicacion, Busque una ubicacion';
                    break;
                case error.POSITION_UNAVAILABLE:
                    msg = 'Tu posición actual no está disponible';
                    break;
                case error.TIMEOUT:
                    msg = 'No se ha podido obtener tu posición en un tiempo prudencial';
                    break;
                default:
                    msg = 'Error_desconocido';
                    break;
                }
                alert(msg)
            }
            navigator.geolocation.getCurrentPosition(success, error)
        
    }, [])
    
    {/*------- API-KEY----*/ }
    let key = 'd3016b1b0984c90289cab932613c3ff5';
    
    {/*------- Api-Ubicacion En Tiempo Real----*/ }
    useEffect(() => {
        if(obj){
            setIsLoading(true)
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${key}`)
            .then(res => setWeather(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
        } 
    }, [obj])

    
    
    {/*---------Api-Search-World-Weather---------*/}
    const getSearch = (e) => {
        e.preventDefault()
        let value = e.target.country.value
        setIsLoading(true)
        if(value){
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}`)
                .then(res => setSearchweather(res.data))
                .catch((err) => console.log(err))
                .finally(() => setIsLoading(false))
        }
         Form.reset()
         setIsLoading(false)
    }  
    
    const prevent = () => {
        setSearchweather(null)
        Form.reset()
    }

  return (
    <div className='Clima' id='clima'>
        <div className='ContainerForm'>
            <form  onSubmit={getSearch} id="Form">
                <input type="text"  name='country' placeholder='City'/>
                <button type='submit'>Search</button>
            </form>
        </div>
        <section className='ContainerCard'>
            <div className='ClimaInfo'>
                {
                !searchWeather && weather &&
                <h2>Real time location</h2>
                }
                {
                    !searchWeather ? 
                        <Card 
                            data={weather}
                            isLoading={isLoading}
                        />
                    :
                       <Card 
                            data={searchWeather}
                            isLoading={isLoading}    
                        />
                }
                {
                    searchWeather
                    &&
                    <button className='gps'onClick={prevent}>
                        <i className="fa-solid fa-location-dot"></i>
                    </button>
                }
            </div>
        </section>
    </div>
    
  )

}

export default Clima