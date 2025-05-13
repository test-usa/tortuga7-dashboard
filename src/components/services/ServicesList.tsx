import { Loader2 } from "lucide-react";
import useServices from "../../hooks/useServices";
import { TService } from "../../types/service";
import SingleServiceBox from "./SingleServiceBox";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/api";
import toast from "react-hot-toast";

const ServicesList = () => {
  const { servicesData, servicesLoading, servicesRefetch } = useServices();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState<TService | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TService>();

  const handleAddService = async (data: TService) => {
    const serviceInfo = {
      title: data.title,
      description: data.description,
    };

    try {
      setLoading(true);
      const res = await api.post(`/services`, serviceInfo);
      if (res.status !== 200) toast.error("Network response was not ok");
      toast.success("Service added successfully!");
      reset();
      servicesRefetch();
      setShowModal(false);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to add service!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      <button
        onClick={() => setShowModal(true)}
        className="px-5 py-2 rounded border mb-5"
      >
        Add Service
      </button>
      <div className="space-y-4">
        {servicesLoading ? (
          <div className="flex justify-center items-center py-20 text-4xl">
            <Loader2 className="w-16 h-16 animate-spin" />
          </div>
        ) : servicesData.length > 0 ? (
          servicesData.map((service: TService) => (
            <SingleServiceBox
              key={service.id}
              service={service}
              refetch={servicesRefetch}
              onEdit={(service) => {
                setSelectedService(service);     // ✅ store service
                setShowEditModal(true);         // ✅ open modal
              }}
            />
          ))
        ) : (
          <div>
            <p className="text-center">No Services Found</p>
          </div>
        )}
      </div>

      <AnimatePresence>
  {showEditModal && selectedService && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setShowEditModal(false)}
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
          <h3 className="text-xl font-semibold text-white">Edit Service</h3>
          <button
            onClick={() => setShowEditModal(false)}
            className="text-white hover:text-red-500 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <form
          onSubmit={handleSubmit(async (data: TService) => {
            try {
              setLoading(true);
              const res = await api.patch(`/services/${selectedService?.id}`, {
                title: data.title,
                description: data.description,
              });
              if (res.status === 200) {
                toast.success("Service updated successfully!");
                setShowEditModal(false);
                servicesRefetch();
                reset();
              } else {
                toast.error("Failed to update service");
              }
            } catch (error: any) {
              const errorMessage =
                error.response?.data?.message || "Update failed!";
              toast.error(errorMessage);
            } finally {
              setLoading(false);
            }
          })}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Title */}
          <div>
            <label className="block text-left text-sm font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              defaultValue={selectedService?.title}
              {...register("title", {
                required: "Title is required",
              })}
              className="w-full mt-1 p-2 border rounded outline-none focus:border-purple-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-left text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </label>
            <input
              defaultValue={selectedService?.description}
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full mt-1 p-2 border rounded outline-none focus:border-purple-500"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-2 w-full text-white py-2 rounded bg-purple-500"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin mx-auto" />
            ) : (
              "Update Service"
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
export default ServicesList;
