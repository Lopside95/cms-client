import ItemCard from "@/components/ItemCard";
import { fetchItems } from "@/utils/api";
import { Item, item } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

const Items = () => {
  const [items, setItems] = useState<Item[]>();
  const fetchData = async () => {
    const res = await fetchItems();
    setItems(res);
  };

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <main>
          <h3>Items</h3>
          {items?.map((item) => (
            <ItemCard key={item.id} item={item} />
            // <div key={item.id}>
            //   <p>{item.name}</p>
            //   <p>{item.quantity}</p>
            // </div>
          ))}
        </main>
      </form>
    </FormProvider>
  );
};

export default Items;
