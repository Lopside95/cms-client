import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import AddItem from "./pages/items/AddItem";
import Items from "./pages/items/Items";
import UpdateItem from "./pages/items/UpdateItem";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/home";
import AddShelter from "./pages/shelters/AddShelter";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster />
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items/add" element={<AddItem />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<UpdateItem />} />
          <Route path="/shelters/add" element={<AddShelter />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
