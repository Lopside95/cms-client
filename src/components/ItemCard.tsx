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
import { formatDate } from "@/utils/helpers";

interface ItemCardProps {
  item: Item;
  inputData?: FormInput;
  onClick?: () => void;
}

const ItemCard = ({ item, inputData, onClick }: ItemCardProps) => {
  const { itemName, quantity, id, createdAt, updatedAt } = item;

  return (
    <Card className="w-80" onClick={onClick}>
      <CardHeader>
        <CardTitle> Name: {itemName}</CardTitle>
        <CardDescription>ID: {id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Amount:{quantity}</p>
      </CardContent>
      <CardFooter className="flex items-start flex-col gap-2">
        <p>{`Added: ${formatDate(createdAt)}`}</p>
        <p>{`Last updated: ${formatDate(updatedAt)}`}</p>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
