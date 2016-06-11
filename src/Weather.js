import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

import fetchJsonp from 'fetch-jsonp';

const API_ENDPOINT = 'https://api.forecast.io/forecast/';

const yellow = '#f3f315';
const blue = '#37fdfc';
const grey = '#c0c0c0';
const lightGrey = '#c0c0c0';

const iconMap = {
  'clear-day': { icon: 'wi-day-sunny', color: yellow },
  'clear-night': { icon: 'wi-night-clear' },
  rain: { icon: 'wi-rain', color: blue },
  snow: { icon: 'wi-snow' },
  sleet: { icon: 'wi-sleet', color: blue },
  wind: { icon: 'wi-windy' },
  fog: { icon: 'wi-fog', color: grey },
  cloudy: { icon: 'wi-cloud', color: lightGrey },
  'partly-cloudy-day': { icon: 'wi-day-cloudy' },
  'partly-cloudy-night': { icon: 'wi-night-partly-cloudy' },
  hail: { icon: 'wi-hail', color: blue },
  thunderstorm: { icon: 'wi-thunderstorm', color: blue },
  tornado: { icon: 'wi-tornado' }
};

function toCelsius(f) {
  return Math.round((5 / 9) * (f - 32));
}

class Weather extends Component {

  constructor(props) {
    super(props);
    this.state = {
      now: null,
      later: null
    };
    this.fetchWeather();
  }

  componentDidMount() {
    this._interval = setInterval(this.fetchWeather, 15 * 60000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  fetchWeather = () => {
    fetchJsonp(`${API_ENDPOINT}${this.props.apiKey}/${this.props.latitude},${this.props.longitude}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          now: {
            summary: data.currently.summary,
            icon: data.currently.icon,
            temperature: data.currently.apparentTemperature
          },
          later: {
            summary: data.hourly.data[8].summary,
            icon: data.hourly.data[8].icon,
            temperature: data.hourly.data[8].apparentTemperature
          }
        });
      });
  };

  render() {
    if (!this.state.now) {
      return <div style={{ marginTop: 30, height: 130 }} />;
    }
    return (
      <div style={{ marginTop: 30, height: 130 }}>
        <div>
          <i
            style={{
              verticalAlign: 'middle',
              fontSize: 45,
              color: iconMap[this.state.now.icon].color
            }}
            className={`wi ${iconMap[this.state.now.icon].icon}`}
          />
          <div
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              marginLeft: 10
            }}
          >
            {` Now ${toCelsius(this.state.now.temperature)} \u00b0C / ${Math.round(this.state.now.temperature)} \u00b0F`}
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <i
            style={{
              verticalAlign: 'middle',
              fontSize: 45,
              color: iconMap[this.state.later.icon].color
            }}
            className={`wi ${iconMap[this.state.later.icon].icon}`}
          />
          <div
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              marginLeft: 10
            }}
          >
            {` Later ${toCelsius(this.state.later.temperature)} \u00b0C / ${Math.round(this.state.later.temperature)} \u00b0F`}
          </div>
        </div>
      </div>
    );
  }
}

Weather.propTypes = {
  apiKey: PropTypes.string,
  latitude: PropTypes.number,
  longitude: PropTypes.number
};

export default Radium(Weather);
