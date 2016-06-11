import React from 'react';
import ReactDom from 'react-dom';
import queryString from 'query-string';

import Landing from './Landing';
import Dashboard from './Dashboard';

const params = Object.assign({}, queryString.parse(window.location.search));

if (!params.forecastioAPIKey) {
  ReactDom.render((
    <Landing />
  ), document.getElementById('app'));
} else {
  navigator.geolocation.getCurrentPosition((position) => {
    params.lat = position.coords.latitude;
    params.lon = position.coords.longitude;

    ReactDom.render((
      <Dashboard {...params} />
    ), document.getElementById('app'));
  });
}
