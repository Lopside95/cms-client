import z from "zod";

export const item = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type FormInput = {
  name: string;
  type?: string;
  label: string;
};

export type Item = z.infer<typeof item>;
