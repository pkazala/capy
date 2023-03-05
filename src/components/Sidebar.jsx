import logo from "../assets/CAPY_BANK.png";
import Results from "./Results";
import SearchBar from "./SearchBar";
import Picker from "./Picker";
import { createEffect, createSignal } from "solid-js";

function Sidebar(props) {
  const [distance, setDistance] = props.distanceSignal;
  const [diet, setDiet] = createSignal("");
  const [excludeIngr, setExcludeIngr] = createSignal("");
  const [includeIngr, setIncludeIngr] = createSignal("");
  const diets = [
    "vegan",
    "vegetarian",
    "ketogenic",
    "gluten free",
    "pescetarian",
  ];
  const [ingredients, setIngredients] = createSignal([]);

  const [dietArr, setDietArr] = props.dietSignal;
  const [exIngrArr, setExIngrArr] = props.excludeSignal;
  const [incIngrArr, setIncIngrArr] = props.includeSignal;
  const [isSearched, setIsSearched] = createSignal(false);

  createEffect(async () => {
    const response = await fetch("./src/assets/ingredients.json");
    setIngredients(await response.json());
  });

  createEffect(() => {
    setDietArr((d) => (diet() == "" ? d : [...d, diet()]));
    setDiet("");
  });

  createEffect(() => {
    setExIngrArr((i) => (excludeIngr() == "" ? i : [...i, excludeIngr()]));
    setExcludeIngr("");
  });

  createEffect(() => {
    setIncIngrArr((i) => (includeIngr() == "" ? i : [...i, includeIngr()]));
    setIncludeIngr("");
  });

  function exec() {
    setIsSearched(true);
    props.search();
  }

  return (
    <section class="w-1/4 max-w-72 flex flex-col items-center border-r-2 pb-10 h-max min-h-screen shadow-lg text-left text-lg xl:text-2xl">
      <img src={logo} alt="capy" class="my-4 lg:mx-8" />
      {!isSearched() ? (
        <div class="flex flex-col items-start mx-10">
          <p class="font-bold" for="distance">Enter travel distance:</p>
          <SearchBar
            input={distance}
            setInput={setDistance}
            arr={() => {
              return Array.from({ length: 1000 }, (_, i) => i + 1);
            }}
            id="distance"
          />
          <p class="font-bold" for="excludeFoods">Enter exluded ingredients:</p>
          <SearchBar
            input={excludeIngr}
            setInput={setExcludeIngr}
            arr={ingredients}
            id="excludeFoods"
          />
          <ul>
            <For each={exIngrArr()}>{(item, i) => <li>{item}</li>}</For>
          </ul>

          <p class="font-bold" for="includeFood">Enter food in cupboard:</p>
          <SearchBar
            input={includeIngr}
            setInput={setIncludeIngr}
            arr={ingredients}
            id="includeFoods"
          />
          <ul>
            <For each={incIngrArr()}>{(item, i) => <li>{item}</li>}</For>
          </ul>
          <p class="font-bold" for="dietary">Enter dietary requirements:</p>

          <Picker diets={diets} dietSet={setDietArr} />
          <button
            onClick={exec}
            class="self-center w-full text-2xl bg-[#00539F] p-1 text-white rounded-xl mt-3 hover:shadow-lg hover:mt-2 transition-all duration-300 hover:bg-blue-500"
          >

            Search
          </button>
        </div>
      ) : (
        <div class="flex flex-col gap-4 items-center mx-10 mr-[3.65rem]">
          <Results path={props.path} setPath={props.setPath} shops={props.shops} walkableShops={props.walkableShops} diet={dietArr} exclude={exIngrArr} include={incIngrArr}></Results>
          <button
            onClick={() => {setIsSearched(false); setDietArr([]); setExIngrArr([]); setIncIngrArr([]);}}
            class="self-center w-9/12 text-2xl bg-[#00539F] p-1 text-white rounded-xl mt-3 hover:shadow-lg hover:mt-2 transition-all duration-300 hover:bg-blue-500"
          >
            Go back
          </button>
        </div>
      )}
    </section>
  );
}

export default Sidebar;
