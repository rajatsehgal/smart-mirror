import React, {Component} from 'react';
import Radium from 'radium';

class Travel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      brightcove: "",
      symbotic: ""
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
    var origin = new google.maps.LatLng(this.props.latitude, this.props.longitude);
    var brightcove = "290 Congress Street, Boston, MA";
    this._service.getDistanceMatrix({
      origins: [origin],
      destinations: [brightcove],
      travelMode: google.maps.TravelMode.TRANSIT
    }, (response) => {
      this.setState({
        brightcove: response.rows[0].elements[0].duration.text
      });
    });

    var symbotic = "200 Research Drive, Wilmington, MA";
    this._service.getDistanceMatrix({
      origins: [origin],
      destinations: [symbotic],
      travelMode: google.maps.TravelMode.DRIVING
    }, (response) => {
      this.setState({
        symbotic: response.rows[0].elements[0].duration.text
      });
    });
  };

  render() {
    return (
      <div style={{ marginTop: 30}}>
        <div>
          {this.state.brightcove} <img width="45" height="45" src="src/images/transit.png" style={{
          verticalAlign: 'middle'
        }}/> to <img style={{verticalAlign: 'middle'}} width="45" height="45"
                     src="src/images/brightcove.png"/></div>
        <div style={{ marginTop: 10 }}>
          {this.state.symbotic} <img width="45" height="45" src="src/images/car.png" style={{
          verticalAlign: 'middle'
        }}/> to <img style={{verticalAlign: 'middle'}} width="45" height="45"
                     src="src/images/symbotic.png"/></div>
      </div>
    );
  }
}

export default Radium(Travel);