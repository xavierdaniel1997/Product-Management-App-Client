// hooks/useCart.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart, getCart } from "@/lib/api/cart";
import { toast } from "sonner";
import { handleApiError } from "@/lib/utils/handleApiError";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      toast.success("Product added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: (error) => {
      handleApiError(error)
    },
  });
};


export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};
