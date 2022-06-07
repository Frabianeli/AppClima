import React, { useState } from 'react'
import humidity from '../assets/hu.png'

const Card = ({data}) => {
    const [change, setChange] = useState(true)
    {/*---------Fecha---------*/}
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() +1;
    let year = today.getFullYear();
    let date = day + '/' + month + '/' + year;

    {/*---------Change de C a F ----------*/}
    const click = () => {change ? setChange(false) : setChange(true)}
    console.log(data)
    let celsius = (data?.main.temp - 273.15).toFixed(1);
    let fahrenheit =( celsius * 1.8 + 32).toFixed(1);

  return (
    <div className='Card'>
        <h1>{data?.name} , {data?.sys.country}</h1>
        <h2>{date}</h2>
        <div className='Container'>
            <div className='ContainerInfo'>
                <p><i class="fa-solid fa-temperature-low"></i> Temp: {change ? celsius + ' ºC' : fahrenheit + ' ºF'}</p>
                <p><img src={humidity} alt="ixon humidity" /> Humidity: {data?.main.humidity}%</p>
                <p><i class="fa-solid fa-wind"></i> Wind: {data?.wind.deg}</p>
                <p><i class="fa-solid fa-wind"></i> Wind speed: {data?.wind.speed}m/s</p>
                <p><i class="fa-solid fa-cloud"></i> Cloud: {data?.clouds.all} </p>
            </div>
            <div className='ContainerDescriptionImg'>
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
  )
}

export default Card
