import { createEffect, createSignal } from 'solid-js';
import logo from './assets/CAPY_BANK.png';
import Map from './components/Map.jsx'
import SearchBar from './components/SearchBar';

function App() {

  const [input, setInput] = createSignal("");
  const validInputs = ["apple", "banana", "crack"];

  createEffect(() => {
    console.log(input());
    setInput("");
  })

  return (
    <section class='flex m-auto flex-col items-center'>
      <img src={logo} alt="capy" class='max-w-xl' />
      <SearchBar input={input} setInput={setInput} arr={validInputs} />
      <Map/>
      <header class='font-bold text-5xl'>Capy Bank</header>
    </section>
  );
}

export default App;
