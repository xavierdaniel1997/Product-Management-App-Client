import { IProduct } from "./product";

export interface ICartItem {
  _id: string;
  productId: IProduct;
  quantity: number;
}

export interface ICart {
  _id: string;
  userId: string;
  items: ICartItem[];
}
