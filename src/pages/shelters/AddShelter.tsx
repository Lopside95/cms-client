import { Input } from "@/components/ui/input";
import { Item, Shelter, shelter } from "@/utils/types";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shelterSchema, ShelterSchema } from "@/utils/schemas";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import NumberField from "@/components/NumberField";
import ItemCard from "@/components/ItemCard";
import { useToast } from "@/hooks/use-toast";
import { add, getAll, getByEmail } from "@/utils/api";

const AddShelter = () => {
  const [shelters, setShelters] = useState<Shelter[] | null>(null);

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
      name: "Shelter Default",
      capacity: 10,
      location: "Street",
      phone: "011",
      email: "shelter@email.com",
      longitude: 1,
      latitude: 2,
      // animals: [],
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
      const res = await add<ShelterSchema>({
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

        {/* <section>
          <h2>Shelters</h2>
          <div className="grid grid-cols-3 gap-4">
            {shelters?.map((shelter) => (
              <div className="border" key={shelter.id}>
                <p onClick={() => handleShelter(shelter.email)}>
                  {shelter.email}
                </p>
              </div>
            ))}
          </div>
        </section> */}
      </main>
    </FormProvider>
  );
};

export default AddShelter;
