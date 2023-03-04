import { createEffect, createSignal } from 'solid-js';
import logo from './assets/CAPY_BANK.png';
import Map from './components/Map.jsx'
import SearchBar from './components/SearchBar';
import Sidebar from './components/Sidebar.jsx'


function App() {

  const [input, setInput] = createSignal("");
  const validInputs = ["apple", "banana", "crack"];
  const [ingredients, setIngredients] = createSignal([]);

  createEffect(() => {
    console.log(input());
    setInput("");
  })

  createEffect(async() => {
    const response = await fetch('./src/assets/ingredients.json');
    setIngredients(await response.json());
  })

  return (
    <section class='flex m-auto w-screen h-screen'>
      <Sidebar/>
      <img src={logo} alt="capy" class='max-w-xl' />
      <label for="distance">Enter travel distance</label>
      <SearchBar input={input} setInput={setInput} arr={Array.from({ length: 1000 }, (_, i) => i + 1)} id="distance" />
      <label for="excludeFoods">Enter exluded ingredients</label>
      <SearchBar input={input} setInput={setInput} arr={ingredients()} id="excludeFoods" />
      <label for="dietary">Enter dietary requirements</label>
      <SearchBar input={input} setInput={setInput} arr={validInputs} id="dietary" />
      <Map/>
    </section>
  );
}

export default App;
