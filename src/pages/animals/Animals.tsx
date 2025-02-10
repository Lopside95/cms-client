import { Input } from "@/components/ui/input";
import { Animal, Item, shelter } from "@/utils/types";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  animalSchema,
  AnimalSchema,
  shelterSchema,
  ShelterSchema,
} from "@/utils/schemas";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import NumberField from "@/components/NumberField";
import ItemCard from "@/components/ItemCard";
import { useToast } from "@/hooks/use-toast";
import { add, getAll } from "@/utils/api";

const AddAnimal = () => {
  const [animals, setAnimals] = useState<Animal[] | null>(null);

  const fetchData = async () => {
    const res = await getAll("animals");
    console.log("res?.data", res?.data);
    setAnimals(res?.data);
  };

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const form = useForm<AnimalSchema>({
    resolver: zodResolver(animalSchema),
    defaultValues: {
      name: "James  ",
      age: 1,
      species: "dofg  ",
      breed: "gofg",
      chipNumber: "121212",
      shelterId: 1,
    },
  });

  const errors = form.formState.errors;

  useEffect(() => {
    console.log("form errors", errors);
  }, [errors]);

  const onSubmit: SubmitHandler<AnimalSchema> = async (data: AnimalSchema) => {
    try {
      const res = await add<AnimalSchema>({
        route: "animals",
        data,
      });

      if (res?.status === 201) {
        toast({
          title: "Animal added successfully",
          duration: 2000,
        });
        form.reset();

        // setTimeout(() => {
        //   form.setFocus("itemName");
        // }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...form}>
      <main className="flex flex-col items-center align-middle ">
        <h1>Add animal</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 w-1/2"
        >
          <section>
            <TextField name="name" label="Name" />
            <NumberField name="age" label="Age" />
            <NumberField name="shelterId" label="Shelter ID" />
            <TextField name="species" label="Species" />
            <TextField name="breed" label="Breed" />
            <TextField name="chipNumber" label="Chip Number" />
          </section>
          <Button type="submit">Add Animal</Button>
        </form>
      </main>
    </FormProvider>
  );
};

export default AddAnimal;
