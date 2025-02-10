import { Input } from "@/components/ui/input";
import { Animal, Item, shelter } from "@/utils/types";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { foodSchema, FoodSchema } from "@/utils/schemas";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import NumberField from "@/components/NumberField";
import ItemCard from "@/components/ItemCard";
import { useToast } from "@/hooks/use-toast";
import { add, getAll } from "@/utils/api";

const AddFoods = () => {
  const [foods, setFoods] = useState();

  const fetchData = async () => {
    const res = await getAll("animals");
    console.log("res?.data", res?.data);
    setFoods(res?.data);
  };

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const form = useForm<FoodSchema>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      name: "James  ",
      shelterId: 1,
    },
  });

  const errors = form.formState.errors;

  useEffect(() => {
    console.log("form errors", errors);
  }, [errors]);

  const onSubmit: SubmitHandler<FoodSchema> = async (data: FoodSchema) => {
    try {
      const res = await add<FoodSchema>({
        route: "foods",
        data,
      });

      if (res?.status === 201) {
        toast({
          title: "Animal added successfully",
          duration: 2000,
        });
        form.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <main className="flex flex-col items-center align-middle ">
        <h1>Add Food</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 w-1/2"
        >
          <section>
            <TextField name="name" label="Name" />
            <NumberField name="quantity" label="Age" />
            <NumberField name="shelterId" label="Shelter ID" />
          </section>
          <Button type="submit">Add Food</Button>
        </form>
      </main>
    </FormProvider>
  );
};

export default AddFoods;
