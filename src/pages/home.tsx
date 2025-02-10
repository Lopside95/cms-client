import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAll, getByEmail } from "@/utils/api";
import { Shelter } from "@/utils/types";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const [shelters, setShelters] = useState<Shelter[] | null>(null);

  const [fetchedShelter, setFetchedShelter] = useState<Shelter | null>(null);

  const [toSearch, setToSearch] = useState<string>("");

  const formVal = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    const res = await getAll("shelters");
    setShelters(res?.data);
  };

  const handleShelter = async (email: string) => {
    const res = await getByEmail("shelters", email);
    console.log("res", res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!shelters) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="flex flex-col items-center align-middle ">
      <h1>Welcome to the CMS</h1>
      <div className="flex flex-col cursor-pointer gap-3">
        {/* <Input onChange={(e) => setToSearch(e.target.value)} /> */}
        <Input ref={formVal} />
        <Button onClick={() => handleShelter(formVal.current?.value ?? "")}>
          Search
        </Button>
        {shelters.map((shelter) => (
          <div
            key={shelter.id}
            className="border"
            // onClick={() => handleShelter(shelter.email)}
          >
            <h2>{shelter.name}</h2>
            <p>{shelter.location}</p>
            <p>{shelter.email}</p>
            <p>{shelter.phone}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
