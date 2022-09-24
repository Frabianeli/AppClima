import './App.css'
import Clima from './components/Clima'
import random_1 from './assets/random_1.jpg'
import random_2 from './assets/random_2.jpg'
import random_3 from './assets/random_3.jpg'
import random_4 from './assets/random_4.jpg'
import random_5 from './assets/random_5.jpg'
import random_6 from './assets/random_6.jpg'
import random_7 from './assets/random_7.jpg'
import random_8 from './assets/random_8.jpg'
import random_9 from './assets/random_9.jpg'
import random_10 from './assets/random_10.jpg'

import { useEffect, useState } from 'react'

const images = [random_1, random_2, random_3, random_4, random_5, random_6, random_7,
                random_8, random_9, random_10]
function App() {

  const [searchWeather, setSearchweather] = useState()
  const [randomImage, setRandomImage] = useState()


  useEffect(() => {
    const imagesRandom = images[Math.floor(Math.random()* images.length)]
    setRandomImage(imagesRandom)
  },[searchWeather])

  return (
    <div className="App" style={{backgroundImage: `url(${randomImage})`}}>
        <h1> Weather App</h1>
        <Clima setSearchweather={setSearchweather} searchWeather={searchWeather}/>
    </div>
  )
}

export default App
