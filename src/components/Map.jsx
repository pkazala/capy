import Script from "./Script";
import { createEffect } from 'solid-js';

function Map() {
  Script('https://polyfill.io/v3/polyfill.min.js?features=default')
  let map;

  
  createEffect(()=> {
    console.log(calculateDistance(55.95333709746188,-3.194140510650442,55.95275837083679,-3.1903639120341842));
  })

  // distance in km
  const calculateDistance = (lat1,lon1,lat2,lon2)  => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  const deg2rad = (deg) =>  {
    return deg * (Math.PI/180)
  }

  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }
  Script('https://maps.googleapis.com/maps/api/js?key=AIzaSyD8OAF_09DCaMjEz6MdVSYqdPc7JreJybQ&callback=initMap&v=weekly')
  window.initMap = initMap;
  return <div id="map" class="w-96 h-96"></div>;
}

export default Map;
