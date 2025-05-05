import { Loader2, Plus, X } from "lucide-react";
import useProducts from "../../hooks/useProducts";
import { TProduct } from "../../types/service";
import SingleProductBox from "./SingleProductBox";
import { useParams } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, useRef, useState } from "react";
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
  const [keyFeatures, setKeyFeatures] = useState<string[]>([""]);
  const [keyApplications, setKeyApplications] = useState<string[]>([""]);
  const productImagesRef = useRef<HTMLInputElement | null>(null);
  const [filters, setFilters] = useState([{ name: "", value: "" }]);
  const [productImages, setProductImages] = useState<
    {
      file: File;
      preview: string;
    }[]
  >([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TProduct>();

  const handleAddProduct = async (data: TProduct) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("productModel", data.productModel);
    formData.append("brandName", data.brandName);
    formData.append("description", data.description);
    formData.append("slug", data.slug);
    formData.append("price", data.price.toString());
    formData.append("available", "true");
    formData.append("serviceId", id as string);
    formData.append("keyFeatures", JSON.stringify(keyFeatures));
    formData.append("keyApplications", JSON.stringify(keyApplications));
    formData.append("filters", JSON.stringify(filters));
    productImages.forEach((image) => formData.append("images", image.file));
    productImages.forEach((image) => console.log("images", image.file));

    try {
      setLoading(true);
      const res = await api.post(`/products`, formData);
      if (res.status !== 200) toast.error("Network response was not ok");
      toast.success("Specification updated successfully!");
      reset();
      setKeyApplications([]);
      setKeyFeatures([]);
      setProductImages([]);
      setFilters([]);
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

  const handleMultipleImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (newFiles.length !== files.length) {
      toast.error("Some files were not images and were not selected");
    }

    const remainingSlots = 10 - productImages.length;
    if (remainingSlots <= 0) {
      toast.error("You've reached the maximum of 10 images");
      return;
    }

    const filesToAdd = newFiles.slice(0, remainingSlots);
    if (filesToAdd.length < newFiles.length) {
      toast.error(
        `Only ${remainingSlots} more images can be added (max 10 total)`
      );
    }
    const newFilesWithPreviews = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setProductImages([...productImages, ...newFilesWithPreviews]);

    if (productImagesRef.current) {
      productImagesRef.current.value = "";
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
            className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-scroll"
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
                <div className="mt-6 col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Product Images (Max 10)
                  </label>
                  {productImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {productImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image.preview}
                            alt={`Product Preview ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setProductImages((prev) => {
                                URL.revokeObjectURL(prev[index].preview);
                                return prev.filter((_, i) => i !== index);
                              })
                            }
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white"
                          >
                            <X className="size-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    ref={productImagesRef}
                    onChange={handleMultipleImages}
                    className="hidden"
                  />
                  <button
                    type="button"
                    className="w-full mt-1 p-2 border rounded outline-none focus:border-green-500 dark:border-shadow"
                    onClick={() => productImagesRef.current?.click()}
                  >
                    Add Product Images
                  </button>
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

                {/* Filters Section */}
                <div className="col-span-2 flex flex-col gap-3 my-5">
                  <label className="text-sm font-medium">
                    Filters <span className="text-red-500 ml-1">*</span>
                  </label>

                  {filters.map((filter, index) => (
                    <div
                      key={index}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <input
                        type="text"
                        placeholder="Filter Name (e.g., cpuType)"
                        className="flex-1 min-w-[120px] border p-2 rounded-md focus:outline-none focus:border-btn"
                        value={filter.name}
                        onChange={(e) => {
                          const updated = [...filters];
                          updated[index].name = e.target.value;
                          setFilters(updated);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Filter Value (e.g., Intel® Xeon® Gold)"
                        className="flex-1 min-w-[120px] border p-2 rounded-md focus:outline-none focus:border-btn"
                        value={filter.value}
                        onChange={(e) => {
                          const updated = [...filters];
                          updated[index].value = e.target.value;
                          setFilters(updated);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (filters.length > 1) {
                            setFilters(filters.filter((_, i) => i !== index));
                          }
                        }}
                        className="h-5 w-5 rounded-lg flex items-center justify-center border border-red-500 text-red-500"
                      >
                        <X className="size-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFilters([...filters, { name: "", value: "" }])
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
