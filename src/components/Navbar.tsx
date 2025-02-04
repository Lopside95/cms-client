import { useLocation, useNavigate } from "react-router";
import { Button } from "./ui/button";

const Navbar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <div className="fixed top-0 bg-slate-500 w-full p-4 shadow-md flex ">
      <Button
        variant={location.pathname === "/" ? "outline" : "default"}
        onClick={() => navigate("/")}
      >
        Home
      </Button>
      <Button
        variant={location.pathname === "/add-item" ? "outline" : "default"}
        onClick={() => navigate("/items/add")}
      >
        Add Item
      </Button>
      {/* <Button onClick={()=> navigate("item")} >Update Item</Button> */}
      <Button
        variant={location.pathname === "/items" ? "outline" : "default"}
        onClick={() => navigate("/items")}
      >
        All Items
      </Button>
      <Button
        variant={location.pathname === "/shelters/add" ? "outline" : "default"}
        onClick={() => navigate("/shelters/add")}
      >
        Add Shelter
      </Button>
    </div>
  );
};

export default Navbar;
