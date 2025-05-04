import { Loader2, Plus, X } from "lucide-react";
import useProducts from "../../hooks/useProducts";
import { TProduct } from "../../types/service";
import SingleProductBox from "./SingleProductBox";
import { useParams } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import toast from "react-hot-toast";

const productsList = () => {
  const { id } = useParams();
  const { productsData, productsLoading, productsRefetch } = useProducts(
    id as string
  );
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([""]);
  const [keyFeatures, setKeyFeatures] = useState<string[]>([""]);
  const [keyApplications, setKeyApplications] = useState<string[]>([""]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TProduct>();

  const handleAddProduct = async (data: TProduct) => {
    const productInfo = {
      productName: data.productName,
      productModel: data.productModel,
      brandName: data.brandName,
      slug: data.slug,
      description: data.description,
      price: data.price,
      available: true,
      serviceId: id,
      images,
      keyFeatures,
      keyApplications,
    };

    console.log(productInfo);

    try {
      setLoading(true);
      const res = await api.post(`/products`, productInfo);
      if (res.status !== 200) toast.error("Network response was not ok");
      toast.success("Specification updated successfully!");
      reset();
      setImages([])
      setKeyApplications([])
      setKeyFeatures([])
      productsRefetch();
      setShowModal(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update specification details";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">products</h1>
      <button
        onClick={() => setShowModal(true)}
        className="px-5 py-2 rounded border mb-5"
      >
        Add Product
      </button>
      <div className="space-y-4">
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
      </div>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowModal(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal content */}
            <motion.div
              className="relative z-10 bg-gray-900 p-6 rounded-xl max-w-xl w-full border border-gray-700"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Add a Product
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-red-500 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              <form
                onSubmit={handleSubmit(handleAddProduct)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/*  Product Name */}
                <div>
                  <label className="block text-left text-sm font-medium">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("productName", {
                      required: "Product Name is required",
                    })}
                    className="w-full mt-1 p-2 border rounded outline-none focus:border-green-500"
                  />
                  {errors.productName && (
                    <p className="text-red-500 text-sm">
                      {errors.productName.message}
                    </p>
                  )}
                </div>
                {/*  Product Model */}
                <div>
                  <label className="block text-left text-sm font-medium">
                    Product Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("productModel", {
                      required: "Product Model is required",
                    })}
                    className="w-full mt-1 p-2 border rounded outline-none focus:border-green-500"
                  />
                  {errors.productModel && (
                    <p className="text-red-500 text-sm">
                      {errors.productModel.message}
                    </p>
                  )}
                </div>
                {/*  Brand Name */}
                <div>
                  <label className="block text-left text-sm font-medium">
                    Brand Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("brandName", {
                      required: "Brand Name is required",
                    })}
                    className="w-full mt-1 p-2 border rounded outline-none focus:border-green-500"
                  />
                  {errors.brandName && (
                    <p className="text-red-500 text-sm">
                      {errors.brandName.message}
                    </p>
                  )}
                </div>
                {/*  Slug */}
                <div>
                  <label className="block text-left text-sm font-medium">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("slug", {
                      required: "Slug is required",
                    })}
                    className="w-full mt-1 p-2 border rounded outline-none focus:border-green-500"
                  />
                  {errors.slug && (
                    <p className="text-red-500 text-sm">
                      {errors.slug.message}
                    </p>
                  )}
                </div>
                {/*  Price */}
                <div>
                  <label className="block text-left text-sm font-medium">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    {...register("price", {
                      required: "Price is required",
                    })}
                    className="w-full mt-1 p-2 border rounded outline-none focus:border-green-500"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                {/*  Description */}
                <div>
                  <label className="block text-left text-sm font-medium">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="w-full mt-1 p-2 border rounded outline-none focus:border-green-500"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Images */}
                <div className="col-span-2 flex flex-col gap-3 my-5">
                  <label className="text-sm font-medium">
                    Images <span className="text-red-500 ml-1">*</span>
                  </label>

                  {images.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Image url"
                        className="w-full border p-2 rounded-md focus:outline-none focus:border-btn"
                        value={spec}
                        onChange={(e) => {
                          const updated = [...images];
                          updated[index] = e.target.value;
                          setImages(updated);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (images.length > 1) {
                            setImages(images.filter((_, i) => i !== index));
                          }
                        }}
                        className="h-5 w-5 rounded-lg flex items-center justify-center border border-red-500 text-red-500"
                      >
                        <X className="size-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setImages([...images, ""])}
                        className="h-5 w-5 rounded-lg flex items-center justify-center border border-green-500 text-green-500"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Key Features */}
                <div className="col-span-2 flex flex-col gap-3 my-5">
                  <label className="text-sm font-medium">
                    Key Features <span className="text-red-500 ml-1">*</span>
                  </label>

                  {keyFeatures.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Feature"
                        className="w-full border p-2 rounded-md focus:outline-none focus:border-btn"
                        value={spec}
                        onChange={(e) => {
                          const updated = [...keyFeatures];
                          updated[index] = e.target.value;
                          setKeyFeatures(updated);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (keyFeatures.length > 1) {
                            setKeyFeatures(
                              keyFeatures.filter((_, i) => i !== index)
                            );
                          }
                        }}
                        className="h-5 w-5 rounded-lg flex items-center justify-center border border-red-500 text-red-500"
                      >
                        <X className="size-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setKeyFeatures([...keyFeatures, ""])}
                        className="h-5 w-5 rounded-lg flex items-center justify-center border border-green-500 text-green-500"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Key Applications */}
                <div className="col-span-2 flex flex-col gap-3 my-5">
                  <label className="text-sm font-medium">
                    Key Applications{" "}
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  {keyApplications.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Applications"
                        className="w-full border p-2 rounded-md focus:outline-none focus:border-btn"
                        value={spec}
                        onChange={(e) => {
                          const updated = [...keyApplications];
                          updated[index] = e.target.value;
                          setKeyApplications(updated);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (keyApplications.length > 1) {
                            setKeyApplications(
                              keyApplications.filter((_, i) => i !== index)
                            );
                          }
                        }}
                        className="h-5 w-5 rounded-lg flex items-center justify-center border border-red-500 text-red-500"
                      >
                        <X className="size-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setKeyApplications([...keyApplications, ""])
                        }
                        className="h-5 w-5 rounded-lg flex items-center justify-center border border-green-500 text-green-500"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="col-span-2 w-full text-white py-2 rounded bg-purple-500 "
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                  ) : (
                    "Add Product"
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default productsList;
