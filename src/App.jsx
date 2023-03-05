import { Show } from 'solid-js';
import Map from './components/Map.jsx'
import Sidebar from './components/Sidebar.jsx'


function App() {
  return (
    <section class='flex m-auto w-screen h-screen font-main overflow-x-hidden'>
      <Sidebar/>
      <Map/>
    </section>
  );
}

export default App;
