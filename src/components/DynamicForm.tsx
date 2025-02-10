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
import { z } from "zod";

interface DynamicFormProps {
  schema: z.ZodObject<any>;
}
const DynamicForm = ({ schema }: DynamicFormProps) => {
  //   const fetchData = async () => {};

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  console.log("schema", schema);

  const form = useForm<AnimalSchema>({
    resolver: zodResolver(animalSchema),
    defaultValues: {
      // animals: [],
      // foods: [],
    },
  });

  const errors = form.formState.errors;

  useEffect(() => {
    console.log("form errors", errors);
  }, [errors]);

  const onSubmit: SubmitHandler<AnimalSchema> = async (
    data: AnimalSchema
  ) => {};

  return (
    <main className="flex flex-col items-center align-middle ">
      <h1>Add animal</h1>

      <section>
        <TextField name="name" label="Name" />
        <NumberField name="age" label="Age" />
        <TextField name="name" label="Species" />
        <TextField name="name" label="Breed" />
        <TextField name="chipNumber" label="Chip Number" />
      </section>
      <Button type="submit">Add Shelter</Button>
    </main>
  );
};

export default DynamicForm;
