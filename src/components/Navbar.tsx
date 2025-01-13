import { useNavigate } from "react-router";
import { Button } from "./ui/button";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate("/")}>Home</Button>
      <Button onClick={() => navigate("/add-item")}>Add Item</Button>
      {/* <Button onClick={()=> navigate("item")} >Update Item</Button> */}
      <Button onClick={() => navigate("/items")}>All Items</Button>
    </div>
  );
};

export default Navbar;
