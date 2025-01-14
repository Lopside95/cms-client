import ItemCard from "@/components/ItemCard";
import NumberField from "@/components/NumberField";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchItemById, fetchItems, updateItem } from "@/utils/api";
import { ItemSchema, itemSchema } from "@/utils/schemas";
import { Item } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";

const UpdateItem = () => {
  const [item, setItem] = useState<Item | null>(null);

  const { id } = useParams();

  const form = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      itemName: item?.itemName || "",
      quantity: item?.quantity || 0,
      id: item?.id || 0,
    },
  });

  const fetchData = async () => {
    if (!id) {
      console.log("No id");
    }
    const res = await fetchItemById(Number(id));

    console.log(res);

    setItem(res);
    form.reset({
      itemName: res.itemName,
      quantity: res.quantity,
      id: res.id,
    });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const watch = form.watch();

  console.log("watch", watch);

  const onSubmit: SubmitHandler<ItemSchema> = async (data: ItemSchema) => {
    if (!data) {
      console.log("No data");
    }

    try {
      console.log(data);
      const res = await updateItem(data);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main className="flex flex-col gap-4">
          <h3>Items</h3>
          <ItemCard item={item} />
          <TextField name="itemName" label="Item Name" />
          <NumberField name="quantity" label="Quantity" />
          {/* <Input type="hidden" name="id" defaultValue={item.id} /> */}
          <Button type="submit">Submit</Button>
        </main>
      </form>
    </FormProvider>
  );
};

export default UpdateItem;
