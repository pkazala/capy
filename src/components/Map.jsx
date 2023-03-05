import Script from "./Script";
import bagel from "../assets/bagel.png";
import {createEffect, createSignal, onCleanup} from "solid-js";
import cappy from "../assets/cappy.png";
import {render} from "solid-js/web";

function Map(props) {
  Script("https://polyfill.io/v3/polyfill.min.js?features=default");

  let [loc,setLoc] = createSignal([]);
  let colours = ["green", "blue", "red", "purple", "yellow"]
  let [locationCount, setLocationCount] = createSignal(0);
  let [center, setC] = createSignal(0);
  let [location, setLocation] = createSignal(false);
  let [UserMarker,setUserMarker] = createSignal("");
  let [map,setMAP] = createSignal("");
 // document.getElementById("bruh").addEventListener("change",finishInit);
  document.getElementById("bruh").addEventListener("change",(e)=>console.log(e));
  const interval = setInterval(
      () => {

        if(document.getElementById("bruh").innerHTML != ""){

          finishInit();
          document.getElementById("bruh").innerHTML = "";
        }
      },
      1000
  );
  //onCleanup(() => clearInterval(interval));

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
    center();

  })

  let [shopsMaker,setShopMaker] = createSignal([]);
  const shops=props.shops;
  



  function initMap() {
    setLocation(false);
    const loca = loc();
    const cen = center;
    console.log(loca.length);
    if (loca.length > 0) {
      setLocation(true);
    }
    console.log(location());

    if (location() === true) {
      console.log("ghalmmy sahut");
       setMAP(new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: loca[0], lng: loca[1] },
      }));


        setUserMarker(new google.maps.Marker({
        position: cen(),
        map: map(),
        title: "Our Position",
        icon: "src/assets/cappy.png",
      }));
      const infowindow = new google.maps.InfoWindow({
        content: "Your Position",
      });
      infowindow.open(map(), UserMarker());
      map().setCenter({lat: UserMarker().position.lat(), lng: UserMarker().position.lng()});
    } else {
      let LatLng = { lat: 55.944831503142886, lng: -3.187265119000685 };

      setMAP(new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: LatLng,
      }));
    }

    if (location() === false) {
      const infowindow = new google.maps.InfoWindow({
        content: "Your Position"
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

    shops.map((shop) => {
      const myLatLng = {lat: shop.Lat, lng: shop.Lon};
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
      const shopMarker = new google.maps.Marker({
        position: myLatLng,
        map: map(),
        zIndex: 10,
        title: shop.title,
        animation: "",
        icon: icon
      });
      setShopMaker([...shopsMaker(),shopMarker]);
    });

  }

  function finishInit() {
    
    const walkshops=props.path();
    console.log("Finish Innit ?")

    const directionsService = new google.maps.DirectionsService();

    if(shopsMaker().length) {



      const playerLatlng = {Lat: UserMarker().position.lat(), Lon: UserMarker().position.lng()};
      let toVisit = walkshops;
      walkshops.push(playerLatlng);
      toVisit = [playerLatlng].concat(toVisit);
      const renderArray = [];
        console.log(toVisit);
      for (let i = 0; i < toVisit.length-1; i++) {
        const marker1 = toVisit[i]
        const marker2 = toVisit[i+1];console.log(marker2);
        console.log(marker1.Lat);
        const pos = {lat: marker1.Lat, lng: marker1.Lon};
        const secondPos = {lat: marker2.Lat, lng: marker2.Lon};

        marker1.animation = google.maps.Animation.BOUNCE;
        setTimeout(() => {
          marker1.animation = "";

        }, 5000);
        const request = {
          origin: pos,
          destination: secondPos,
          travelMode: 'WALKING',
        }
        renderArray.push(request);



      }
      console.log("HELLO ????");
      for (let i = 0; i < renderArray.length; i++) {
        console.log(renderArray[i]);
        directionsService.route(renderArray[i], (result, status) => {
          console.log("HELLO ????");
          if (status === google.maps.DirectionsStatus.OK) {

            // Create a unique DirectionsRenderer 'i'
            renderArray[i] = new google.maps.DirectionsRenderer();

            // Some unique options from the colorArray so we can see the routes
            renderArray[i].setOptions({
              preserveViewport: true,
              suppressInfoWindows: true,
              polylineOptions: {
                strokeWeight: 4,
                strokeOpacity: 0.8,
                strokeColor: colours[i]
              },
              markerOptions: {
                icon: {

                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 6,

                },


              }
            });

            // Use this new renderer with the result
            renderArray[i].setDirections(result);
            renderArray[i].setMap(map());
            


          }
        });
      }
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
              setLocation(true);
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
