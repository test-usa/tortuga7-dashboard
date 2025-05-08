import { Link } from "react-router";
import { TService } from "../../types/service";
import { Trash } from "lucide-react";
import Swal from "sweetalert2";
import api from "../../api/api";
import toast from "react-hot-toast";

type TServiceData = {
  service: TService;
  refetch: () => void;
};

const SingleServiceBox = ({ service, refetch }: TServiceData) => {
  const { id, title, products, description } = service;

  const handleServiceDelete = () => {
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
          .delete(`/services/${id}`)
          .then((res) => {
            if (res.status === 200) {
              refetch();
              Swal.fire("Deleted!", "A Service has been deleted.", "success");
            }
          })
          .catch((error) => {
            toast.error(error.response.data.message || "Something went wrong!");
          });
      }
    });
  };
  return (
    <div className="relative border rounded-lg p-5">
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm">{description}</p>
      <p className="mt-5">Products: </p>
      <ul className="mb-5">
        {products.map((product, index) => (
          <li key={index} className="text-sm ml-5 list-disc">
            {product.productName}
          </li>
        ))}
      </ul>
      <Link
        to={`/service/${id}`}
        className="px-5 py-2 rounded-lg border hover:border-purple-500 cursor-pointer max-w-40 text-center  hover:bg-purple-500 duration-300"
      >
        View Products
      </Link>
      <div
        onClick={handleServiceDelete}
        className="absolute top-2 right-2 cursor-pointer"
      >
        <Trash className="text-red-500 rounded p-1 size-6" />
      </div>
    </div>
  );
};

export default SingleServiceBox;
