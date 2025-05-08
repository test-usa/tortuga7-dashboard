import toast from "react-hot-toast";
import api from "../../api/api";
import { TProduct } from "../../types/service";
import { useState } from "react";
import { Check, Plus, Trash, X } from "lucide-react";

type TProductKeyApplications = {
  product: TProduct;
  refetch: () => void;
};

const ProductKeyApplications = ({
  product,
  refetch,
}: TProductKeyApplications) => {
  const [isAddApplicationClicked, setIsAddApplicationClicked] = useState(false);
  const [newApplication, setNewApplication] = useState("");
  const applications = product.keyApplications;

  // Delete application
  const deleteApplication = async (application: string) => {
    const data = {
      keyApplications: product.keyApplications.filter((f) => f !== application),
    };
    try {
      const res = await api.patch(`/products/${product.id}`, data);
      if (res.status !== 200) {
        toast.error("Network response was not ok");
        return;
      }
      toast.success("Application deleted successfully!");
      refetch();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete application!";
      toast.error(errorMessage);
    }
  };

  // Add application
  const addApplication = async () => {
    const data = {
      keyApplications: [...product.keyApplications, newApplication],
    };
    try {
      const res = await api.patch(`/products/${product.id}`, data);
      if (res.status !== 200) {
        toast.error("Network response was not ok");
        return;
      }
      toast.success("Application added successfully!");
      refetch();
      setNewApplication("");
      setIsAddApplicationClicked(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to add application!";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <p className="text-lg font-semibold mt-5 mb-2">Key Applications</p>
      <div className="flex flex-wrap items-center gap-2">
        {applications.map((application, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border rounded-md group"
          >
            <p>{application}</p>
            <button
              onClick={() => deleteApplication(application)}
              className="text-red-500 group-hover:block hidden ml-2 cursor-pointer"
            >
              <Trash className="size-4" />
            </button>
          </div>
        ))}
        <div
          className={`px-3 py-1 rounded border border-purple-500 flex items-center justify-between ${
            isAddApplicationClicked ? "block" : "hidden"
          }`}
        >
          <input
            className="outline-none"
            type="text"
            placeholder="Add a new application"
            onChange={(e) => setNewApplication(e.target.value)}
            value={newApplication}
          />
          <Check
            onClick={addApplication}
            className="hover:text-green-500 cursor-pointer duration-300 ml-2"
          />
          <X
            onClick={() => setIsAddApplicationClicked(false)}
            className="hover:text-red-500 cursor-pointer duration-300 ml-2"
          />
        </div>
        <Plus
          onClick={() => setIsAddApplicationClicked(true)}
          className={`text-green-500 rounded-full border border-green-500 size-6 cursor-pointer ${
            isAddApplicationClicked ? "hidden" : "block"
          }`}
        />
      </div>
    </div>
  );
};

export default ProductKeyApplications;
