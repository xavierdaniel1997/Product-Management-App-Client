export interface IProduct {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
   createdBy: string;  
  createdAt: Date;
  updatedAt: Date;
}
