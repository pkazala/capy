import Script from "./Script";

function Map() {
  Script('https://polyfill.io/v3/polyfill.min.js?features=default')
  let map;

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
