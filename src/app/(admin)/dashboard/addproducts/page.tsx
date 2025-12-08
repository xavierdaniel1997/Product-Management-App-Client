"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploader from "../../../../components/forms/ImageUploader";
import { ProductFormType, productSchema } from "@/lib/validations/porducts";
import { useCreateProduct } from "@/hooks/useCreateProduct";

export default function AddProductPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      price: 0,
      description: "",
      images: [],
    },
  });

  const images = watch("images");

  const createProduct = useCreateProduct();

  const onSubmit = (data: ProductFormType) => {
    createProduct.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <h1 className="text-xl font-semibold mb-6 text-center">
        Add New Product
      </h1>

      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        {/* PRODUCT DETAILS */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-300">
          <h2 className="text-lg font-semibold mb-4">Product Details</h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Product Name</label>
              <input
                {...register("productName")}
                type="text"
                placeholder="e.g. Premium Wireless Headphones"
                className="mt-1 w-full rounded-md border border-gray-300 p-3 bg-gray-50"
              />
              {errors.productName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productName.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="text-sm text-gray-600">Price</label>
              <div className="flex items-center gap-0 mt-1">
                <span className="px-4 py-3 bg-gray-100 rounded-l-md border border-gray-300 border-r-0">
                  ₹
                </span>
                <input
                  {...register("price", { valueAsNumber: true })}
                  type="number"
                  placeholder="0.00"
                  className="w-full rounded-r-md border border-gray-300 p-3 bg-gray-50"
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-600">Description</label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Enter a detailed description of the product..."
                className="mt-1 w-full rounded-md border border-gray-300 p-3 bg-gray-50"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* PRODUCT IMAGES */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-300">
          <h2 className="text-lg font-semibold mb-4">Product Images</h2>

          <ImageUploader
            images={images}
            setImages={(imgs) =>
              setValue("images", imgs, { shouldValidate: true })
            }
          />

          {errors.images && (
            <p className="text-red-500 text-sm mt-2">{errors.images.message}</p>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            className="w-1/2 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createProduct.isPending}
            className={`w-1/2 py-3 rounded-lg text-white transition
    ${
      createProduct.isPending
        ? "bg-black/40 cursor-not-allowed"
        : "bg-black/70 hover:bg-black"
    }
  `}
          >
            {createProduct.isPending ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
