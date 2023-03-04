import Script from "./Script";

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
  return <div id="map" class="w-3/4 h-9/10 rounded-xl m-10"></div>;
}

export default Map;
