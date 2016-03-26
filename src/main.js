import React from 'react';
import ReactDom from 'react-dom';

import Day from './Day';
import Time from './Time';
import Weather from './Weather';
import Travel from './Travel';
import News from './News';

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const googleMapsAPIKey = getParameterByName('googleMapsAPIKey');
const forecastioAPIKey = getParameterByName('forecastioAPIKey');
const nyTimesAPIKey = getParameterByName('nyTimesAPIKey');

navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  ReactDom.render((
    <div>
      <Day/>
      <Time/>
      <Weather apiKey={forecastioAPIKey} latitude={lat} longitude={lon}/>
      <Travel apiKey={googleMapsAPIKey} latitude={lat} longitude={lon}/>
      <News apiKey={nyTimesAPIKey}/>
    </div>
  ), document.getElementById('app'));
});
