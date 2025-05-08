import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { TProduct } from "../../types/service";
import { Check, Edit, X } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/api";

type TBasicProductInfo = {
  product: TProduct;
  refetch: () => void;
};

const BasicProductInfo = ({ product, refetch }: TBasicProductInfo) => {
  const [isBasicEditClicked, setIsBasicEditClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      productName: product.productName,
      productModel: product.productModel,
      brandName: product.brandName,
      slug: product.slug,
      price: product.price,
      description: product.description,
    },
  });

  useEffect(() => {
    reset({
      productName: product.productName,
      productModel: product.productModel,
      brandName: product.brandName,
      slug: product.slug,
      price: product.price,
      description: product.description,
    });
  }, [product, reset]);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res = await api.patch(`/products/${product.id}`, data);
      if (res.status !== 200) {
        toast.error("Network response was not ok");
        return;
      }
      toast.success("Product info updated successfully!");
      refetch();
      setIsBasicEditClicked(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to update product info!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!isBasicEditClicked ? (
        <div className="relative group">
          <p className="text-2xl font-semibold mb-2">{product.productName}</p>
          <p className="my-1">Model: {product.productModel}</p>
          <p className="my-1">Brand: {product.brandName}</p>
          <p className="my-1">Slug: {product.slug}</p>
          <p className="my-1">Price: {product.price}</p>
          <p className="mt-1 mb-5">{product.description}</p>
          <div
            onClick={() => setIsBasicEditClicked(true)}
            className="absolute top-0 right-0 cursor-pointer"
          >
            <Edit className="text-green-500 rounded p-1 size-6" />
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative group md:grid grid-cols-2 gap-3 mb-5"
        >
          <div className="flex flex-col gap-1 mb-2 md:mb-0">
            <p className="text-sm">Name:</p>
            <input
              {...register("productName")}
              type="text"
              placeholder="Product Name"
              className="px-3 py-1 rounded block border border-purple-500 w-[280px]"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2 md:mb-0">
            <p className="text-sm">Model:</p>
            <input
              {...register("productModel")}
              type="text"
              placeholder="Product Model"
              className="px-3 py-1 rounded block border border-purple-500 w-[280px]"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2 md:mb-0">
            <p className="text-sm">Brand:</p>
            <input
              {...register("brandName")}
              type="text"
              placeholder="Brand name"
              className="px-3 py-1 rounded block border border-purple-500 w-[280px]"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2 md:mb-0">
            <p className="text-sm">Slug:</p>
            <input
              {...register("slug")}
              type="text"
              placeholder="Slug"
              className="px-3 py-1 rounded block border border-purple-500 w-[280px]"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2 md:mb-0">
            <p className="text-sm">Price:</p>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              placeholder="Price"
              className="px-3 py-1 rounded block border border-purple-500 w-[280px]"
            />
          </div>
          <div className="flex flex-col gap-1 mb-2 md:mb-0 col-span-2">
            <p className="text-sm">Description:</p>
            <textarea
              {...register("description")}
              placeholder="Description"
              className="px-3 py-1 rounded block border border-purple-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="absolute top-0 right-8 cursor-pointer"
          >
            <Check className="text-green-500 rounded-full p-1 size-6 border border-green-500 hover:text-white hover:bg-green-500 duration-300" />
          </button>
          <div
            onClick={() => setIsBasicEditClicked(false)}
            className="absolute top-0 right-0 cursor-pointer"
          >
            <X className="text-red-500 rounded-full p-1 size-6 border border-red-500 hover:text-white hover:bg-red-500 duration-300" />
          </div>
        </form>
      )}
    </div>
  );
};

export default BasicProductInfo;
