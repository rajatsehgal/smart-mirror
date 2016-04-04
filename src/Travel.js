import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

class Travel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      travelTimes: []
    };
  }

  componentDidMount() {
    this._interval = setInterval(this.fetchDuration, 30 * 60000);
    window.googleMapsLoaded = () => {
      this._service = new google.maps.DistanceMatrixService();
      this.fetchDuration();
    };
    let script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.props.apiKey}&callback=googleMapsLoaded`;
    document.body.appendChild(script);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  fetchDuration = () => {
    var origins = [new google.maps.LatLng(this.props.latitude, this.props.longitude)];
    var destinations = this.props.destinations.map(destination => destination.address);

    this._service.getDistanceMatrix({
      origins,
      destinations,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response) => {
      this.setState({
        travelTimes: response.rows[0].elements.map(element => element.duration.text)
      });
    });
  };

  render() {
    return (
      <div style={{ marginTop: 30}}>
        {
          this.state.travelTimes.map((time, i) => (
            <div key={this.props.destinations[i].name}>
              {this.state.travelTimes[i]} <img
              width="45" height="45" src="src/images/car.png"
              style={{
                verticalAlign: 'middle'
              }}/> to {this.props.destinations[i].logo ? <img style={{verticalAlign: 'middle'}}
                                                        height="35"
                                                        src={this.props.destinations[i].logo}/> : this.props.destinations[i].name}
            </div>
          ))
        }
      </div>
    );
  }
}

Travel.propTypes = {
  destinations: PropTypes.arrayOf(PropTypes.shape({
    logo: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    address: React.PropTypes.string.isRequired
  }))
};

Travel.defaultProps = {
  destinations: []
};

export default Radium(Travel);