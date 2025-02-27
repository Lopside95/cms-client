import z from "zod";
import { animal, food } from "./types";

export const itemSchema = z.object({
  id: z.number().optional(),
  itemName: z.string().min(1, { message: "Item name is required" }),
  quantity: z.number(),
});

export const animalSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  species: z.string(),
  age: z.number(),
  chipNumber: z.string(),
  shelterId: z.number(),
  breed: z.string(),
});

export const foodSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  quantity: z.number(),
  shelterId: z.number(),
});

export const shelterSchema = z.object({
  name: z.string(),
  location: z.string(),
  phone: z.string(),
  email: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  capacity: z.number(),
  animals: z.array(animal).optional(),
  foods: z.array(food),
});

export type AnimalSchema = z.infer<typeof animalSchema>;
export type ShelterSchema = z.infer<typeof shelterSchema>;
export type FoodSchema = z.infer<typeof foodSchema>;

export type ItemSchema = z.infer<typeof itemSchema>;
