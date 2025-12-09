"use client";

import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/forms/ProductForm";
import { useProductById, useUpdateProduct } from "@/hooks/useCreateProduct";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading } = useProductById(id as string);
  const update = useUpdateProduct();

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Product not found</p>;

  return (
    <ProductForm
      title="Update Product"
      submitLabel="Update Product"
      loading={update.isPending}
      defaultValues={{
        productName: data.name,
        price: data.price,
        stock: data.stock,
        description: data.description,
        images: data.images || [],
      }}
      onSubmit={(form) =>
        update.mutate(
          { productId: id as string, payload: form },
          {
            onSuccess: () => router.push("/dashboard"),
          }
        )
      }
    />
  );
}
