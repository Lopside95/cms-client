import { Input } from "@/components/ui/input";
import { createItem, fetchItems, updateItem } from "@/utils/api";
import { item, Item } from "@/utils/types";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemSchema, ItemSchema } from "@/utils/schemas";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import NumberField from "@/components/NumberField";
import ItemCard from "@/components/ItemCard";

const AddItem = () => {
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
      itemName: "",
      quantity: 0,
    },
  });

  // const onSubmit: SubmitHandler<Item> = async (data: Item) => {
  //   try {
  //     await updateItem({
  //       id: 4,
  //       name: data.name,
  //       quantity: data.quantity,
  //       updatedAt: new Date(),
  //       createdAt: new Date(),
  //     });
  //     // await createItem(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const vals = form.watch();

  console.log("vals", vals);

  const errors = form.formState.errors;

  console.log("errors", errors);

  useEffect(() => {
    console.log("form errors", errors);
  }, [vals]);

  const onSubmit: SubmitHandler<ItemSchema> = async (data: ItemSchema) => {
    console.log("data", data);

    try {
      await createItem(data);
    } catch (error) {
      console.error(error);
    }
  };

  // if (!items) {
  //   return <p>Loading... or no items</p>;
  // } else {
  //   console.log(items);
  // }

  return (
    <FormProvider {...form}>
      <main className="flex flex-col items-center align-middle ">
        <h1>Items</h1>
        {/* {items?.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))} */}
        {/* <ItemCard item={items && items[0]} /> */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 w-1/2"
        >
          <section>
            {/* <TextField name="itemName" label="Name" /> */}
            <TextField name="itemName" label="Item Name" />
            <NumberField name="quantity" label="Quantity" />
          </section>
          <Button type="submit">Add Item</Button>
        </form>
      </main>
    </FormProvider>
  );
};

export default AddItem;
