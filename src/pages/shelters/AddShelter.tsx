import { Input } from "@/components/ui/input";
import { Item, shelter } from "@/utils/types";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shelterSchema, ShelterSchema } from "@/utils/schemas";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import NumberField from "@/components/NumberField";
import ItemCard from "@/components/ItemCard";
import { useToast } from "@/hooks/use-toast";
import { create, getAll } from "@/utils/api";

const AddShelter = () => {
  const [shelters, setShelters] = useState<Item[] | null>(null);

  const fetchData = async () => {
    const res = await getAll("shelters");
    console.log("res?.data", res?.data);
    setShelters(res?.data);
  };

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const form = useForm<ShelterSchema>({
    resolver: zodResolver(shelterSchema),
    defaultValues: {
      // animals: [],
      // foods: [],
    },
  });

  const errors = form.formState.errors;

  useEffect(() => {
    console.log("form errors", errors);
  }, [errors]);

  const onSubmit: SubmitHandler<ShelterSchema> = async (
    data: ShelterSchema
  ) => {
    try {
      const res = await create<ShelterSchema>({
        route: "shelters",
        data,
      });

      if (res?.status === 201) {
        toast({
          title: "Shelter added successfully",
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
        <h1>Items</h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 w-1/2"
        >
          <section>
            <TextField name="name" label="Shelter Name" />
            <NumberField name="capacity" label="Capacity" />
            <TextField name="location" label="Location" />
            <TextField name="phone" label="Phone" />
            <TextField name="email" label="Email" />
            <NumberField name="longitude" label="Longitude" />
            <NumberField name="latitude" label="Latitude" />
          </section>
          <Button type="submit">Add Shelter</Button>
        </form>
      </main>
    </FormProvider>
  );
};

export default AddShelter;
