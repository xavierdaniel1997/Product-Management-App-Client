import { api } from "../axios";


export const addToCart = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  const res = await api.post("/cart/add-to-cart", { productId, quantity });
  return res.data.data; 
};

export const getCart = async () => {
  const res = await api.get("/cart/my-cart");
  return res.data.data; 
};
