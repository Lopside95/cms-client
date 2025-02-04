import { Input } from "@/components/ui/input";
import { Item } from "@/utils/types";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemSchema, ItemSchema } from "@/utils/schemas";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import NumberField from "@/components/NumberField";
import ItemCard from "@/components/ItemCard";
import { useToast } from "@/hooks/use-toast";
import { create, getAll } from "@/utils/api";

const AddItem = () => {
  const [items, setItems] = useState<Item[] | null>(null);

  const fetchData = async () => {
    const res = await getAll("items");
    setItems(res?.data);
  };

  const { toast } = useToast();

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

  const errors = form.formState.errors;

  useEffect(() => {
    console.log("form errors", errors);
  }, [errors]);

  const onSubmit: SubmitHandler<ItemSchema> = async (data: ItemSchema) => {
    try {
      const res = await create<ItemSchema>({
        route: "items",
        data,
      });

      if (res?.status === 201) {
        toast({
          title: "Item successfully added to the inventory",
          duration: 2000,
        });
        form.reset();

        setTimeout(() => {
          form.setFocus("itemName");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <main className="flex flex-col items-center align-middle ">
        <h1>Items</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 w-1/2"
        >
          <section>
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
