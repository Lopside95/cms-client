import { FormInput, Item } from "@/utils/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import NumberField from "./NumberField";
import TextField from "./TextField";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { ItemSchema, itemSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

interface ItemCardProps {
  item: Item;
  inputData?: FormInput;
  onClick?: () => void;
}

const ItemCard = ({ item, inputData, onClick }: ItemCardProps) => {
  // const {control} = useFormContext();

  const { itemName, quantity, id } = item;
  const createdAt = new Date(item.createdAt);
  const updatedAt = new Date(item.updatedAt);

  // const { name, type, label }: FormInput = inputData;

  return (
    <Card className="w-80" onClick={onClick}>
      <CardHeader>
        <CardTitle> Name: {itemName}</CardTitle>
        <CardDescription>ID: {id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Amount:{quantity}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <p>Last updated: {updatedAt.toLocaleDateString("en-GB")}</p>
        <p>First added: {createdAt.toLocaleDateString("en-GB")}</p>
        {/* <TextField name={name} label={label} /> */}
        {/* <TextField name="name" label="Name" />
        <NumberField name="quantity" label="Quantity" /> */}
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
