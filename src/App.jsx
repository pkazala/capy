
import { createSignal, createEffect } from 'solid-js';

import { Show } from 'solid-js';

import Map from './components/Map.jsx'
import Sidebar from './components/Sidebar.jsx'


function App() {
  const c = document.createElement("p");
   c.id = "bruh";
   c.style.visibility = 'hidden';
   document.getElementById("root").appendChild(c);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (e) => {
            setLoc([
              (e.coords.latitude),
              (e.coords.longitude),
            ]);

          },
          () => {},
          { enableHighAccuracy: true }
      );
    }
  }
  createEffect(() => {
    getLocation();
loc();
  })
  const shops = [
    {title:"Sainsbury's",Lat:55.95385154368854,Lon:-3.194370456886452,Ing:["Bread","vinegar","Grapes"]},
    {title:"Sainsbury's",Lat:55.949063888569064,Lon:-3.189514369792723,Ing:["Lmao","vinegar","Grapes"]},
    {title:"Sainsbury's",Lat:55.946435470253384,Lon:-3.1812146030759427,Ing:["Bread","vinegar","Grapes"]},
    {title:"Sainsbury's",Lat:55.94469887960705,Lon:-3.1909595409774085,Ing:["Bread","Jam","Grapes"]},
    {title:"Sainsbury's",Lat:55.94138349407988,Lon:-3.1830218464726507,Ing:["Bread","vinegar","Grapes"]},
    {title:"Sainsbury's",Lat:55.93863400095199,Lon:-3.1776829585610447,Ing:["Coco","vinegar","Grapes"]},
    {title:"Sainsbury's",Lat:55.946437413813335,Lon:-3.2006310538438365,Ing:["Boba","vinegar","Grapes"]},
    {title:"Sainsbury's",Lat:55.93665631556673,Lon:-3.197673533205771,Ing:["Bread","vinegar","Bruh"]},
    {title:"Sainsbury's",Lat:55.9465988281203,Lon:-3.195795114460836,Ing:["USB","vinegar","Grapes"]},
    {title:"Sainsbury's",Lat:55.9459927792938,Lon:-3.210086245316522,Ing:["Bread","Pen","Grapes"]},
    {title:"Sainsbury's",Lat:55.94465897177873,Lon:-3.2110243266867613,Ing:["Bread","vinegar","Grapes"]},
    {title:"Sainsbury's",Lat:55.94203146185667,Lon:-3.2164366231323682,Ing:["Cola","vinegar","Grapes"]},
    {title:"Sainsbury's",Lat:55.957107569334525,Lon:-3.1994025214387443,Ing:["Bread","Jafa","Grapes"]},
    {title:"Sainsbury's",Lat:55.95844138217219,Lon:-3.2097270115166827,Ing:["Bread","vinegar","Redbulls"]},{title:"Tesco",Lat:55.94522887871374,Lon:-3.183496555234711,Ing:["Bread","vinegar","Grapes"]},
    {title:"Tesco",Lat:55.9486586942626,Lon:-3.185128269690482,Ing:["Bread","vinegar","Grapes"]},
    {title:"Tesco",Lat:55.95070338153543,Lon:-3.177226817339035,Ing:["Bread","vinegar","Grapes"]},
    {title:"Tesco",Lat:55.936404084488515,Lon:-3.1802697204901813,Ing:["Bread","vinegar","Grapes"]},
    {title:"Tesco",Lat:55.94468701939951,Lon:-3.205127861731589,Ing:["Bread","vinegar","Grapes"]},
    {title:"Tesco",Lat:55.94366702845466,Lon:-3.210286278155731,Ing:["Bread","vinegar","Grapes"]},
    {title:"Tesco",Lat:55.950498532187844,Lon:-3.207678316630654,Ing:["Bread","vinegar","Grapes"]},
    {title:"Tesco",Lat:55.95743127388005,Lon:-3.190498710992911,Ing:["Bread","vinegar","Grapes"]},
    {title:"Tesco",Lat:55.95783939470905,Lon:-3.1965087912209715,Ing:["Bread","vinegar","Grapes"]},
    {title:"Lidl",Lat:55.94578624452127,Lon:-3.184618783062567,Ing:["Bread","vinegar","Grapes"]},
    {title:"Co-op",Lat:55.94072359534659,Lon:-3.1780968570848587,Ing:["Bread","vinegar","Grapes"]},
    {title:"Co-op",Lat:55.9393302830312,Lon:-3.192241874564685,Ing:["Bread","vinegar","Grapes"]},
    {title:"Co-op",Lat:55.938380481505554,Lon:-3.195489267325286,Ing:["Bread","vinegar","Grapes"]},
    ]

  // const shops = [
  //   {title:"Tescos's",Lat:55.95385154368854,Lon:-3.194370456886452,Ing:["Bread","vinegar","Grapes"]},
  //   {title:"Sainsbury's",Lat:55.949063888569064,Lon:-3.189514369792723,Ing:["Bread","vinegar","Grapes"]},
  //   {title:"Joisie's Puss",Lat:55.949063888569064,Lon:-3.189514369792723,Ing:["Bread","vinegar","Grapes"]},
  //   ]


  const [loc,setLoc] = createSignal([]);
  const [distance, setDistance] = createSignal("");
  const [walkableShops, setWalkableShops] = createSignal([]);
  const [dietArr, setDietArr] = createSignal([]);
  const [path, setPath] = createSignal([]);
  const [exIngrArr, setExIngrArr] = createSignal([]);
  const [incIngrArr, setIncIngrArr] = createSignal([]);

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

  function search(){
    console.log("called search");
    const [player,setPlayer]= createSignal([]);
    console.log(loc())

    setPlayer({title:"Player",Lat:55.95743127388005,Lon:-3.190498710992911,Ing:incIngrArr()})
   // setPlayer({title:"Player",Lat:parseFloat(loc()[0]),Lon:parseFloat(loc()[1]),Ing:incIngrArr()})
    console.log(player());
    console.log(walkableShops());
    let VL = [];
    setWalkableShops(findViable(player(),parseInt(distance())/100,shops))
    // console.log("bruh",walkableShops())

    function findViable(start,maxdis,array){

      let poopoopeepee = []
      for (let i = 0; i<array.length; i++){

        let v1 = calculateDistance(start.Lat, start.Lon, array[i].Lat, array[i].Lon);
        let v2 = calculateDistance(array[i].Lat, array[i].Lon, player().Lat, player().Lon);
        if(v1 + v2 < maxdis){

          
          poopoopeepee.push(i);
          VL.push([...poopoopeepee]);

          let arraya = array.slice(0,i).concat(i>array.length ? [] : array.slice(i+1))

          findViable(array[i], maxdis - v1, arraya);
        }
      }
      let uniqueVL = [];
      for (let i =0; i<VL.length;i++){
        let temp =VL[i].sort().toString()
        if (!uniqueVL.includes(temp)){
          uniqueVL.push(temp)
        }
      }
      let output =[];
      uniqueVL.map( e=>
        output.push(JSON.parse("[" + e + "]"))
      )
      
      return output;

    }
    console.log(walkableShops())
    // let fml =[{"path":"player+walkacbleshops+player","ing":"unqiue list that is a combo of the path"},{}]
    let fml =[]
    walkableShops().map((p)=>{
      let temp = [player()]
      let uniqueIng=player().Ing
      console.log(uniqueIng);
      p.map((i)=>{
        let shop=shops[i]
        console.log(shop)
        temp.push(shop);
        shop.Ing.map((ing)=>{
          if(!uniqueIng.includes(ing)){uniqueIng.push(ing)}
        })
      })
      temp.push(player());
      fml.push({"path":temp,"Ing":uniqueIng});
    });
    console.log("fml",fml)
    let recipes = []
    for (let i = 0;i<fml.length;i++){
      let ing = fml[i].Ing.toString()
      console.log(ing)
      let recipe = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=e677f976977f475b8f02d5530cac525d&number=1&ingredients="+ing+",&excludeIngredients="+exIngrArr()+",&diet="+dietArr()
      console.log(recipe)
      recipes.push({"recipe":recipe,"path":fml[i].path})
    }
 
    document.getElementById("bruh").innerText = VL.toString();
 
    console.log(recipes)
    return recipes;
    //get {https://api.spoonacular.com/recipes/findByIngredients?apiKey=e677f976977f475b8f02d5530cac525d&number=1&ingredients={ing},&black={exIngrArr()},&diet=dietArr()}
   }
  const examle = [

    {
      "title": "Sainsbury's",
      "Lat": 55.95385154368854,
      "Lon": -3.194370456886452,
      "Ing": [
        "Bread",
        "vinegar",
        "Grapes"
      ]
    },
    {
      "title": "Sainsbury's",
      "Lat": 55.957107569334525,
      "Lon": -3.1994025214387443,
      "Ing": [
        "Bread",
        "Jafa",
        "Grapes"
      ]
    },
    {
      "title": "Tesco",
      "Lat": 55.95743127388005,
      "Lon": -3.190498710992911,
      "Ing": [
        "Bread",
        "vinegar",
        "Grapes"
      ]
    },
    {
      "title": "Tesco",
      "Lat": 55.95783939470905,
      "Lon": -3.1965087912209715,
      "Ing": [
        "Bread",
        "vinegar",
        "Grapes"
      ]
    }

  ]
  // setPath(examle);
  function func(path){
    
    console.log(path)
    console.log("i was called");
    setPath(path)
    document.getElementById("bruh").innerText = path.toString();
  }
  return (
<section class='flex m-auto w-screen h-screen font-main overflow-x-hidden'>
      <Sidebar path={path} setPath={func} shops={shops} walkableShops={walkableShops} distanceSignal={[distance, setDistance]} dietSignal={[dietArr, setDietArr]} excludeSignal={[exIngrArr, setExIngrArr]} includeSignal={[incIngrArr, setIncIngrArr]} search={search}/>


    <Map playerLoc={loc} shops={shops} walkshops={walkableShops} path={path}/>


    </section>
  );
}

export default App;
