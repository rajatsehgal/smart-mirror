import React, {Component} from 'react';
import Radium from 'radium';

import fetch from 'isomorphic-fetch';

const API_ENDPOINT = 'https://api.nytimes.com/svc/topstories/v1/world.json';
const numerals = ['௧', '௨', '௩', '௪', '௫'];

class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.fetchNews();
  }

  componentDidMount() {
    this._interval = setInterval(this.fetchNews, 30 * 60000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  fetchNews = () => {
    fetch(API_ENDPOINT + `?api-key=${this.props.apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          items: data.results.slice(0, 5)
        });
      });
  };

  render() {
    return (
      <div style={{ fontSize: 28, marginTop: 10 }}>
        <ul style={{
          padding: 20,
          textAlign: 'left',
          listStyleType: 'none'
        }}>
          {this.state.items.map((item, i) => (
            <li
              style={{whiteSpace: 'nowrap'}}
              key={i}
            >
              <div
                style={{
                    display: 'inline-block',
                    verticalAlign: 'top'
                  }}
              >{numerals[i]}</div>
              <div
                style={{
                  display: 'inline-block',
                  verticalAlign: 'top',
                  whiteSpace: 'normal',
                  marginLeft: 10
                }}
              >{item.title}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Radium(News);