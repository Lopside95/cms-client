import ItemCard from "@/components/ItemCard";
import NumberField from "@/components/NumberField";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchItems, updateItem } from "@/utils/api";
import { Item, item } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const Items = () => {
  const [items, setItems] = useState<Item[] | null>();
  const fetchData = async () => {
    const res = await fetchItems();
    setItems(res?.data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="">
      <h1>Items</h1>
      <section className="flex flex-wrap">
        {items?.map((item) => (
          <ItemCard
            onClick={() => navigate(`/items/${item.id}`)}
            key={item.id}
            item={item}
            inputData={{ name: "name", type: "text", label: "Name" }}
          />
        ))}
      </section>
      <Button type="submit">Submit</Button>
    </main>
  );
};

export default Items;
