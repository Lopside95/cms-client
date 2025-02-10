import { BrowserRouter, Route, Routes } from "react-router";
import UpdateItem from "./pages/items/UpdateItem";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/home";
import AddShelter from "./pages/shelters/Shelters";
import AddAnimal from "./pages/animals/Animals";
import AddFoods from "./pages/foods/Foods";
import Items from "./pages/items/Items";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster />
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<Items />} />
          {/* <Route path="/items" element={<Items />} /> */}
          <Route path="/items/:id" element={<UpdateItem />} />
          <Route path="/shelters" element={<AddShelter />} />
          <Route path="/animals" element={<AddAnimal />} />
          <Route path="/foods" element={<AddFoods />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
