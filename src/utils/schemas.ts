import z from "zod";

export const itemSchema = z.object({
  id: z.number().optional(),
  itemName: z.string(),
  quantity: z.number(),
});

export type ItemSchema = z.infer<typeof itemSchema>;
