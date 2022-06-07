import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './Card';
import Loading from './Loading'

const Clima = () => {
    
    const [obj, setObj] = useState()
    const [weather, setWeather] = useState()
    const [searchWeather, setSearchweather] = useState()

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
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${obj?.lat}&lon=${obj?.lon}&appid=${key}`)
                .then(res => setWeather(res.data))
                .catch(err => console.log(err))
        } 
    }, [obj])

    
    
    {/*---------Api-Search-World-Weather---------*/}
    const getSearch = (e) => {
        e.preventDefault()
        let value = e.target.country.value
        
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${key}`)
                .then(res => setSearchweather(res.data))
                .catch( () => alert('No se ha podido encontrar tu ubicacion'))
        
        
    }  
    console.log(searchWeather) 
    
       

  return (
    <div className='Clima'>
        <div className='ContainerForm'>
            <form  onSubmit={getSearch}>
                <input type="text"  name='country' placeholder='City'/>
                <button type='submit'>Search</button>
            </form>
        </div>
        <section className='ContainerCard'>
            <div className='ClimaInfo'>
                {searchWeather ? 
                    <Card 
                        data={searchWeather}    
                    />
                :
                (weather ?
                    <>
                        <h1>Real time location</h1>
                        <Card 
                            data={weather}
                         />
                    </>
                    : 
                    <Loading/>) 
                }
            </div>
        </section>
    </div>
    
  )

}

export default Clima