import React, { Component } from 'react';
import Radium from 'radium';
import moment from 'moment';

class Time extends Component {

  constructor(props) {
    super(props);
    this.state = { timeStr: this.generateTimeStr() };
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.setState({ timeStr: this.generateTimeStr() });
    }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  generateTimeStr() {
    return moment().format('h:mm a');
  }

  render() {
    return (
      <div style={{ textTransform: 'uppercase' }}>{this.state.timeStr}</div>
    );
  }
}

export default Radium(Time);
