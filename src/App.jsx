import logo from './assets/CAPY_BANK.png';
import Map from './components/Map.jsx'

function App() {
  return (
    <section class='flex m-auto flex-col items-center'>
      <img src={logo} alt="capy" class='max-w-xl' />
      <Map/>
      <header class='font-bold text-5xl'>Capy Bank</header>
    </section>
  );
}

export default App;
