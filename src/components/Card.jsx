import React, { useState } from 'react'
import humidity from '../assets/hu.png'
import Loading from './Loading';

const Card = ({data, isLoading}) => {
    const [change, setChange] = useState(true)

    {/*---------Fecha---------*/}
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() +1;
    let year = today.getFullYear();
    let date = day + '/' + month + '/' + year;

    {/*---------Change de C a F ----------*/}
    const click = () => {change ? setChange(false) : setChange(true)}
    
    let celsius = (data?.main.temp - 273.15).toFixed(1);
    let fahrenheit =( celsius * 1.8 + 32).toFixed(1);
    
    let tempMinC = (data?.main.temp_min - 273.15).toFixed(1);
    let tempMinF = (tempMinC * 1.8 + 32).toFixed(1);

    let tempMaxC = (data?.main.temp_max - 273.15).toFixed(1);
    let tempMaxF = (tempMaxC * 1.8 + 32).toFixed(1);

  return (
    <>
        { isLoading ?
            <Loading/>
            :
            <div className='Card'>
                <h2>{data?.name} , {data?.sys.country}</h2>
                <h3>{date}</h3>
                <div className='Container'>
                    <div className='ContainerInfo'>
                        {
                            data?.main.temp_min 
                            &&
                            <p><i className="fa-solid fa-temperature-low"></i> Temp-min: {change ? tempMinC + ' ºC' : tempMinF + ' ºF'}</p>
                        }
                        {
                            data?.main.temp_max
                            &&
                            <p><i className="fa-solid fa-temperature-low"></i> Temp-max: {change ? tempMaxC + ' ºC' : tempMaxF + ' ºF'}</p>
                        }
                        <p><img src={humidity} alt="ixon humidity" /> Humidity: {data?.main.humidity}%</p>
                        <p><i className="fa-solid fa-wind"></i> Wind: {data?.wind.deg}</p>
                        <p><i className="fa-solid fa-wind"></i> Wind speed: {data?.wind.speed}m/s</p>
                        <p><i className="fa-solid fa-cloud"></i> Cloud: {data?.clouds.all} </p>
                    </div>
                    <div className='ContainerDescriptionImg'>
                        <h4>{change ? celsius + ' ºC' : fahrenheit + ' ºF'}</h4>
                        <div className='ContainerImg'>
                            <img src={`http://openweathermap.org/img/w/${data?.weather[0].icon}.png`} alt="icon" />
                        </div>
                        <p>{data?.weather[0].description}</p>
                    </div>
                </div>
                <div className='ContainerButton'>
                    <button onClick={click}>Degrees{change ? ' ºF' : ' ºC'}</button>
                </div>
            </div>
        }
    </>
  )
}

export default Card
