import Script from "./Script";
import { createEffect, createSignal } from 'solid-js';

function Map() {
  Script("https://polyfill.io/v3/polyfill.min.js?features=default");
  let map;

  let [loc, setLoc] = createSignal([]);
  let [center, setC] = createSignal(0);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((e) => {
        setLoc([e.coords.latitude, e.coords.longitude]);
        setC({
          lat: e.coords.latitude,
          lng: e.coords.longitude,
        });
      }, () => {
      }, {enableHighAccuracy: true})
    }
  }

  createEffect(() => {
    getLocation();
    center();

  })
  createEffect(() => {
    getLocation();
    loc();


  });


  createEffect(() => {
    console.log(calculateDistance(55.95333709746188, -3.194140510650442, 55.95275837083679, -3.1903639120341842));
  })

  // distance in km
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
  }
  const shops = [
    {title: "Sainsbury's", Lat: 55.95385154368854, Lon: -3.194370456886452, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Sainsbury's", Lat: 55.949063888569064, Lon: -3.189514369792723, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Sainsbury's", Lat: 55.946435470253384, Lon: -3.1812146030759427, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Sainsbury's", Lat: 55.94469887960705, Lon: -3.1909595409774085, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Sainsbury's", Lat: 55.94138349407988, Lon: -3.1830218464726507, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Sainsbury's", Lat: 55.93863400095199, Lon: -3.1776829585610447, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Sainsbury's", Lat: 55.946437413813335, Lon: -3.2006310538438365, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Sainsbury's", Lat: 55.93665631556673, Lon: -3.197673533205771, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Sainsbury's", Lat: 55.9465988281203, Lon: -3.195795114460836, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Sainsbury's", Lat: 55.9459927792938, Lon: -3.210086245316522, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Sainsbury's", Lat: 55.94465897177873, Lon: -3.2110243266867613, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Sainsbury's", Lat: 55.94203146185667, Lon: -3.2164366231323682, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Sainsbury's", Lat: 55.957107569334525, Lon: -3.1994025214387443, Ing: ["Bread", "vinegar", "Grapes"]},
    {
      title: "Sainsbury's",
      Lat: 55.95844138217219,
      Lon: -3.2097270115166827,
      Ing: ["Bread", "vinegar", "Grapes"]
    }, {title: "Tesco", Lat: 55.94522887871374, Lon: -3.183496555234711, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Tesco", Lat: 55.9486586942626, Lon: -3.185128269690482, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Tesco", Lat: 55.95070338153543, Lon: -3.177226817339035, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Tesco", Lat: 55.936404084488515, Lon: -3.1802697204901813, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Tesco", Lat: 55.94468701939951, Lon: -3.205127861731589, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Tesco", Lat: 55.94366702845466, Lon: -3.210286278155731, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Tesco", Lat: 55.950498532187844, Lon: -3.207678316630654, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Tesco", Lat: 55.95743127388005, Lon: -3.190498710992911, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Tesco", Lat: 55.95783939470905, Lon: -3.1965087912209715, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Lidl", Lat: 55.94578624452127, Lon: -3.184618783062567, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Co-op", Lat: 55.94072359534659, Lon: -3.1780968570848587, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Co-op", Lat: 55.9393302830312, Lon: -3.192241874564685, Ing: ["Bread", "vinegar", "Grapes"]},
    {title: "Co-op", Lat: 55.938380481505554, Lon: -3.195489267325286, Ing: ["Bread", "vinegar", "Grapes"]},
  ]

  function initMap() {
    let location = false;
    let UserMarker = ""
    const loca = loc();
    const cen = center;
    if (loca.length > 0) {
      location = true;
    }
    console.log(loca.length);
    let map = ""
    if (location === true) {
      let LatLng = center();
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: {lat: loca[0], lng: loca[1]}
      });


      UserMarker = new google.maps.Marker({
        position: cen(),
        map,
        title: "Our Position",
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png"
      });
      const infowindow = new google.maps.InfoWindow({
        content: "Your Position"
      });
      infowindow.open(map, UserMarker);
      map.setCenter({lat: UserMarker.position.lat(), lng: UserMarker.position.lng()});
    } else {
      let LatLng = {lat: 55.944831503142886, lng: -3.187265119000685};

      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: LatLng,
      });
    }
    let shopsMarker = [];
    shops.map((shop) => {

      const myLatLng = {lat: shop.Lat, lng: shop.Lon};
      const shopMarker = new google.maps.Marker({
        position: myLatLng,
        map,
        title: shop.title,
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
      });
      shopsMarker.push(shopMarker);
    })
    if (location === false) {
      const infowindow = new google.maps.InfoWindow({
        content: "Your Position"
      });

      let pos = "";
      google.maps.event.addListener(map, "click", (e) => {
        if (UserMarker) {
          UserMarker.setMap(null);
          UserMarker = null
        }


        pos = {lat: e.latLng.lat(), lng: e.latLng.lng()}
        UserMarker = new google.maps.Marker({
          position: pos,
          map,
          title: "Position",
          icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png"
        });
        infowindow.open(map, UserMarker);
      });

    }
    const directionsService = new google.maps.DirectionsService();



    const secondMarker = shopsMarker[0];
    let marker1 = UserMarker;
    const toVisit = [shopsMarker[0], shopsMarker[1], shopsMarker[2], UserMarker];
    const renderArray = [];

    for (let i = 0; i < toVisit.length; i++) {

      const marker2 = toVisit[i];
      console.log(marker2);
      const pos = {lat: marker1.position.lat(), lng: marker1.position.lng()}
      const secondPos = {lat: marker2.position.lat(), lng: marker2.position.lng()}


      const request = {
        origin: pos,
        destination: secondPos,
        travelMode: 'WALKING',
      }
      renderArray.push(request);

      marker1 = marker2;
      //directionRenderer.setMap(null)
      //directionRenderer.setMap(map);
      //  directionRenderer.setDirections(result);
    }

    for(let i = 0; i < renderArray.length;i++){
      directionsService.route(renderArray[i], (result,status)=>{

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

          },
          markerOptions:{
            icon:{
              path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              scale: 3,

            }
          }
        });

        // Use this new renderer with the result
        renderArray[i].setDirections(result);
          renderArray[i].setMap(map);






        }
      });
    }
  }







  Script(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8OAF_09DCaMjEz6MdVSYqdPc7JreJybQ&callback=initMap&v=weekly"
  );
  window.initMap = initMap;


  return <div id="map" class="w-3/4 h-9/10 rounded-xl m-10"></div>;
}

export default Map;
