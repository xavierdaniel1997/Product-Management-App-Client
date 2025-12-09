import { api } from "../axios";
import { ProductFormType } from "../validations/porducts";


export const createProduct = async (data: ProductFormType) => {
  const form = new FormData();

  form.append("productName", data.productName);
  form.append("price", String(data.price));
  form.append("stock", String(data.stock));
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


export const getAllProductByAdmin = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const res = await api.get("/product/get-products", { params });
  console.log("checking the all products in product apis", res)
  return res.data.data; 
};


export const deleteProduct = async (productId: string) => {
  const res = await api.delete(`/product/delete-product/${productId}`);
  return res.data.data;
}


export const updateProduct = async (
  productId: string,
  data: Partial<ProductFormType>
) => {
  const form = new FormData();

  if (data.productName) form.append("productName", data.productName);
  if (data.price !== undefined) form.append("price", String(data.price));
  if (data.stock !== undefined) form.append("stock", String(data.stock));
  if (data.description) form.append("description", data.description);

  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => form.append("images", file));
  }

  const res = await api.put(`/product/update-product/${productId}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data;
};
