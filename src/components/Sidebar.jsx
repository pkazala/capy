import logo from "../assets/CAPY_BANK.png";
import SearchBar from "./SearchBar";
import { createEffect, createSignal } from "solid-js";

function Sidebar() {
  const [distance, setDistance] = createSignal("");
  const [diet, setDiet] = createSignal("");
  const [excludeIngr, setExcludeIngr] = createSignal("");
  const diets = [
    "vegan",
    "vegetarian",
    "ketogenic",
    "gluten free",
    "pescetarian",
  ];
  const [ingredients, setIngredients] = createSignal([]);

  createEffect(() => {
    console.log(distance());
    setDistance("");
  });

  createEffect(() => {
    console.log(diet());
    setDiet("");
  });

  createEffect(() => {
    console.log(excludeIngr());
    setExcludeIngr("");
  });

  createEffect(async () => {
    const response = await fetch("./src/assets/ingredients.json");
    setIngredients(await response.json());
  });
  return (
    <section class="w-1/4 flex flex-col items-center border-r-2 h-screen shadow-lg p-4 text-left">
      <img src={logo} alt="capy" class="mt-8" />
      <label for="distance">Enter travel distance:</label>
      <SearchBar
        input={distance}
        setInput={setDistance}
        arr={Array.from({ length: 1000 }, (_, i) => i + 1)}
        id="distance"
      />
      <label for="excludeFoods">Enter exluded ingredients:</label>
      <SearchBar
        input={excludeIngr}
        setInput={setExcludeIngr}
        arr={ingredients()}
        id="excludeFoods"
      />
      <label for="dietary">Enter dietary requirements:</label>
      <SearchBar input={diet} setInput={setDiet} arr={diets} id="dietary" />
    </section>
  );
}

export default Sidebar;
