import React, {Component} from 'react';
import Radium from 'radium';
import moment from 'moment';

class Day extends Component {

  constructor(props) {
    super(props);
    this.state = { dayStr: this.generateDayStr() };
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.setState({ dayStr: this.generateDayStr() });
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  generateDayStr() {
    return moment().format("dddd, MMMM Do");
  }

  render() {
    return (
      <div style={{ paddingTop: 20}}>{this.state.dayStr}</div>
    );
  }
}

export default Radium(Day);