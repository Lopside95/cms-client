import z from "zod";

export const itemSchema = z.object({
  id: z.number().optional(),
  itemName: z.string().min(1, { message: "Item name is required" }),
  quantity: z.number(),
});

export type ItemSchema = z.infer<typeof itemSchema>;
