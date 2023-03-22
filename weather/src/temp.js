import { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import './temp.css';
import img from './images/search.png'
import clouds from './images/clouds.png'
import humidity from './images/humidity.png';
import clear from './images/clear.png';
import drizzle from './images/drizzle.png';
import rain from './images/rain.png';
import snow from './images/snow.png';
import mist from './images/mist.png';

import wind from './images/wind.png';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({

    inputRoot: {
        border: 0,
        outline: 0,
        background: '#ebfffc',
        color: '#555',
        padding: '10px 25px',
        height: '60px',
        borderRadius: '30px',
        flex: 1,
        marginRight: '16px',
        fontSize: '18px'
    },

}));



function Temperature() {

    const apiKey = '89471b73f057dbafe8d10307df602ea5';
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

    const [weatherData, setWeatherData] = useState(null);
    const [name, setName] = useState('delhi');

    const checkWeather = async (cityname) => {
        try {
            let { data } = await axios.get(apiUrl + cityname + `&appid=${apiKey}`)
            setWeatherData(data);
            document.querySelector(".error").style.display = "none"
            document.querySelector(".weather").style.display = "block"

        } catch (error) {
            document.querySelector(".error").style.display = "block"
            document.querySelector(".weather").style.display = "none"

        }

    }
    const updateImageAccToWeather = () => {
        if (weatherData) {
            switch (weatherData.weather[0].main) {
                case 'Clouds':
                    return clouds
                case 'Clear':
                    return clear
                case 'Drizzle':
                    return drizzle
                case 'Mist':
                    return mist
                case 'Rain':
                    return rain
                case 'Snow':
                    return snow
                default:
                    return clear
            }
        }
    }

    const classes = useStyles();

    return (
        <div className="card">
            <div className="search">
                <InputBase
                    placeholder="Enter City Name"
                    classes={{
                        root: classes.inputRoot,
                    }}

                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <button onClick={() => checkWeather(name)}><img src={img} alt='' /></button>
            </div>
            <div className='error'>
                <p>Invalid city name</p>
            </div>
            <div className='weather'>
                <img src={updateImageAccToWeather()} className='weather-icon' alt='' />
                <h1 className='temp'>{`${Math.round(weatherData && weatherData.main.temp ? weatherData.main.temp : 0)}°C`}</h1>
                <h2 className='city'>{weatherData && weatherData.name}</h2>
                <div className='details'>
                    <div className='col'>
                        <img src={humidity} alt='' />
                        <div>
                            <p className='humidity'>{`${weatherData && weatherData.main.humidity ? weatherData.main.humidity : 0}%`}</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='col'>
                        <img src={wind} alt='' />
                        <div>
                            <p className='wind'>{weatherData && weatherData.wind.speed ? weatherData.wind.speed : 0}km/h</p>
                            <p>wind speed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Temperature;