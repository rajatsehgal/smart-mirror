import React, { Component } from 'react';
import Radium from 'radium';

import fetch from 'isomorphic-fetch';

class Gecko extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gecks: []
    };
    this.fetchGecks();
  }

  componentDidMount() {
    this._interval = setInterval(this.fetchGecks, 30 * 60000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  fetchGecks = () => {
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          gecks: data.slice(0, 5)
        });
      });
  };

  render() {
    return (
      <div style={{ fontSize: 28, marginTop: 10 }}>
        <ul
          style={{
            textAlign: 'left'
          }}
        >
          {this.state.gecks.map((geck, i) => (
            <li key={i}>{geck.Summary}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Radium(Gecko);
