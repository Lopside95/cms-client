import { Item } from "@/utils/types";
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

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const { name, quantity, id } = item;
  const createdAt = new Date(item.createdAt);
  const updatedAt = new Date(item.updatedAt);

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>ID: {id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Amount:{quantity}</p>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <p>Last updated: {updatedAt.toLocaleDateString("en-GB")}</p>
        <p>First added: {createdAt.toLocaleDateString("en-GB")}</p>
        <TextField name="name" label="Name" />
        <NumberField name="quantity" label="Quantity" />
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
