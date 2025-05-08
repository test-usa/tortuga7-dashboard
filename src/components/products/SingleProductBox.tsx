import { Link } from "react-router";
import { Trash } from "lucide-react";
import { TProduct } from "../../types/service";
import Swal from "sweetalert2";
import api from "../../api/api";
import toast from "react-hot-toast";

type TProductData = {
  product: TProduct;
  refetch: () => void;
};

const SingleProductBox = ({ product, refetch }: TProductData) => {
  const { id, productName, productModel, brandName, description, price } =
    product;

  const handleProductDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/products/${id}`)
          .then((res) => {
            if (res.status === 200) {
              refetch();
              Swal.fire("Deleted!", "A Product has been deleted.", "success");
            }
          })
          .catch((error) => {
            toast.error(error.response.data.message || "Something went wrong!");
          });
      }
    });
  };
  return (
    <div className="relative bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
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
        <Trash className="text-red-500 rounded p-1 size-8" />
      </div>
    </div>
  );
};

export default SingleProductBox;
