import React, { useState } from 'react';
import axios from 'axios';  
import './index.css';

function App() {
  
  const [data, setData] = useState({});
  const [location, setLocation] = useState(''); 

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`
  
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
          setData(response.data);
          console.log(response.data);
          setLocation()
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      
      setLocation('');
      }
  }

  return (
    <div className="App">
      <div className='container'>
      <div className='search'>
        <input
          className='search-bar'
          placeholder='Enter Location'
          onChange={event => setLocation(event.target.value)}
          value={location}
          onKeyDown={searchLocation}
          type='text'
        />
      </div> 
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined &&
          <div className='bottom'>
            <div className='humidity'>
              <p className='bold'>Humidity</p>
              {data.main ? <p>{data.main.humidity} %</p> : null}

            </div>
            <div className='wind'>
              <p className='bold'>Wind</p>
              {data.main ? <p>{data.wind.speed} kmph</p> : null}
            </div>
            <div className='feels'>
              <p className='bold'>Feels Like</p>
              {data.main ? <p>{data.main.feels_like.toFixed()} °C</p> : null}

            </div>
          </div>
        }
    </div>
    </div> 
  );
}

export default App;
