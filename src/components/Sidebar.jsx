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

  createEffect(async () => {
    const response = await fetch("./src/assets/ingredients.json");
    setIngredients(await response.json());
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
        <p for="dietary">Enter dietary requirements:</p>
        <SearchBar input={diet} setInput={setDiet} arr={() => {return diets;}} id="dietary" />
        <button class="self-center w-full text-2xl bg-[#00539F] p-1 text-white rounded-xl mt-2">Search</button>
      </div>
    </section>
  );
}

export default Sidebar;
