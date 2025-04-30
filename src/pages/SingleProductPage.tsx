import { Loader2, X } from "lucide-react";
import { useParams } from "react-router";
import useSingleProduct from "../hooks/useSingleProduct";
import { TProduct, TSpec } from "../types/service";
import Header from "../components/common/Header";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/api";
import toast from "react-hot-toast";

const SingleProductPage = () => {
  const params = useParams();
  const { singleProductData, singleProductLoading, singleProductRefetch } =
    useSingleProduct(params.id as string);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [specification, setSpecification] = useState<Record<string, string>[]>([
    { key: "", value: "" },
  ]);

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
  } = singleProductData as TProduct;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSpec>();
  const handleAddSpec = async (data: TSpec) => {
    const specDataArray = specification
      .filter((item) => item.key && item.value)
      .map((item) => ({ [item.key]: item.value }));

    const specInfo = {
      title: data.title,
      description: data.description,
      data: specDataArray,
      productId: id,
    };

    console.log(specInfo);

    try {
      setLoading(true);
      const res = await api.post(`/specs`, specInfo);
      if (res.status !== 200) toast.error("Network response was not ok");
      toast.success("Specification added successfully!");
      reset();
      setSpecification([{ key: "", value: "" }]);
      singleProductRefetch();
      setShowModal(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to add specification!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  console.log(singleProductData);
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

              {/*  Add Specification */}
              <button
                onClick={() => setShowModal(true)}
                className="px-5 py-2 rounded border mb-5"
              >
                Add Specification
              </button>

              {/* Specification */}
              <div className="grid grid-cols-2 gap-5">
                {specs.map((spec, i) => (
                  <div key={i} className="border rounded">
                    <p className="bg-purple-500 text-white rounded-t p-2">
                      {spec.title}
                    </p>
                    <div>
                      {spec.data &&
                        spec?.data?.map((entry, j) => {
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
                  Add a Specification
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-red-500 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              <form
                onSubmit={handleSubmit(handleAddSpec)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/*  Title */}
                <div>
                  <label className="block text-left text-sm font-medium">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("title", {
                      required: "Title is required",
                    })}
                    className="w-full mt-1 p-2 border rounded outline-none focus:border-green-500"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
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

                {/* Specifications */}
                <div className="col-span-2 flex flex-col gap-3 my-5">
                  <label className="text-sm font-medium">
                    Specifications <span className="text-red-500 ml-1">*</span>
                  </label>
                  {specification.map((singleClass, index) => (
                    <div
                      key={index}
                      className="flex justify-center items-center gap-2"
                    >
                      <input
                        type="text"
                        placeholder="Key"
                        className="w-28 sm:w-60 border p-2 rounded-md focus:outline-none focus:border-btn"
                        value={singleClass.key}
                        onChange={(e) => {
                          const updatedClasses = [...specification];
                          updatedClasses[index].key = e.target.value;
                          setSpecification(updatedClasses);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        className="w-28 sm:w-60 border p-2 rounded-md focus:outline-none focus:border-btn"
                        value={singleClass.value}
                        onChange={(e) => {
                          const updatedClasses = [...specification];
                          updatedClasses[index].value = e.target.value;
                          setSpecification(updatedClasses);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (specification.length > 1) {
                            setSpecification(
                              specification.filter((_, i) => i !== index)
                            );
                          }
                        }}
                        className="h-8 w-8 rounded-lg flex items-center justify-center bg-red-500 text-white"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        setSpecification([
                          ...specification,
                          { key: "", value: "" },
                        ])
                      }
                      className="h-8 w-fit px-5 rounded-lg flex items-center justify-center duration-300 border"
                    >
                      Add More
                    </button>
                  </div>
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
                    "Add Specification"
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
export default SingleProductPage;
