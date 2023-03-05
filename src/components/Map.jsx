import Script from "./Script";
import { createEffect, createSignal } from 'solid-js';

function Map(props) {
  Script("https://polyfill.io/v3/polyfill.min.js?features=default");
  let map;

  let [loc,setLoc] = props.playerLoc;
  let [center, setC] = createSignal(0);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((e)=> {
        setLoc([e.coords.latitude, e.coords.longitude]);
        setC({
          lat: e.coords.latitude,
          lng: e.coords.longitude,
        });
      }, ()=>{},{enableHighAccuracy: true})
    }
  }
  createEffect(() =>{
    getLocation();
    console.log("b");
  });


  const shops=props.shops

  function initMap() {
    let location = false;
    let UserMarker = ""
    const loca = loc();
    const cen = center;
    if(loca.length > 0){
      location = true;
    }
    console.log(loca.length);
    let map = ""
    if(location === true) {
      let LatLng = center();
       map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: {lat: loca[0], lng:loca[1]}
      });
       map.setCenter(center);
       console.log(loca[0]);
       UserMarker = new google.maps.Marker({
        position: map.getCenter(),
        map,
        title: "Our Position",
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png"
      });
      const infowindow = new google.maps.InfoWindow({
        content:"Your Position"
      });
      infowindow.open(map,UserMarker);
    } else{
     let LatLng = { lat: 55.944831503142886, lng: -3.187265119000685 };

       map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: LatLng,
      });
    }

    shops.map((shop)=>{
      console.log(shop.title)
      const myLatLng = { lat: shop.Lat, lng: shop.Lon };
      new google.maps.Marker({
        position: myLatLng,
        map,
        title: shop.title,
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
      });
    })
    if(location === false){
      const infowindow = new google.maps.InfoWindow({
        content:"Your Position"
      });

      let pos = "";
      google.maps.event.addListener(map,"click",(e)=>{
        if(UserMarker){
          UserMarker.setMap(null);
          UserMarker = null
        }

        pos = {lat: e.latLng.lat(),lng: e.latLng.lng()}
        UserMarker = new google.maps.Marker({position: pos, map, title: "Position", icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png"});
        infowindow.open(map,UserMarker);   } );
    }

  }
  Script(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8OAF_09DCaMjEz6MdVSYqdPc7JreJybQ&callback=initMap&v=weekly"
  );
  window.initMap = initMap;
  console.log(shops)

  return <div id="map" class="w-3/4 h-9/10 rounded-xl m-10"></div>;
}

export default Map;
