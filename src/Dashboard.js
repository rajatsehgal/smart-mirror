import React, { PropTypes } from 'react';
import Radium from 'radium';

import Day from './Day';
import Time from './Time';
import Weather from './Weather';
import Travel from './Travel';
import News from './News';
import Gecko from './Gecko';

const Dashboard = ({ forecastioAPIKey, googleMapsAPIKey, nyTimesAPIKey, lat, lon }) => (
  <div
    style={{
      height: '100%',
      fontSize: 40,
      color: 'white',
      background: 'black',
      textAlign: 'center',
      fontWeight: 'lighter',
      overflow: 'auto'
    }}
  >
    <Day />
    <Time />
    <Weather apiKey={forecastioAPIKey} latitude={lat} longitude={lon} />
    <Travel
      apiKey={googleMapsAPIKey} latitude={lat} longitude={lon}
      destinations={[{
        name: 'MathWorks',
        logo: 'src/images/mathworks.png',
        address: '1 Apple Hill Drive, Natick, MA'
      }, {
        name: 'Staples',
        logo: 'src/images/staples.png',
        address: '500 Staples Drive, Framingham, MA'
      }]}
    />
    <News apiKey={nyTimesAPIKey} />
    <Gecko />
  </div>
);

Dashboard.propTypes = {
  forecastioAPIKey: PropTypes.string.isRequired,
  googleMapsAPIKey: PropTypes.string.isRequired,
  nyTimesAPIKey: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired
};

export default Radium(Dashboard);
