import Script from "./Script";
import bagel from "../assets/bagel.png";
import { createEffect, createSignal } from "solid-js";
import cappy from "../assets/cappy.png";

function Map(props) {
  Script("https://polyfill.io/v3/polyfill.min.js?features=default");
  let map;


  let [loc,setLoc] = props.playerLoc;

  let [locationCount, setLocationCount] = createSignal(0);

  let [center, setC] = createSignal(0);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (e) => {
          setLoc([
            parseInt(e.coords.latitude.toString()),
            parseInt(e.coords.longitude.toString()),
          ]);
          setC({
            lat: e.coords.latitude,
            lng: e.coords.longitude,
          });
        },
        () => {},
        { enableHighAccuracy: true }
      );
    }
  }
  createEffect(() => {
    getLocation();
  });


  const shops=props.shops

  // let location = false;

  function initMap() {
    let UserMarker = "";
    const loca = loc();
    if (loca.length > 0) {
      location = true;
    }
    console.log(loca.length);
    let map = "";
    if (location === true) {
      let LatLng = center();
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: loca[0], lng: loca[1] },
      });
      map.setCenter(center);

      UserMarker = new google.maps.Marker({
        position: LatLng,
        map,
        title: "Our Position",
        icon: "src/assets/cappy.png",
      });
      const infowindow = new google.maps.InfoWindow({
        content: "Your Position",
      });
      infowindow.open(map, UserMarker);
    } else {
      let LatLng = { lat: 55.944831503142886, lng: -3.187265119000685 };

      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: LatLng,
      });
    }

    shops.map((shop) => {
      console.log(shop.title);
      const myLatLng = { lat: shop.Lat, lng: shop.Lon };
      let icon;
      if (shop.title == "Sainsbury's") {
        icon = "src/assets/sainsbury.svg";
      } else if (shop.title == "Tesco") {
        icon = "src/assets/tesco.svg";
      } else if (shop.title == "Lidl") {
        icon = "src/assets/lidl.png";
      } else if (shop.title == "Co-op") {
        icon = "src/assets/coop.svg";
      } else {
        const icon =
          "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
      }
      new google.maps.Marker({
        position: myLatLng,
        map,
        title: shop.title,
        icon: icon,
      });
    });
    if (location === false) {
      const infowindow = new google.maps.InfoWindow({
        content: "Your Position",
      });
      let pos = "";
      google.maps.event.addListener(map, "click", (e) => {
        if (UserMarker) {
          UserMarker.setMap(null);
          UserMarker = null;
        }
        console.log(locationCount());
        setLocationCount(locationCount() + 1);

        pos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        UserMarker = new google.maps.Marker({
          position: pos,
          map,
          title: "Position",
          icon: "src/assets/cappy.png",
        });
        infowindow.open(map, UserMarker);
      });
    }
  }
  Script(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8OAF_09DCaMjEz6MdVSYqdPc7JreJybQ&callback=initMap&v=weekly"
  );
  window.initMap = initMap;
  return (
    <div class="sticky top-6 w-3/4 h-9/10 m-10">
      <div class="absolute z-50 left-0 bottom-0 m-6 w-28 p-2 bg-red-300 text-white rounded-xl">
        Fact: <br />
        1.3 billion tons of food are wasted every year
        <img src={bagel} alt="bagel" class="absolute bottom-24 left-16 w-16" />
      </div>
      <Show when={locationCount() > 0}>
        <button
          onClick={() => {
            location = true;
            initMap();
            setLocationCount(0);
          }}
          class="absolute z-50 left-1/2 translate-x-[-50%] top-8 text-white bg-green-400 p-2 w-64 text-center rounded-xl text-2xl shadow-2xl hover:bg-green-500 transition duration-200"
        >
          Confirm location
        </button>
      </Show>
      <div id="map" class="h-full w-full rounded-xl"></div>
    </div>
  );
}

export default Map;
