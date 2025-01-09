import { Input } from "@/components/ui/input";
import { createItem, fetchItems } from "@/utils/api";
import { Item } from "@/utils/types";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemSchema, ItemSchema } from "@/utils/schemas";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import NumberField from "@/components/NumberField";

const Items = () => {
  const [items, setItems] = useState<Item[] | null>(null);

  const fetchData = async () => {
    const res = await fetchItems();
    setItems(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const form = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      quantity: 0,
    },
  });

  const onSubmit: SubmitHandler<ItemSchema> = async (data: ItemSchema) => {
    try {
      await createItem(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!items) {
    console.log("No items");
  } else {
    console.log(items);
  }

  return (
    <FormProvider {...form}>
      <main className="flex flex-col items-center align-middle ">
        <h1>Items</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 w-1/2"
        >
          <section>
            <TextField name="name" label="Name" />
            <NumberField name="quantity" label="Quantity" />
          </section>
          <Button type="submit">Add Item</Button>
        </form>
      </main>
    </FormProvider>
  );
};

export default Items;
