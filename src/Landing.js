import React, {Component} from 'react';
import Radium from 'radium';
import queryString from 'query-string';

const inputStyle = {
  boxSizing: 'border-box',
  width: '200px',
  padding: '5px',
  outline: 'none',
  WebkitAppearance: 'none',
  borderRadius: 0,
  borderLeft: 'none',
  borderTop: 'none',
  borderRight: 'none',
  borderBottom: '1px solid #333',
  background: 'transparent',
  fontSize: 'inherit',
  fontFamily: 'inherit'
};

const infoStyle = {
  textDecoration: 'none',
  color: 'white',
  background: '#777',
  borderRadius: '100%',
  width: 25,
  height: 25,
  display: 'inline-block',
  textAlign: 'center',
  lineHeight: '25px',
  ':hover': {
    background: 'black'
  }
};

const apiKeys = [
  { key: 'forecastioAPIKey', placeholder: 'Forecast.io', link: 'https://developer.forecast.io/' },
  {
    key: 'googleMapsAPIKey',
    placeholder: 'Google Maps',
    link: 'https://developers.google.com/maps/documentation/javascript/get-api-key'
  },
  { key: 'nyTimesAPIKey', placeholder: 'The New York Times', link: 'http://developer.nytimes.com/' }
];

class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: 'You url will appear here once you fill out the above and hit Generate Url',
      forecastioAPIKey: '',
      googleMapsAPIKey: '',
      nyTimesAPIKey: ''
    };
  }

  handleClick = () => {
    let url = 'https://rajatsehgal.github.io/smart-mirror/?';

    let apiKeys = {};
    Object.keys(this.state).forEach(key => {
      if (key.endsWith('Key')) {
        apiKeys[key] = this.state[key];
      }
    });

    this.setState({
      url: url + queryString.stringify(apiKeys)
    });
  };

  handleInputChange = (key, event) => {
    this.setState({ [key]: event.target.value });
  };

  render() {
    const buttonDisabled = this.state.forecastioAPIKey === '' || this.state.googleMapsAPIKey === '' || this.state.nyTimeAPIKey === '';

    return (
      <div style={{
          textAlign: 'center',
          padding: 20
        }}>
        <div
          style={{
            display: 'inline-block',
            fontSize: 28
          }}>Smart Mirror|</div>
        <div
          style={{
            display: 'inline-block',
            fontSize: 28,
            color: '#777',
            transform: 'scale(-1, 1)'
          }}>Smart Mirror</div>
        <div
          style={{
            marginTop: 20,
            textAlign: 'left',
            fontSize: 18
          }}
        >Generate your very own Smart Mirror Url by entering the
          API keys for the following:
        </div>
        {apiKeys.map(obj => (
          <div key={obj.key}>
            <input
              placeholder={obj.placeholder}
              style={inputStyle}
              value={this.state[obj.key]}
              onChange={this.handleInputChange.bind(this, obj.key)}
            /> <a key={obj.key} style={infoStyle} href={obj.link} title={obj.link}
                  target="_blank">i</a>
          </div>
        ))}
        <button
          style={{
            display: 'inline-block',
            marginTop: '15px',
            backgroundColor: '#333',
            color: 'white',
            padding: '5px',
            border: 'none',
            fontSize: 'inherit',
            outline: 'none',
            WebkitAppearance: 'none',
            borderRadius: 0,
            cursor: 'pointer',
            opacity: buttonDisabled ? 0.35 : 1
          }}
          disabled={buttonDisabled}
          onClick={this.handleClick}
        >Generate Url
        </button>
        <div
          style={{
            fontSize: '14px',
            color: '#333',
            marginTop: 20
          }}>{this.state.url}</div>
      </div>
    );
  }
}

export default Radium(Landing);
