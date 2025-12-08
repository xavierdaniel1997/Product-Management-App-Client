import { IProduct } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductListProps{
    products: IProduct[]
}

export default function ProductList({products}: ProductListProps){
    return(
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {products.map((product: IProduct) => (
          <ProductCard
            key={product._id}
            image={product.images?.[0]}
            title={product.name}
            price={product.price}
            productId={product._id}
          />
        ))}
      </div> 
    )
}