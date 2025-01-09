import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center align-middle bg-gray-100">
      <h3>
        Home
        <div>
          <Button onClick={() => navigate("/items")}> to Items</Button>
        </div>
      </h3>
    </main>
  );
};

export default Home;
