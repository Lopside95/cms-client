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
      {/* <Button onClick={()=> navigate("item")}>Update Item</Button> */}
      <Button
        variant={location.pathname === "/items" ? "outline" : "default"}
        onClick={() => navigate("/items")}
      >
        Items
      </Button>
      <Button
        variant={location.pathname === "/shelters/add" ? "outline" : "default"}
        onClick={() => navigate("/shelters")}
      >
        Add Shelter
      </Button>
      <Button
        variant={location.pathname === "/animals/add" ? "outline" : "default"}
        onClick={() => navigate("/animals")}
      >
        Add Animal
      </Button>
      <Button
        variant={location.pathname === "/foods" ? "outline" : "default"}
        onClick={() => navigate("/foods")}
      >
        Add Animal
      </Button>
    </div>
  );
};

export default Navbar;
