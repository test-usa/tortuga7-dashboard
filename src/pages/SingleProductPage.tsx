import { Loader2 } from "lucide-react";
import { useParams } from "react-router";
import useSingleProduct from "../hooks/useSingleProduct";
import { TProduct } from "../types/service";
import Header from "../components/common/Header";

const SingleProductPage = () => {
  const { id } = useParams();
  const { singleProductData, singleProductLoading, singleProductRefetch } =
    useSingleProduct(id as string);
  const {
    productName,
    productModel,
    brandName,
    slug,
    description,
    filters,
    keyApplications,
    keyFeatures,
    images,
    price,
    available,
    serviceId,
    createdAt,
    updatedAt,
    specs,
  } = singleProductData as TProduct;

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title={`Services -> Products -> ${productName}`} />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <ul className="space-y-4">
          {singleProductLoading ? (
            <div className="flex justify-center items-center py-20 text-4xl">
              <Loader2 className="w-16 h-16 animate-spin" />
            </div>
          ) : singleProductData ? (
            <div className="relative border rounded-lg p-5">
              <p className="text-lg font-semibold">{productName}</p>
              <p className="text-sm my-1">Model: {productModel}</p>
              <p className="text-sm my-1">Brand: {brandName}</p>
              <p className="text-sm my-1">Price: {price}</p>
              <p className="text-sm mt-1 mb-5">{description}</p>

              {/* Specification */}
              <div className="grid grid-cols-2 gap-5">
                {specs.map((spec) => (
                  <div className="border rounded">
                    <p className="bg-purple-500 text-white rounded-t p-2">
                      {spec.title}
                    </p>
                    <div>
                      {spec.data.map((entry, j) => {
                        const [[key, value]] = Object.entries(entry);
                        return (
                          <div
                            key={j}
                            className="flex justify-between border-b py-1"
                          >
                            <p className="font-medium">{key}</p>
                            <p className="text-gray-700">{value}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-center">Product not Found</p>
            </div>
          )}
        </ul>
      </main>
    </div>
  );
};
export default SingleProductPage;
