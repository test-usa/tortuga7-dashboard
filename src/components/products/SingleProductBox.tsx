import { Link } from "react-router";
import { Trash } from "lucide-react";
import { TProduct } from "../../types/service";

type TProductData = {
  product: TProduct;
  refetch: () => void;
};

const SingleProductBox = ({ product, refetch }: TProductData) => {
  const {
    id,
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
  } = product;

  const handleProductDelete = () => {
    console.log(id);
    refetch();
  };
  return (
    <div className="relative border rounded-lg p-5">
      <p className="text-lg font-semibold">{productName}</p>
      <p className="text-sm my-1">Model: {productModel}</p>
      <p className="text-sm my-1">Brand: {brandName}</p>
      <p className="text-sm my-1">Price: {price}</p>
      <p className="text-sm mt-1 mb-5">{description}</p>
      <Link
        to={`/product/${id}`}
        className="px-5 py-2 rounded-lg border hover:border-purple-500 cursor-pointer max-w-40 text-center  hover:bg-purple-500 duration-300"
      >
        View More
      </Link>
      <div
        onClick={handleProductDelete}
        className="absolute top-2 right-2 cursor-pointer"
      >
        <Trash className="text-red-500 rounded p-1 size-6" />
      </div>
    </div>
  );
};

export default SingleProductBox;
