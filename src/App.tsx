import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import Items from "./pages/items";
import Home from "./pages/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
