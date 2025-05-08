import toast from "react-hot-toast";
import api from "../../api/api";
import { TProduct } from "../../types/service";
import { Check, Plus, Trash, X } from "lucide-react";
import { useState } from "react";

type TProductKeyFeatures = {
  product: TProduct;
  refetch: () => void;
};

const ProductKeyFeatures = ({ product, refetch }: TProductKeyFeatures) => {
  const [isAddFeatureClicked, setIsAddFeatureClicked] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const features = product.keyFeatures;

  const deleteFeature = async (feature: string) => {
    const data = {
      keyFeatures: product.keyFeatures.filter((f) => f !== feature),
    };
    try {
      const res = await api.patch(`/products/${product.id}`, data);
      if (res.status !== 200) {
        toast.error("Network response was not ok");
        return;
      }
      toast.success("Feature deleted successfully!");
      refetch();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete feature!";
      toast.error(errorMessage);
    }
  };

  const addFeature = async () => {
    const data = {
      keyFeatures: [...product.keyFeatures, newFeature],
    };
    console.log(data);
    try {
      const res = await api.patch(`/products/${product.id}`, data);
      if (res.status !== 200) {
        toast.error("Network response was not ok");
        return;
      }
      toast.success("Feature added successfully!");
      refetch();
      setNewFeature("");
      setIsAddFeatureClicked(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to add feature!";
      toast.error(errorMessage);
    }
  };
  return (
    <div>
      <p className="text-lg font-semibold mb-2">Key Features</p>
      <div className="flex flex-wrap items-center gap-2 ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border rounded-md group"
          >
            <p>{feature}</p>
            <button
              onClick={() => deleteFeature(feature)}
              className="text-red-500 group-hover:block hidden ml-2 cursor-pointer"
            >
              <Trash className="size-4" />
            </button>
          </div>
        ))}
        <div
          className={`px-3 py-1 rounded border border-purple-500 flex items-center justify-between ${
            isAddFeatureClicked ? "block" : "hidden"
          }`}
        >
          <input
            className="outline-none"
            type="text"
            placeholder="Add a new feature"
            onChange={(e) => setNewFeature(e.target.value)}
          />
          <Check
            onClick={() => addFeature()}
            className="hover:text-green-500 cursor-pointer duration-300 ml-2"
          />
          <X
            onClick={() => setIsAddFeatureClicked(false)}
            className="hover:text-red-500 cursor-pointer duration-300 ml-2"
          />
        </div>
        <Plus
          onClick={() => setIsAddFeatureClicked(true)}
          className={`text-green-500 rounded-full border border-green-500 size-6 cursor-pointer ${
            isAddFeatureClicked ? "hidden" : "block"
          }`}
        />
      </div>
    </div>
  );
};

export default ProductKeyFeatures;
