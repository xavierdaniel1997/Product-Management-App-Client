"use client";

import { createProduct, deleteProduct, getAllProductByAdmin, getAllProducts, getProductById, updateProduct } from "@/lib/api/product";
import { handleApiError } from "@/lib/utils/handleApiError";
import { ProductFormType } from "@/lib/validations/porducts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


import { toast } from "sonner";


  export const useCreateProduct = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product added successfully");
      router.push("/dashboard");  
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};

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

  export const useAdminProducts = (
  page: number = 1,
  limit: number = 10,
  search?: string,
  minPrice?: number,
  maxPrice?: number
) =>
  useQuery({
    queryKey: ["admin-products", page, limit, search, minPrice, maxPrice],
    queryFn: () =>
      getAllProductByAdmin({ page, limit, search, minPrice, maxPrice }),
   placeholderData: (prev) => prev,
  });


  export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};



export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      payload,
    }: {
      productId: string;
      payload: Partial<ProductFormType>;
    }) => updateProduct(productId, payload),

    onSuccess: () => {
      toast.success("Product updated successfully");

      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};