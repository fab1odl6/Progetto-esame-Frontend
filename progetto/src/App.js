import HomePage from "./HomePage/components/Homepage";
import Museums from "./Museums/Museums";
import Route from "./components/Route";
import HeaderBar from "./components/HeaderBar";
import { NavigationProvider } from "./context/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import MuseumDetail from "./Museums/MuseumDetail";



function App() {
  return (
    <div>
      <Museums />
    </div>
  );
}

export default App;
