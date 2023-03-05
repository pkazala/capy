import logo from "../assets/CAPY_BANK.png";
import SearchBar from "./SearchBar";
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

  createEffect(async () => {
    const response = await fetch("./src/assets/ingredients.json");
    setIngredients(await response.json());
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
    <section class="w-1/4 max-w-72 flex flex-col items-center border-r-2 h-screen shadow-lg text-left text-lg xl:text-2xl">
      <img src={logo} alt="capy" class="my-4" />
      <div class="flex flex-col items-start mx-10">
        <p for="distance">Enter travel distance:</p>
        <SearchBar
          input={distance}
          setInput={setDistance}
          arr={() => {return Array.from({ length: 1000 }, (_, i) => i + 1);}}
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
        <button class="self-center w-full text-2xl bg-[#00539F] p-1 text-white rounded-xl mt-2" onclick={props.search}>Search</button>
      </div>
    </section>
  );
}

export default Sidebar;
