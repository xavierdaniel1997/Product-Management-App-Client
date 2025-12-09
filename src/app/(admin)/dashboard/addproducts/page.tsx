"use client";

import ProductForm from "@/components/forms/ProductForm";
import { useCreateProduct } from "@/hooks/useCreateProduct";

export default function AddProductPage() {
  const create = useCreateProduct();

  return (
    <ProductForm
      title="Add New Product"
      submitLabel="Save Product"
      loading={create.isPending}
      defaultValues={{
        productName: "",
        price: 0,
        stock: 0,
        description: "",
        images: [],
      }}
      onSubmit={(data) => create.mutate(data)}
    />
  );
}
