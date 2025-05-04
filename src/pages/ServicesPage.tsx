import ServicesList from "../components/services/ServicesList";
import Header from "../components/common/Header";

const ServicesPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Services" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <ServicesList />
      </main>
    </div>
  );
};
export default ServicesPage;
