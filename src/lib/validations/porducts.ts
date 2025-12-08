import { z } from "zod";

export const productSchema = z.object({
  productName: z
    .string()
    .min(2, "Product name is too short"),
  
  price: z
    .number()
    .positive("Price must be greater than 0"),
  
  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  images: z
    .array(z.instanceof(File))
    .min(1, "Upload at least 1 image")
    .max(5, "You can upload up to 5 images"),
});

export type ProductFormType = z.infer<typeof productSchema>;
