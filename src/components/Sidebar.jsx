import logo from "../assets/CAPY_BANK.png";
import Results from "./Results";
import SearchBar from "./SearchBar";
import { createEffect, createSignal } from "solid-js";

function Sidebar() {
  const [distance, setDistance] = createSignal("");
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
  const [isSearched, setIsSearched] = createSignal(false);
  const [dietArr, setDietArr] = createSignal([]);
  const [exIngrArr, setExIngrArr] = createSignal([]);
  const [incIngrArr, setIncIngrArr] = createSignal([]);

  createEffect(async () => {
    const response = await fetch("./src/assets/ingredients.json");
    setIngredients(await response.json());
  });

  createEffect(() => {
    if(distance() != ""){
      setDistance("");
    }
  });

  createEffect(() => {
    setDietArr(d => diet() == "" ? d : [...d, diet()]);
    setDiet("");
  });

  createEffect(() => {
    setExIngrArr(i => excludeIngr() == "" ? i : [...i, excludeIngr()]);
    setExcludeIngr("");
  });

  createEffect(() => {
    setIncIngrArr(i => includeIngr() == "" ? i : [...i, includeIngr()]);
    setIncludeIngr("");
  });

  return (
    <section class="w-1/4 max-w-72 flex flex-col items-center border-r-2 h-max min-h-screen shadow-lg text-left text-lg xl:text-2xl pb-10">
      <img src={logo} alt="capy" class="my-4 lg:mx-8" />
      {!isSearched() ? (
      <div class="flex flex-col items-start mx-10">
        <p for="distance">Enter travel distance:</p>
        <SearchBar
          input={distance}
          setInput={setDistance}
          arr={() => {
            return Array.from({ length: 1000 }, (_, i) => i + 1);
          }}
          id="distance"
        />
        <p for="excludeFoods">Enter exluded ingredients:</p>
        <SearchBar
          input={excludeIngr}
          setInput={setExcludeIngr}
          arr={ingredients}
          id="excludeFoods"
        />
        <ul>
          <For each={exIngrArr()}>{
            (item, i) =>
            <li>
              {item}
            </li>
          }</For>
        </ul>
        <p for="includeFoods">Enter included ingredients:</p>
        <SearchBar
          input={includeIngr}
          setInput={setIncludeIngr}
          arr={ingredients}
          id="includeFoods"
        />
        <ul>
          <For each={incIngrArr()}>{
            (item, i) =>
            <li>
              {item}
            </li>
          }</For>
        </ul>
        <p for="dietary">Enter dietary requirements:</p>
        <SearchBar input={diet} setInput={setDiet} arr={() => {return diets;}} id="dietary" />
        <ul>
          <For each={dietArr()}>{
            (item, i) =>
            <li>
              {item}
            </li>
          }</For>
        </ul>
        <button class="self-center w-full text-2xl bg-[#00539F] p-1 text-white rounded-xl mt-2">Search</button>
      </div>
      ) : (
        <button onClick={() => setIsSearched(false)} class="self-center w-full text-2xl bg-[#00539F] p-1 text-white rounded-xl mt-3 mb-10 hover:shadow-lg hover:mt-2 transition-all duration-300 hover:bg-blue-500">
          Go back
          </button>
          <Results></Results>
        </div>
      )}
    </section>
  );
}

export default Sidebar;
