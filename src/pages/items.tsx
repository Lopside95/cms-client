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
    setItems(res);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const form = useForm<Item>({
    resolver: zodResolver(item),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<Item> = async (data: Item) => {
    try {
      console.log(data);
      const res = await updateItem(data);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main className="flex flex-col gap-4">
          <h3>Items</h3>
          {items?.map((item) => (
            <ItemCard
              onClick={() => navigate(`/items/${item.id}`)}
              key={item.id}
              item={item}
              inputData={{ name: "name", type: "text", label: "Name" }}
            />
          ))}
          <Button type="submit">Submit</Button>
        </main>
      </form>
    </FormProvider>
  );
};

export default Items;
