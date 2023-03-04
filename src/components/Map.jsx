import Script from "./Script";
import bagel from '../assets/bagel.png'

function Map() {
  Script("https://polyfill.io/v3/polyfill.min.js?features=default");
  let map;

  function initMap() {
    const myLatLng = { lat: -25.363, lng: 131.044 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatLng,
    });

    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
  }
  Script(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8OAF_09DCaMjEz6MdVSYqdPc7JreJybQ&callback=initMap&v=weekly"
  );
  window.initMap = initMap;
  return (
    <div class="sticky w-3/4 h-9/10 m-10">
      <div class="absolute z-50 left-0 bottom-0 m-6 w-28 p-2 bg-red-300 text-white rounded-xl">Fact: <br/>1.3 billion tons of food are wasted every year
      <img src={bagel} alt="bagel" class="absolute bottom-24 left-16 w-16" />
      </div>
      <div id="map" class="h-full w-full rounded-xl"></div>
    </div>
  );
}

export default Map;
