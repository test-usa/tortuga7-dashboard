import { Loader2 } from "lucide-react";
import useServices from "../../hooks/useServices";
import { TService } from "../../types/service";
import SingleServiceBox from "./SingleServiceBox";

const ServicesList = () => {
  const { servicesData, servicesLoading, servicesRefetch } = useServices();
  console.log(servicesData);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      <ul className="space-y-4">
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
            />
          ))
        ) : (
          <div>
            <p className="text-center">No Services Found</p>
          </div>
        )}
      </ul>
    </div>
  );
};
export default ServicesList;
