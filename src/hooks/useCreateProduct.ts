"use client";

import { createProduct, getAllProducts, getProductById } from "@/lib/api/product";
import { handleApiError } from "@/lib/utils/handleApiError";
import { useMutation, useQuery } from "@tanstack/react-query";

import { toast } from "sonner";

export const useCreateProduct = () =>
  useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product added successfully");
    },
    onError: (error) => {
      handleApiError(error)
    },
  });

  export const useGetAllProducts = (search?: string, minPrice?: number, maxPrice?: number) =>
  useQuery({
    queryKey: ["products", search, minPrice, maxPrice],
    queryFn: () => getAllProducts({ search, minPrice, maxPrice }),
  });


export const useProductById = (productId: string) =>
  useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });