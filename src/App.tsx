import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import AddItem from "./pages/AddItem";
import Items from "./pages/Items";
import UpdateItem from "./pages/UpdateItem";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster />
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/items" element={<Items />} />
          <Route path="/items/:id" element={<UpdateItem />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
