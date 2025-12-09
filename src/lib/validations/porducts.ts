import { z } from "zod";


const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

export const productSchema = z.object({
  productName: z
    .string()
    .min(2, "Product name is too short"),

  price: z
    .number()
    .positive("Price must be greater than 0"),

  stock: z
  .number()
  .nonnegative("Stock cannot be negative")
  .int("Stock must be an integer"),


  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),


  images: z
    .array(
      z.union([
        z.string(), 
        z
          .instanceof(File)
          .refine(
            (file) => allowedTypes.includes(file.type),
            {
              message: "Only JPEG, JPG, or PNG images are allowed",
            }
          )
      ])
    )
    .min(1, "Upload at least 1 image")
    .max(5, "You can upload up to 5 images"),
});

export type ProductFormType = z.infer<typeof productSchema>;
