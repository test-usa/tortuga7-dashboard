import { Loader2 } from "lucide-react";
import useProducts from "../../hooks/useProducts";
import { TProduct } from "../../types/service";
import SingleProductBox from "./SingleProductBox";
import { useParams } from "react-router";
const productsList = () => {
  const { id } = useParams();
  const { productsData, productsLoading, productsRefetch } = useProducts(
    id as string
  );
  console.log(productsData);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">products</h1>
      <ul className="space-y-4">
        {productsLoading ? (
          <div className="flex justify-center items-center py-20 text-4xl">
            <Loader2 className="w-16 h-16 animate-spin" />
          </div>
        ) : productsData.length > 0 ? (
          productsData.map((product: TProduct) => (
            <SingleProductBox
              key={product.id}
              product={product}
              refetch={productsRefetch}
            />
          ))
        ) : (
          <div>
            <p className="text-center">No products Found</p>
          </div>
        )}
      </ul>
    </div>
  );
};
export default productsList;
