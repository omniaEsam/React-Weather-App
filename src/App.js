import React, { Component } from "react";
import Form from "./Components/Form";
import Weather from "./Components/Weather";

const API_Key = "12538e8a49926b1200f3eba2bfaf7ae9";

class App extends Component {
  state = {
    temprature: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: "",
  };
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_Key}`
    );
    const data = await api.json();
    if (city && country) {
      this.setState({
        temprature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
      });
    } else {
      this.setState({
        temprature: "",
        city: "",
        country: "",
        humidity: "",
        description: "",
        error: "please enter data",
      });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="form-container">
        <p className='title'>Weather App</p>
        <Form getWeather={this.getWeather} />
        <Weather 
         temprature = {this.state.temprature}
        city = {this.state.city}
        country= {this.state.country}
        humidity= {this.state.humidity}
        description= {this.state.description}
        error= {this.state.error} />
        </div>
      </div>
    );
  }
}
export default App;
