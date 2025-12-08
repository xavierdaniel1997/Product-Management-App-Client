import { api } from "../axios";
import { ProductFormType } from "../validations/porducts";


export const createProduct = async (data: ProductFormType) => {
  const form = new FormData();

  form.append("productName", data.productName);
  form.append("price", String(data.price));
  form.append("description", data.description);

  data.images.forEach((file) => form.append("images", file));

  const res = await api.post("/product/add-product", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};


export const getAllProducts = async (params?: {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const res = await api.get("/product/all-products", { params });
  return res.data.data; 
};

export const getProductById = async (productId: string) => {
  const res = await api.get(`/product/product-details/${productId}`);
  return res.data.data; 
};

