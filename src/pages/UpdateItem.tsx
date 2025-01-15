import ItemCard from "@/components/ItemCard";
import NumberField from "@/components/NumberField";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteContent, getById, update } from "@/utils/api";
import { ItemSchema, itemSchema } from "@/utils/schemas";
import { Item } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";

const UpdateItem = () => {
  const [item, setItem] = useState<Item | null>(null);

  const { id } = useParams();

  const navigate = useNavigate();

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
    const res = await getById("items", Number(id));

    const data = res?.data;
    setItem(data);
    form.reset({
      itemName: data.itemName,
      quantity: data.quantity,
      id: data.id,
    });
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const errors = form.formState.errors;

  useEffect(() => {
    if (errors) {
      console.log("Form Errors", errors);
    }
  }, [errors]);

  const onSubmit: SubmitHandler<ItemSchema> = async (data: ItemSchema) => {
    if (!data) {
      console.log("No data");
    }

    try {
      const res = await update({ route: "items", data });
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteContent("items", id);
      console.log("res", res);
      if (!res || res.status !== 204) {
        console.log("Error deleting item");
      } else {
        navigate("/items");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <FormProvider {...form}>
      <main className="flex flex-col gap-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h3>Items</h3>
          <ItemCard item={item} />
          <TextField name="itemName" label="Item Name" />
          <NumberField name="quantity" label="Quantity" />
          <Button type="submit">Submit</Button>
        </form>
        <Dialog>
          <DialogTrigger className="text-white">Delete Item</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete this item?
              </DialogTitle>
              <DialogDescription>
                This action is irreversible and the item will be permanently
                deleted.
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => handleDelete(item.id)}>Delete Item</Button>
          </DialogContent>
        </Dialog>
      </main>
    </FormProvider>
  );
};

export default UpdateItem;
