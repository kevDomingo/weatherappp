import React, { useState } from "react";
import { Form } from "react-bootstrap";

const api = {
    key: "55cd5902296b2efbc1c863821ff64719",
    base: "https://api.openweathermap.org/data/2.5/"
};


function App() {
    
    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});


        const search = evt => {
            if (evt.key === "Enter") {
                fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
                    .then(res => res.json())
                    .then(result => {
                        setWeather(result);
                        setQuery("");
                        console.log(result);
                    });
            }
        }


        const dateBuilder = (d) => {
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            
            let day = days[d.getDay()];
            let date = d.getDate();
            let month = months[d.getMonth()];
            let year = d.getFullYear();
    
            return `${day} ${date} ${month} ${year}`
        }


        return(
            <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 67) ? "app warm" : "app") : "app"}>
                <main className="mainApp">
                    <div className="search-box">
                        <Form.Control className="search-bar" type="text" placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} />
                    </div>
                    <p id="name">Weather App</p>

                    {(typeof weather.main != "undefined") ? (

                    <div>
                    
                    <div className="location-box">
                    <div className="location">{weather.name}, {weather.sys.country}</div>
                    <div className="date">{dateBuilder(new Date())}</div>
                    </div>

                    <div className="row">
                    <div className="col-md-6">
                    <div className="weather-box">
                    <div className="temp">{Math.round(weather.main.temp)}°F</div>
                    <div className="weather">{weather.weather[0].description}</div>
                    </div>
                    </div>
                    
                    <div className="col-md-6">
                    <div className="weatherInfo-box">

                        <div className="weatherInfo" id="wind">{((weather.wind.speed) / 2.237).toFixed(1)}mph Wind</div>
                        <div className="weatherInfo" id="tempMax">{Math.round(weather.main.temp_max)}° High</div>
                        <div className="weatherInfo" id="sunrise">{new Date(weather.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5)} sunrise</div>

                        <div className="weatherInfo" id="humidity">{weather.main.humidity}% rain</div>
                        <div className="weatherInfo" id="tempMin">{Math.round(weather.main.temp_min)}° Low</div>
                        <div className="weatherInfo" id="sunset">{new Date(weather.sys.sunset * 1000).toLocaleTimeString().slice(0, 5)} sunset</div>

                    </div>
                    </div>
                    </div>                                     

                    </div>
                    ) : ("")}
                </main>
            </div>
        )
    }


export default App;