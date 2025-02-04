import axios from "axios";
import { format } from "date-fns";
import { ZodSchema } from "zod";
import { AnimalSchema, FoodSchema, ItemSchema, ShelterSchema } from "./schemas";

const formatDate = (date: Date) => format(date, "HH:mm dd.MM.yy");

export { formatDate };
